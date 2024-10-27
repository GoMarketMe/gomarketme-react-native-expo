import { Platform, Dimensions, PixelRatio } from 'react-native';
import * as Localization from 'expo-localization';
import * as InAppPurchases from 'expo-in-app-purchases';
import axios from 'axios';
import * as Device from 'expo-device';

interface CustomPurchase {
  productId: string;
  transactionDate: string;
  transactionId: string;
  verificationData: {
    localVerificationData: string;
  };
}

class GoMarketMe {
  private static instance: GoMarketMe;
  private sdkInitializedKey = 'GOMARKETME_SDK_INITIALIZED';
  private affiliateCampaignCode = '';
  private deviceId = '';
  private sdkInitializationUrl = 'https://api.gomarketme.net/v1/sdk-initialization';
  private systemInfoUrl = 'https://api.gomarketme.net/v1/mobile/system-info';
  private eventUrl = 'https://api.gomarketme.net/v1/event';

  private constructor() { }

  public static getInstance(): GoMarketMe {
    if (!GoMarketMe.instance) {
      GoMarketMe.instance = new GoMarketMe();
    }
    return GoMarketMe.instance;
  }

  public async initialize(apiKey: string): Promise<void> {
    try {
      const isSDKInitialized = await this.isSDKInitialized();
      if (!isSDKInitialized) {
        await this.postSDKInitialization(apiKey);
      }
      const systemInfo = await this.getSystemInfo();
      await this.postSystemInfo(systemInfo, apiKey);
      await this.addListener(apiKey);
    } catch (e) {
      console.error('Error initializing GoMarketMe:', e);
    }
  }

  private async addListener(apiKey: string): Promise<void> {
    InAppPurchases.setPurchaseListener(async ({ responseCode, results }) => {
      if (responseCode === InAppPurchases.IAPResponseCode.OK && results) {
        for (const purchase of results) {
          if (this.affiliateCampaignCode) {
            const mappedPurchase = this.mapPurchase(purchase);
            const productIds = await this.fetchPurchases([mappedPurchase], apiKey);
            await this.fetchPurchaseProducts(productIds, apiKey);
          }
        }
      }
    });
  }

  private mapPurchase(purchase: InAppPurchases.InAppPurchase): CustomPurchase {
    return {
      productId: purchase.productId,
      transactionDate: new Date().toISOString(),
      transactionId: purchase.purchaseToken ?? "",
      verificationData: {
        localVerificationData: purchase.purchaseToken ?? "",
      },
    };
  }

  private async fetchPurchases(purchaseDetailsList: CustomPurchase[], apiKey: string): Promise<string[]> {
    const productIds: string[] = [];
    for (const purchase of purchaseDetailsList) {
      if (purchase.verificationData.localVerificationData) {
        if (purchase.productId && !productIds.includes(purchase.productId)) {
          productIds.push(purchase.productId);
        }
      }
    }
    return productIds;
  }

  private async getSystemInfo(): Promise<{}> {
    const deviceData = Platform.select({
      ios: await this.readIosDeviceInfo(),
      android: await this.readAndroidDeviceInfo(),
    });

    const windowData = {
      devicePixelRatio: PixelRatio.get(),
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    return {
      device_info: deviceData,
      window_info: windowData,
      time_zone_code: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language_code: Localization.locale,
    };
  }

  private async postSDKInitialization(apiKey: string): Promise<void> {
    try {
      const response = await axios.post(this.sdkInitializationUrl, {}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });
      if (response.status === 200) {
        console.log('Initialized!');
        await this.markSDKAsInitialized();
      } else {
        console.error('Failed to mark SDK as Initialized. Status code:', response.status);
      }
    } catch (e) {
      console.error('Error sending SDK information to server:', e);
    }
  }

  private async postSystemInfo(systemInfo: any, apiKey: string): Promise<void> {
    try {
      const response = await axios.post(this.systemInfoUrl, systemInfo, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.affiliate_campaign_code) {
          this.affiliateCampaignCode = responseData.affiliate_campaign_code;
        }
        if (responseData.device_id) {
          this.deviceId = responseData.device_id;
        }
      } else {
        console.error('Failed to send system info. Status code:', response.status);
      }
    } catch (e) {
      console.error('Error sending system info to server:', e);
    }
  }

  private async readAndroidDeviceInfo(): Promise<any> {
    return {
      deviceId: Device.osBuildId,
      systemName: Device.osName,
      systemVersion: Device.osVersion,
      brand: Device.brand,
      model: Device.modelName,
      manufacturer: Device.manufacturer,
      isEmulator: !Device.isDevice,
    };
  }

  private async readIosDeviceInfo(): Promise<any> {
    return {
      deviceId: Device.osBuildId,
      systemName: Device.osName,
      systemVersion: Device.osVersion,
      brand: Device.brand,
      model: Device.modelName,
      manufacturer: Device.manufacturer,
      isEmulator: !Device.isDevice,
    };
  }

  private async markSDKAsInitialized(): Promise<boolean> {
    // try {
    //   await AsyncStorage.setItem(this.sdkInitializedKey, 'true');
    //   return true;
    // } catch (e) {
    //   console.error('Failed to save SDK initialization:', e);
    //   return false;
    // }
    return true;
  }

  private async isSDKInitialized(): Promise<boolean> {
    // try {
    //   const value = await AsyncStorage.getItem(this.sdkInitializedKey);
    //   return value === 'true';
    // } catch (e) {
    //   console.error('Failed to load SDK initialization:', e);
    //   return false;
    // }
    return false;
  }

  private async fetchPurchaseProducts(productIds: string[], apiKey: string): Promise<void> {
    try {
      const productsResponse = await InAppPurchases.getProductsAsync(productIds);
      const products = productsResponse.results;
      if (products && products.length > 0) {
        for (const product of products) {
          await this.sendEventToServer(JSON.stringify(this.serializeProductDetails(product)), 'product', apiKey);
        }
      } else {
        await this.sendEventToServer(JSON.stringify({ notFoundIDs: productIds.join(',') }), 'product', apiKey);
      }
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  }

  private async sendEventToServer(body: string, eventType: string, apiKey: string): Promise<void> {
    try {
      const response = await axios.post(this.eventUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          'x-affiliate-campaign-code': this.affiliateCampaignCode,
          'x-device-id': this.deviceId,
          'x-event-type': eventType,
          'x-product-type': Platform.OS,
          'x-source-name': Platform.OS === 'android' ? 'google_play' : 'app_store',
          'x-api-key': apiKey,
        },
      });
      if (response.status === 200) {
        console.log(`${eventType} sent successfully`);
      } else {
        console.error(`Failed to send ${eventType}. Status code:`, response.status);
      }
    } catch (e) {
      console.error(`Error sending ${eventType} to server:`, e);
    }
  }

  private serializeProductDetails(product: InAppPurchases.IAPItemDetails): any {
    return {
      productID: product.productId,
      productTitle: product.title,
      productDescription: product.description,
      productPrice: product.price,
      productRawPrice: product.price,
      productCurrencyCode: product.priceCurrencyCode,
    };
  }
}

export default GoMarketMe.getInstance();
