"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDistribution = exports.Affiliate = exports.Campaign = exports.GoMarketMeAffiliateMarketingData = void 0;
const react_native_1 = require("react-native");
const axios_1 = __importDefault(require("axios"));
//import * as InAppPurchases from 'expo-in-app-purchases';
const RNIap = __importStar(require("react-native-iap"));
const Application = __importStar(require("expo-application"));
const Device = __importStar(require("expo-device"));
const Localization = __importStar(require("expo-localization"));
class GoMarketMeAffiliateMarketingData {
    constructor(campaign, affiliate, saleDistribution, affiliateCampaignCode, deviceId, offerCode) {
        this.campaign = campaign;
        this.affiliate = affiliate;
        this.saleDistribution = saleDistribution;
        this.affiliateCampaignCode = affiliateCampaignCode;
        this.deviceId = deviceId;
        this.offerCode = offerCode;
    }
    static fromJson(json) {
        // Check if the json is an empty object
        if (Object.keys(json).length === 0) {
            return null; // Return null or undefined, depending on your preference
        }
        return new GoMarketMeAffiliateMarketingData(Campaign.fromJson(json.campaign), Affiliate.fromJson(json.affiliate), SaleDistribution.fromJson(json.sale_distribution), json.affiliate_campaign_code || '', json.device_id || '', json.offer_code);
    }
}
exports.GoMarketMeAffiliateMarketingData = GoMarketMeAffiliateMarketingData;
class Campaign {
    constructor(id, name, status, type, publicLinkUrl) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.type = type;
        this.publicLinkUrl = publicLinkUrl;
    }
    static fromJson(json) {
        return new Campaign(json.id || '', json.name || '', json.status || '', json.type || '', json.public_link_url);
    }
}
exports.Campaign = Campaign;
class Affiliate {
    constructor(id, firstName, lastName, countryCode, instagramAccount, tiktokAccount, xAccount) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.countryCode = countryCode;
        this.instagramAccount = instagramAccount;
        this.tiktokAccount = tiktokAccount;
        this.xAccount = xAccount;
    }
    static fromJson(json) {
        return new Affiliate(json.id || '', json.first_name || '', json.last_name || '', json.country_code || '', json.instagram_account || '', json.tiktok_account || '', json.x_account || '');
    }
}
exports.Affiliate = Affiliate;
class SaleDistribution {
    constructor(platformPercentage, affiliatePercentage) {
        this.platformPercentage = platformPercentage;
        this.affiliatePercentage = affiliatePercentage;
    }
    static fromJson(json) {
        return new SaleDistribution(json.platform_percentage || '', json.affiliate_percentage || '');
    }
}
exports.SaleDistribution = SaleDistribution;
class GoMarketMe {
    constructor() {
        this.sdkType = 'ReactNativeExpo';
        this.sdkVersion = '2.0.0';
        this.sdkInitializedKey = 'GOMARKETME_SDK_INITIALIZED';
        this.sdkInitializationUrl = 'https://4v9008q1a5.execute-api.us-west-2.amazonaws.com/prod/v1/sdk-initialization';
        this.systemInfoUrl = 'https://4v9008q1a5.execute-api.us-west-2.amazonaws.com/prod/v1/mobile/system-info';
        this.eventUrl = 'https://4v9008q1a5.execute-api.us-west-2.amazonaws.com/prod/v1/event';
        this._affiliateCampaignCode = '';
        this._deviceId = '';
        this._packageName = '';
        this._generateAndroidId = () => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const getRandomString = (length) => {
                return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
            };
            const part1 = getRandomString(4);
            const part2 = getRandomString(6);
            const part3 = getRandomString(3);
            return `${part1}.${part2}.${part3}`;
        };
        this._getTimeZone = () => {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        };
    }
    static getInstance() {
        if (!GoMarketMe.instance) {
            GoMarketMe.instance = new GoMarketMe();
        }
        return GoMarketMe.instance;
    }
    initialize(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log('initialize - START');
                //console.log('initialize A')
                const isSDKInitialized = yield this._isSDKInitialized();
                //console.log('initialize B')
                if (!isSDKInitialized) {
                    //console.log('initialize C')
                    yield this._postSDKInitialization(apiKey);
                }
                //console.log('initialize D')
                this._packageName = (_a = Application.applicationId) !== null && _a !== void 0 ? _a : '';
                //console.log('initialize E')
                //console.log(this._packageName);
                //console.log('initialize F')
                const systemInfo = yield this._getSystemInfo();
                //console.log('initialize G')
                //console.log(systemInfo)
                //console.log('initialize H')
                this.affiliateMarketingData = yield this._postSystemInfo(systemInfo, apiKey);
                //console.log('this.affiliateMarketingData')
                //console.log(this.affiliateMarketingData)
                //console.log('initialize I')
                yield this._addListener(apiKey);
                //console.log('initialize J')
                //console.log('initialize - END')
            }
            catch (e) {
                console.log('Error initializing GoMarketMe:', e);
            }
        });
    }
    // private async _addListener(apiKey: string): Promise<void> {
    //   InAppPurchases.setPurchaseListener(async ({ responseCode, results }) => {
    //     if (responseCode === InAppPurchases.IAPResponseCode.OK && results) {
    //       await this._fetchConsolidatedPurchases(results, apiKey);
    //     }
    //   });
    // }
    _addListener(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('_addListener - START');
            try {
                //console.log('_addListener A')
                // const connected = await RNIap.initConnection();
                // if (!connected) {
                //   throw new Error("IAP connection failed");
                // }
                // //console.log('IAP connection successful');
                // const availablePurchases = await RNIap.getAvailablePurchases();
                // //console.log('availablePurchases')
                // //console.log(availablePurchases); // List of completed purchases
                // RNIap.purchaseUpdatedListener(async (purchase: RNIap.Purchase) => {
                //   //console.log('_addListener B')
                //   await this._fetchConsolidatedPurchases([purchase], apiKey);
                //   //console.log('_addListener C')
                // });
                RNIap.initConnection().then(result => {
                    console.log('result');
                    console.log(result);
                    //const availablePurchases = await RNIap.getAvailablePurchases();
                    //console.log('availablePurchases')
                    //console.log(availablePurchases); // List of completed purchases
                    RNIap.purchaseUpdatedListener((purchase) => __awaiter(this, void 0, void 0, function* () {
                        //console.log('_addListener B')
                        yield this._fetchConsolidatedPurchases([purchase], apiKey);
                        //console.log('_addListener C')
                    }));
                    //console.log('_addListener D')
                    RNIap.purchaseErrorListener((error) => {
                        console.log('Purchase error:', error);
                    });
                });
                //console.log('_addListener E')
            }
            catch (e) {
                console.log('Error setting up IAP listeners:', e);
            }
            console.log('_addListener - END');
        });
    }
    _getSystemInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceData = react_native_1.Platform.select({
                ios: yield this._readIosDeviceInfo(),
                android: yield this._readAndroidDeviceInfo(),
            });
            this._deviceId = deviceData['deviceId'];
            const devicePixelRatio = react_native_1.PixelRatio.get();
            const dimension = react_native_1.Dimensions.get('window');
            const windowData = {
                devicePixelRatio: devicePixelRatio,
                width: dimension.width * devicePixelRatio,
                height: dimension.height * devicePixelRatio,
            };
            return {
                device_info: deviceData,
                window_info: windowData,
                time_zone: this._getTimeZone(),
                language_code: this._getLanguageCode(),
            };
        });
    }
    _postSDKInitialization(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.sdkInitializationUrl, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                    },
                });
                if (response.status === 200) {
                    yield this._markSDKAsInitialized();
                }
                else {
                    console.log('Failed to mark SDK as Initialized. Status code:', response.status);
                }
            }
            catch (e) {
                console.log('Error sending SDK information to server:', e);
            }
        });
    }
    _postSystemInfo(data, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = null;
            try {
                data['sdk_type'] = this.sdkType;
                data['sdk_version'] = this.sdkVersion;
                data['package_name'] = this._packageName;
                const response = yield axios_1.default.post(this.systemInfoUrl, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                    },
                });
                if (response.status === 200) {
                    output = GoMarketMeAffiliateMarketingData.fromJson(response.data);
                    if (output != null) {
                        this._affiliateCampaignCode = output.affiliateCampaignCode;
                    }
                }
                else {
                    console.log('Failed to send system info. Status code:', response.status);
                }
            }
            catch (e) {
                console.log('Error sending system info to server:', e);
            }
            return output;
        });
    }
    _readAndroidDeviceInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceId = this._generateAndroidId();
            let androidId = react_native_1.Platform.OS === 'android' ? Application.getAndroidId() : '';
            let systemName = Device.osName;
            let systemVersion = Device.osVersion;
            let brand = Device.brand;
            let model = Device.modelName;
            let manufacturer = Device.manufacturer;
            let isEmulator = !Device.isDevice;
            return {
                deviceId: deviceId,
                _deviceId: androidId,
                _uniqueId: androidId,
                systemName: systemName,
                systemVersion: systemVersion,
                brand: brand,
                model: model,
                manufacturer: manufacturer,
                isEmulator: isEmulator
            };
        });
    }
    _readIosDeviceInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let deviceId = react_native_1.Platform.OS === 'ios' ? yield Application.getIosIdForVendorAsync() : '';
            let systemName = Device.osName;
            let systemVersion = Device.osVersion;
            let brand = Device.brand;
            let model = Device.modelName;
            let manufacturer = Device.manufacturer;
            let isEmulator = !Device.isDevice;
            return {
                deviceId: deviceId,
                _deviceId: deviceId,
                systemName: systemName,
                systemVersion: systemVersion,
                brand: brand,
                model: model,
                manufacturer: manufacturer,
                isEmulator: isEmulator
            };
        });
    }
    _getLanguageCode() {
        return Localization.getLocales()[0].languageTag;
    }
    // private async _fetchConsolidatedPurchases(purchaseDetailsList: InAppPurchases.InAppPurchase[], apiKey: string): Promise<void> {
    //   for (const purchase of purchaseDetailsList) {
    //     if (purchase.transactionReceipt) {
    //       var data = this._serializePurchaseDetails(purchase);
    //       data['products'] = []
    //       //const products = await RNIap.getProducts({ skus: [data.productID] })
    //       const products = (await InAppPurchases.getProductsAsync([data.productID])).results;
    //       if (products && products?.length > 0) {
    //         for (const product0 of products) {
    //           // includes both in-app products and subscriptions so there's no need to parse those separately.
    //           var product = this._serializeProductDetails(product0)
    //           data['products'].push(product)
    //         }
    //       }
    //       await this._sendEventToServer(JSON.stringify(data), 'purchase', apiKey);
    //     }
    //   }
    // }
    _fetchConsolidatedPurchases(purchaseDetailsList, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('_fetchConsolidatedPurchases - START');
            console.log('_fetchConsolidatedPurchases A');
            for (const purchase of purchaseDetailsList) {
                console.log('_fetchConsolidatedPurchases B');
                if (purchase.transactionReceipt) {
                    console.log('_fetchConsolidatedPurchases C');
                    var data = this._serializePurchaseDetails(purchase);
                    console.log('_fetchConsolidatedPurchases D');
                    console.log(data);
                    data['products'] = [];
                    if (data.productID != '') {
                        console.log('_fetchConsolidatedPurchases E1');
                        const products = yield RNIap.getProducts({ skus: [data.productID] });
                        console.log('_fetchConsolidatedPurchases F');
                        console.log(products);
                        if (products.length > 0) {
                            console.log('_fetchConsolidatedPurchases G1');
                            for (const product0 of products) {
                                console.log('_fetchConsolidatedPurchases H1');
                                data['products'].push(this._serializeProductDetails(product0));
                                console.log('_fetchConsolidatedPurchases I1');
                                console.log(data);
                                console.log('_fetchConsolidatedPurchases J1');
                            }
                            console.log('_fetchConsolidatedPurchases K1');
                        }
                        else {
                            console.log('_fetchConsolidatedPurchases G2');
                            const products = yield RNIap.getSubscriptions({ skus: [data.productID] });
                            console.log('_fetchConsolidatedPurchases H2');
                            if (products.length > 0) {
                                console.log('_fetchConsolidatedPurchases I2');
                                for (const product0 of products) {
                                    console.log('_fetchConsolidatedPurchases J2');
                                    data['products'].push(this._serializeSubscriptionDetails(product0));
                                    console.log('_fetchConsolidatedPurchases K2');
                                    console.log(data);
                                    console.log('_fetchConsolidatedPurchases L2');
                                }
                            }
                            else {
                                console.log('_fetchConsolidatedPurchases I3');
                            }
                        }
                    }
                    else {
                        console.log('_fetchConsolidatedPurchases E2');
                    }
                    yield this._sendEventToServer(JSON.stringify(data), 'purchase', apiKey);
                }
            }
            console.log('_fetchConsolidatedPurchases - END');
        });
    }
    _sendEventToServer(body, eventType, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.eventUrl, body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-affiliate-campaign-code': this._affiliateCampaignCode,
                        'x-device-id': this._deviceId,
                        'x-event-type': eventType,
                        'x-product-type': react_native_1.Platform.OS,
                        'x-source-name': react_native_1.Platform.OS === 'android' ? 'google_play' : 'app_store',
                        'x-api-key': apiKey,
                    },
                });
                if (response.status === 200) {
                    console.log(`${eventType} sent successfully`);
                }
                else {
                    console.log(`Failed to send ${eventType}. Status code:`, response.status);
                }
            }
            catch (e) {
                console.log(`Error sending ${eventType} to server:`, e);
            }
        });
    }
    // private _serializePurchaseDetails(purchase: InAppPurchases.InAppPurchase): any {
    //   return {
    //     packageName: this._packageName,
    //     productID: purchase.productId,
    //     purchaseID: purchase.orderId || '',
    //     transactionDate: purchase.originalPurchaseTime || '',
    //     status: purchase.purchaseState,
    //     verificationData: {
    //       localVerificationData: purchase.transactionReceipt,
    //       serverVerificationData: purchase.transactionReceipt,
    //       source: Platform.OS === 'android' ? 'google_play' : 'app_store',
    //     },
    //     pendingCompletePurchase: '',
    //     error: {},
    //     hashCode: '',
    //     _purchase: purchase
    //   };
    // }
    _serializePurchaseDetails(purchase) {
        return {
            packageName: this._packageName,
            productID: purchase.productId,
            purchaseID: purchase.transactionId || '',
            transactionDate: purchase.transactionDate || '',
            status: react_native_1.Platform.select({
                ios: purchase.transactionStateIOS, // Removed non-existent properties
                android: purchase.purchaseStateAndroid,
            }),
            verificationData: {
                localVerificationData: purchase.transactionReceipt,
                serverVerificationData: purchase.transactionReceipt,
                source: react_native_1.Platform.OS === 'android' ? 'google_play' : 'app_store',
            },
            pendingCompletePurchase: '',
            error: {},
            hashCode: '',
            _purchase: purchase
        };
    }
    // private _serializeProductDetails(product: InAppPurchases.IAPItemDetails): any {
    //   return {
    //     packageName: this._packageName,
    //     productID: product.productId,
    //     productTitle: product.title,
    //     productDescription: product.description,
    //     productPrice: product.price,
    //     productRawPrice: String(product.priceAmountMicros / 1_000_000),
    //     productCurrencySymbol: product.priceCurrencyCode,
    //     productCurrencyCode: product.priceCurrencyCode,
    //     hashCode: '',
    //     _product: product
    //   };
    // }
    _serializeProductDetails(product) {
        return {
            packageName: this._packageName,
            productID: product.productId,
            productTitle: product.title,
            productDescription: product.description,
            productPrice: product.localizedPrice,
            productRawPrice: product.price,
            productCurrencySymbol: product.localizedPrice.replace(product.price, ''),
            productCurrencyCode: product.currency,
            hashCode: '',
            _product: product
        };
    }
    _serializeSubscriptionDetails(subscription) {
        var _a;
        let output = {
            productID: subscription.productId,
            productTitle: subscription.title,
            productDescription: subscription.description,
            hashCode: '',
        };
        if (react_native_1.Platform.OS === 'ios') {
            const subscriptionIOS = subscription;
            output.productPrice = subscriptionIOS.localizedPrice;
            output.productRawPrice = subscriptionIOS.price;
            output.productCurrencyCode = subscriptionIOS.currency;
            output._subscription = subscriptionIOS;
        }
        else if (react_native_1.Platform.OS === 'android') {
            const subscriptionAndroid = subscription;
            if ((_a = subscriptionAndroid.subscriptionOfferDetails) === null || _a === void 0 ? void 0 : _a.length) {
                const offerDetails = subscriptionAndroid.subscriptionOfferDetails[0];
                const priceAmountMicros = parseInt(offerDetails.pricingPhases.pricingPhaseList[0].priceAmountMicros, 10) || 0;
                output.productPrice = offerDetails.pricingPhases.pricingPhaseList[0].formattedPrice;
                output.productRawPrice = String(priceAmountMicros / 1000000);
                output.productCurrencyCode = offerDetails.pricingPhases.pricingPhaseList[0].priceCurrencyCode;
            }
            output._subscription = subscriptionAndroid;
        }
        return output;
    }
    _markSDKAsInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    _isSDKInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}
exports.default = GoMarketMe.getInstance();
//# sourceMappingURL=index.js.map