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
var ProductApi = (function () {
    function ProductApi(http, api, local) {
        this.http = http;
        this.api = api;
        this.local = local;
        //获取单例config
        this.config = config_1.Config.getInstance();
    }
    ProductApi.prototype.getProductList = function (product) {
        return this.api.get('Product/shop_commodity', product);
    };
    ProductApi.prototype.getProducturl = function (productid, shopid) {
        return this.api.get('Product/shop_product', { productid: productid, shopid: shopid });
    };
    ProductApi.prototype.getBuyrul = function (productid, shopid, userid) {
        return this.api.get('Product/buy_oneself', { productid: productid, shopid: shopid, userid: userid });
    };
    ProductApi.prototype.productProp = function (productid, type, is_zy) {
        return this.api.get('Product/shop_handle', { productid: productid, type: type, is_zy: is_zy });
    };
    ProductApi.prototype.getProductDetailurl = function (productid, shopid) {
        return this.api.get('Product/shop_product', { productid: productid, shopid: shopid });
    };
    ProductApi.prototype.getProductInfo = function (productid) {
        return this.api.get('Product/shop_displayInfo', { productid: productid });
    };
    ProductApi.prototype.submitChangPrice = function (productInfo, productid) {
        var price = productInfo.price;
        var lsprice = productInfo.lsprice;
        return this.api.get('product/shop_editInfo', { productid: productid, price: price, lsprice: lsprice });
    };
    ProductApi = __decorate([
        core_1.Injectable()
    ], ProductApi);
    return ProductApi;
}());
exports.ProductApi = ProductApi;
