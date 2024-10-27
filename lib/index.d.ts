declare class GoMarketMe {
    private static instance;
    private sdkInitializedKey;
    private affiliateCampaignCode;
    private deviceId;
    private sdkInitializationUrl;
    private systemInfoUrl;
    private eventUrl;
    private constructor();
    static getInstance(): GoMarketMe;
    initialize(apiKey: string): Promise<void>;
    private addListener;
    private mapPurchase;
    private fetchPurchases;
    private getSystemInfo;
    private postSDKInitialization;
    private postSystemInfo;
    private readAndroidDeviceInfo;
    private readIosDeviceInfo;
    private markSDKAsInitialized;
    private isSDKInitialized;
    private fetchPurchaseProducts;
    private sendEventToServer;
    private serializeProductDetails;
}
declare const _default: GoMarketMe;
export default _default;
