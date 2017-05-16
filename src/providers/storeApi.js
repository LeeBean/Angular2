"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var config_1 = require("./config");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
/**
 * 这里用来封装一些与数据请求相关的业务逻辑
 * 当程序规模增大时，需要分离此文件
 * 1.业务上的对外http数据请求接口，统一在此处
 * 2.某些从localstorage获取数据的接口
 */
var StoreApis = (function () {
    function StoreApis(http, api, local) {
        this.http = http;
        this.api = api;
        this.local = local;
        //获取单例config
        this.config = config_1.Config.getInstance();
    }
    StoreApis.prototype.doCreateShop = function (shop) {
        return this.api.get('Shop/create_shop', shop);
    };
    StoreApis.prototype.getShopList = function (userid) {
        return this.api.get("Shop/manage_shop", { userid: userid });
    };
    StoreApis.prototype.getShopInfo = function (shopid) {
        return this.api.get("Shop/contens_shop", { shopid: shopid });
    };
    StoreApis.prototype.updateShopInfo = function (shop) {
        return this.api.get("Shop/edit_shop", shop);
    };
    //订单管理
    StoreApis.prototype.getOrderList = function (order) {
        return this.api.get("Shop/shop_order", order);
    };
    //订单详情
    StoreApis.prototype.getOrderDetail = function (parameter) {
        return this.api.get("Shop/order_details", parameter);
    };
    //订单物流信息
    StoreApis.prototype.getOrderPackage = function (parameter) {
        return this.api.get("Shop/order_package", parameter);
    };
    //确认收货
    StoreApis.prototype.checkTake = function (parameter) {
        return this.api.get("Shop/order_package", parameter);
    };
    StoreApis = __decorate([
        core_1.Injectable()
    ], StoreApis);
    return StoreApis;
}());
exports.StoreApis = StoreApis;
