"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var tabs_1 = require('../../tabs/tabs');
var CreateShopPage = (function () {
    function CreateShopPage(navCtrl, tip, api, dataapi, local) {
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.api = api;
        this.dataapi = dataapi;
        this.local = local;
        this.shop = {};
        this.store = {};
    }
    CreateShopPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    CreateShopPage.prototype.createshopSubmit = function () {
        var _this = this;
        this.shop.userid = this.dataapi.getToken();
        var loader = this.tip.presentLoading('正在创建店铺...');
        this.api.doCreateShop(this.shop).then(function (res) {
            loader.dismiss();
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                _this.tip.presentToast('创建成功');
                if (res.list) {
                    var obj = res.list;
                    _this.store.store_id = obj.shopid;
                    _this.store.name = obj.shopname;
                    _this.store.yqm = obj.yqm;
                    _this.store.status = "正常";
                    _this.store.flag = "1";
                    _this.store.logo = obj.shopimage;
                    _this.dataapi.setUseShop(_this.store);
                    _this.navCtrl.push(tabs_1.TabsPage, { 'isnewshop': false });
                }
            }
        });
    };
    CreateShopPage = __decorate([
        core_1.Component({
            selector: 'page-createshop',
            templateUrl: 'createShop.html'
        })
    ], CreateShopPage);
    return CreateShopPage;
}());
exports.CreateShopPage = CreateShopPage;
