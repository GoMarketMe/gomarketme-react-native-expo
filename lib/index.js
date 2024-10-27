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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var Localization = __importStar(require("expo-localization"));
var InAppPurchases = __importStar(require("expo-in-app-purchases"));
var axios_1 = __importDefault(require("axios"));
var Device = __importStar(require("expo-device"));
var async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
var GoMarketMe = /** @class */ (function () {
    function GoMarketMe() {
        this.sdkInitializedKey = 'GOMARKETME_SDK_INITIALIZED';
        this.affiliateCampaignCode = '';
        this.deviceId = '';
        this.sdkInitializationUrl = 'https://api.gomarketme.net/v1/sdk-initialization';
        this.systemInfoUrl = 'https://api.gomarketme.net/v1/mobile/system-info';
        this.eventUrl = 'https://api.gomarketme.net/v1/event';
    }
    GoMarketMe.getInstance = function () {
        if (!GoMarketMe.instance) {
            GoMarketMe.instance = new GoMarketMe();
        }
        return GoMarketMe.instance;
    };
    GoMarketMe.prototype.initialize = function (apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var isSDKInitialized, systemInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.isSDKInitialized()];
                    case 1:
                        isSDKInitialized = _a.sent();
                        if (!!isSDKInitialized) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.postSDKInitialization(apiKey)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.getSystemInfo()];
                    case 4:
                        systemInfo = _a.sent();
                        return [4 /*yield*/, this.postSystemInfo(systemInfo, apiKey)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.addListener(apiKey)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        console.error('Error initializing GoMarketMe:', e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    GoMarketMe.prototype.addListener = function (apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                InAppPurchases.setPurchaseListener(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                    var _i, results_1, purchase, mappedPurchase, productIds;
                    var responseCode = _b.responseCode, results = _b.results;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(responseCode === InAppPurchases.IAPResponseCode.OK && results)) return [3 /*break*/, 5];
                                _i = 0, results_1 = results;
                                _c.label = 1;
                            case 1:
                                if (!(_i < results_1.length)) return [3 /*break*/, 5];
                                purchase = results_1[_i];
                                if (!this.affiliateCampaignCode) return [3 /*break*/, 4];
                                mappedPurchase = this.mapPurchase(purchase);
                                return [4 /*yield*/, this.fetchPurchases([mappedPurchase], apiKey)];
                            case 2:
                                productIds = _c.sent();
                                return [4 /*yield*/, this.fetchPurchaseProducts(productIds, apiKey)];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 1];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    GoMarketMe.prototype.mapPurchase = function (purchase) {
        var _a, _b;
        return {
            productId: purchase.productId,
            transactionDate: new Date().toISOString(),
            transactionId: (_a = purchase.purchaseToken) !== null && _a !== void 0 ? _a : "",
            verificationData: {
                localVerificationData: (_b = purchase.purchaseToken) !== null && _b !== void 0 ? _b : "",
            },
        };
    };
    GoMarketMe.prototype.fetchPurchases = function (purchaseDetailsList, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var productIds, _i, purchaseDetailsList_1, purchase;
            return __generator(this, function (_a) {
                productIds = [];
                for (_i = 0, purchaseDetailsList_1 = purchaseDetailsList; _i < purchaseDetailsList_1.length; _i++) {
                    purchase = purchaseDetailsList_1[_i];
                    if (purchase.verificationData.localVerificationData) {
                        if (purchase.productId && !productIds.includes(purchase.productId)) {
                            productIds.push(purchase.productId);
                        }
                    }
                }
                return [2 /*return*/, productIds];
            });
        });
    };
    GoMarketMe.prototype.getSystemInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var deviceData, _a, _b, windowData;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = react_native_1.Platform).select;
                        _c = {};
                        return [4 /*yield*/, this.readIosDeviceInfo()];
                    case 1:
                        _c.ios = _d.sent();
                        return [4 /*yield*/, this.readAndroidDeviceInfo()];
                    case 2:
                        deviceData = _b.apply(_a, [(_c.android = _d.sent(),
                                _c)]);
                        windowData = {
                            devicePixelRatio: react_native_1.PixelRatio.get(),
                            width: react_native_1.Dimensions.get('window').width,
                            height: react_native_1.Dimensions.get('window').height,
                        };
                        return [2 /*return*/, {
                                device_info: deviceData,
                                window_info: windowData,
                                time_zone_code: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                language_code: Localization.locale,
                            }];
                }
            });
        });
    };
    GoMarketMe.prototype.postSDKInitialization = function (apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, axios_1.default.post(this.sdkInitializationUrl, {}, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-api-key': apiKey,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status === 200)) return [3 /*break*/, 3];
                        console.log('Initialized!');
                        return [4 /*yield*/, this.markSDKAsInitialized()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.error('Failed to mark SDK as Initialized. Status code:', response.status);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.error('Error sending SDK information to server:', e_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GoMarketMe.prototype.postSystemInfo = function (systemInfo, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseData, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.systemInfoUrl, systemInfo, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-api-key': apiKey,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            responseData = response.data;
                            if (responseData.affiliate_campaign_code) {
                                this.affiliateCampaignCode = responseData.affiliate_campaign_code;
                            }
                            if (responseData.device_id) {
                                this.deviceId = responseData.device_id;
                            }
                        }
                        else {
                            console.error('Failed to send system info. Status code:', response.status);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.error('Error sending system info to server:', e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GoMarketMe.prototype.readAndroidDeviceInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        deviceId: Device.osBuildId,
                        systemName: Device.osName,
                        systemVersion: Device.osVersion,
                        brand: Device.brand,
                        model: Device.modelName,
                        manufacturer: Device.manufacturer,
                        isEmulator: !Device.isDevice,
                    }];
            });
        });
    };
    GoMarketMe.prototype.readIosDeviceInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        deviceId: Device.osBuildId,
                        systemName: Device.osName,
                        systemVersion: Device.osVersion,
                        brand: Device.brand,
                        model: Device.modelName,
                        manufacturer: Device.manufacturer,
                        isEmulator: !Device.isDevice,
                    }];
            });
        });
    };
    GoMarketMe.prototype.markSDKAsInitialized = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, async_storage_1.default.setItem(this.sdkInitializedKey, 'true')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_4 = _a.sent();
                        console.error('Failed to save SDK initialization:', e_4);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GoMarketMe.prototype.isSDKInitialized = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, async_storage_1.default.getItem(this.sdkInitializedKey)];
                    case 1:
                        value = _a.sent();
                        return [2 /*return*/, value === 'true'];
                    case 2:
                        e_5 = _a.sent();
                        console.error('Failed to load SDK initialization:', e_5);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GoMarketMe.prototype.fetchPurchaseProducts = function (productIds, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var productsResponse, products, _i, products_1, product, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, InAppPurchases.getProductsAsync(productIds)];
                    case 1:
                        productsResponse = _a.sent();
                        products = productsResponse.results;
                        if (!(products && products.length > 0)) return [3 /*break*/, 6];
                        _i = 0, products_1 = products;
                        _a.label = 2;
                    case 2:
                        if (!(_i < products_1.length)) return [3 /*break*/, 5];
                        product = products_1[_i];
                        return [4 /*yield*/, this.sendEventToServer(JSON.stringify(this.serializeProductDetails(product)), 'product', apiKey)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.sendEventToServer(JSON.stringify({ notFoundIDs: productIds.join(',') }), 'product', apiKey)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_6 = _a.sent();
                        console.error('Error fetching products:', e_6);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    GoMarketMe.prototype.sendEventToServer = function (body, eventType, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.eventUrl, body, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-affiliate-campaign-code': this.affiliateCampaignCode,
                                    'x-device-id': this.deviceId,
                                    'x-event-type': eventType,
                                    'x-product-type': react_native_1.Platform.OS,
                                    'x-source-name': react_native_1.Platform.OS === 'android' ? 'google_play' : 'app_store',
                                    'x-api-key': apiKey,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            console.log("".concat(eventType, " sent successfully"));
                        }
                        else {
                            console.error("Failed to send ".concat(eventType, ". Status code:"), response.status);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        console.error("Error sending ".concat(eventType, " to server:"), e_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GoMarketMe.prototype.serializeProductDetails = function (product) {
        return {
            productID: product.productId,
            productTitle: product.title,
            productDescription: product.description,
            productPrice: product.price,
            productRawPrice: product.price,
            productCurrencyCode: product.priceCurrencyCode,
        };
    };
    return GoMarketMe;
}());
exports.default = GoMarketMe.getInstance();
