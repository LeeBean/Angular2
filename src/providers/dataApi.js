"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var config_1 = require("./config");
var constants_1 = require("./constants");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
/**
 * 这里用来封装一些与数据请求相关的业务逻辑
 * 当程序规模增大时，需要分离此文件
 * 1.业务上的对外http数据请求接口，统一在此处
 * 2.某些从localstorage获取数据的接口
 */
var DataApi = (function () {
    function DataApi(http, api, local) {
        this.http = http;
        this.api = api;
        this.local = local;
        //分销市场
        this.getMarketChannelList = function () {
            return this.api.get('Fx/fx_channel');
        };
        //分销市场频道主页
        this.getMarketChannelIndexList = function (parameter) {
            return this.api.get('Fx/fx_index', parameter);
        };
        //获取单例config
        this.config = config_1.Config.getInstance();
    }
    DataApi.prototype.setLoginUser = function (user) {
        this.local.set(constants_1.Constants.LOGINUSER, { data: user });
        this.config.loginUser = user;
    };
    DataApi.prototype.getLoginUser = function () {
        return this.config.loginUser;
    };
    DataApi.prototype.setUseShop = function (shop) {
        this.local.set(constants_1.Constants.USRSHOP, { data: shop });
        this.config.useShop = shop;
    };
    DataApi.prototype.getUseShop = function () {
        return this.config.useShop;
    };
    DataApi.prototype.getStoreId = function () {
        return this.config.useShop.store_id;
    };
    //登录
    DataApi.prototype.doLogin = function (phone, password) {
        return this.api.get('Login/submit', { phone: phone, password: password });
    };
    DataApi.prototype.getHomeData = function (shopid, userid) {
        return this.api.get('Shop/shop_index', { shopid: shopid, userid: userid });
    };
    DataApi.prototype.setToken = function (token) {
        this.local.set(constants_1.Constants.ACCESSTOKEN, { data: token });
        this.config.token = token;
    };
    DataApi.prototype.getToken = function () {
        return this.config.token;
    };
    DataApi.prototype.setLoginUserWithId = function (user) {
        this.local.set(constants_1.Constants.LOGINUSERWITHID, { data: user });
        this.config.loginUserWithId = user;
    };
    DataApi.prototype.getLoginUserWithId = function () {
        return this.config.loginUserWithId;
    };
    //退出登录
    DataApi.prototype.logout = function () {
        this.local.remove(constants_1.Constants.ACCESSTOKEN);
        this.local.remove(constants_1.Constants.LOGINUSER);
        this.local.remove(constants_1.Constants.LOGINUSERWITHID);
        this.config.token = '';
        this.config.loginUser = null;
        this.config.useShop = null;
        this.config.loginUserWithId = null;
        console.log('token、loginuser已经清除，退出成功');
    };
    DataApi.prototype.clearCache = function () {
        var _this = this;
        this.local.forEach(function (value, key, index) {
            if (key.startsWith('CACHE_')) {
                _this.local.remove(key);
            }
        });
    };
    DataApi.prototype.isIonic = function () {
        return this.config.isIonic;
    };
    //type = reg：注册，forget：忘记密码
    DataApi.prototype.doSendMsgCode = function (phone, type, areaCode) {
        return this.api.get('Public/send_code', { phone: phone, type: type, areaCode: areaCode });
    };
    DataApi.prototype.doForgetpwd = function (signup) {
        return this.api.get('Lostpwd/submit', signup);
    };
    DataApi.prototype.doModifyPassword = function (passwd) {
        return this.api.get('Pwd/edit_pwd', passwd);
    };
    DataApi.prototype.pttuijian = function (shopid) {
        return this.api.get('Shop/addStoreProduct', { shopid: shopid });
    };
    DataApi.prototype.getViewurl = function (shopid, userid) {
        return this.api.get('Shop/preview', { shopid: shopid, userid: userid });
    };
    DataApi.prototype.getFinance = function (shopid, userid) {
        return this.api.get('Shop/finance', { shopid: shopid, userid: userid });
    };
    DataApi.prototype.getShopBank = function (shopid, userid) {
        return this.api.get('Shop/shop_bank', { shopid: shopid, userid: userid });
    };
    DataApi.prototype.getMycardInfo = function (shopid, userid) {
        return this.api.get('Shop/depositors_index', { shopid: shopid, userid: userid });
    };
    DataApi.prototype.doWidthDraw = function (shopid, userid, txje) {
        return this.api.get('Shop/depositors_apply', { shopid: shopid, userid: userid, txje: txje });
    };
    DataApi.prototype.getBanks = function () {
        return this.api.get('Shop/bank');
    };
    DataApi.prototype.doCreatBankcard = function (ob) {
        return this.api.get('Shop/shop_add_bank', ob);
    };
    //收益记录
    DataApi.prototype.getTradList = function (ob) {
        return this.api.get('Shop/records', ob);
    };
    DataApi.prototype.getWithDrawList = function (ob) {
        return this.api.get('Shop/present_record', ob);
    };
    //下线管理
    DataApi.prototype.getSubInfo = function (storeid) {
        return this.api.get('Shop/sub_manage', { storeid: storeid });
    };
    //下线详情
    DataApi.prototype.getSubList = function (ob) {
        return this.api.get('Shop/sub_list', ob);
    };
    //分成收益
    DataApi.prototype.getsubxqList = function (ob) {
        return this.api.get('Shop/sub_order', ob);
    };
    DataApi = __decorate([
        core_1.Injectable()
    ], DataApi);
    return DataApi;
}());
exports.DataApi = DataApi;
