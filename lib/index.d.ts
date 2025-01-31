export declare class GoMarketMeAffiliateMarketingData {
    campaign: Campaign;
    affiliate: Affiliate;
    saleDistribution: SaleDistribution;
    affiliateCampaignCode: string;
    deviceId: string;
    offerCode?: string;
    constructor(campaign: Campaign, affiliate: Affiliate, saleDistribution: SaleDistribution, affiliateCampaignCode: string, deviceId: string, offerCode?: string);
    static fromJson(json: Record<string, any>): GoMarketMeAffiliateMarketingData | null;
}
export declare class Campaign {
    id: string;
    name: string;
    status: string;
    type: string;
    publicLinkUrl?: string;
    constructor(id: string, name: string, status: string, type: string, publicLinkUrl?: string);
    static fromJson(json: Record<string, any>): Campaign;
}
export declare class Affiliate {
    id: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    instagramAccount: string;
    tiktokAccount: string;
    xAccount: string;
    constructor(id: string, firstName: string, lastName: string, countryCode: string, instagramAccount: string, tiktokAccount: string, xAccount: string);
    static fromJson(json: Record<string, any>): Affiliate;
}
export declare class SaleDistribution {
    platformPercentage: string;
    affiliatePercentage: string;
    constructor(platformPercentage: string, affiliatePercentage: string);
    static fromJson(json: Record<string, any>): SaleDistribution;
}
declare class GoMarketMe {
    private static instance;
    private sdkType;
    private sdkVersion;
    private sdkInitializedKey;
    private sdkInitializationUrl;
    private systemInfoUrl;
    private eventUrl;
    private _affiliateCampaignCode;
    private _deviceId;
    private _packageName;
    affiliateMarketingData?: GoMarketMeAffiliateMarketingData | null;
    private constructor();
    static getInstance(): GoMarketMe;
    initialize(apiKey: string): Promise<void>;
    private _addListener;
    private _getSystemInfo;
    private _postSDKInitialization;
    private _postSystemInfo;
    private _generateAndroidId;
    private _readAndroidDeviceInfo;
    private _readIosDeviceInfo;
    private _getTimeZone;
    private _getLanguageCode;
    private _fetchConsolidatedPurchases;
    private _sendEventToServer;
    private _serializePurchaseDetails;
    private _serializeProductDetails;
    private _serializeSubscriptionDetails;
    private _markSDKAsInitialized;
    private _isSDKInitialized;
}
declare const _default: GoMarketMe;
export default _default;
