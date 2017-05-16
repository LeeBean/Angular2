"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MyStoreInfo = (function () {
    function MyStoreInfo(navCtrl, dataApi, api, tip) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.dataApi = dataApi;
        this.api = api;
        this.tip = tip;
        this.shop = {};
        this.api.getShopInfo(this.dataApi.getStoreId()).then(function (res) {
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                if (res.list) {
                    _this.shop = res.list;
                    console.log(_this.shop);
                }
            }
        });
    }
    MyStoreInfo.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    MyStoreInfo.prototype.saveShopInfo = function () {
        var _this = this;
        var shopInfo = {};
        if (!this.shop.name) {
            this.tip.presentToast('店铺名称不能为空');
            return;
        }
        if (!this.shop.linkman) {
            this.tip.presentToast('联系人不能为空');
            return;
        }
        if (!this.shop.tel) {
            this.tip.presentToast('联系方式不能为空');
            return;
        }
        shopInfo.shopid = this.dataApi.getStoreId();
        shopInfo.shopname = this.shop.name;
        shopInfo.linkname = this.shop.linkman;
        shopInfo.linkphone = this.shop.tel;
        shopInfo.QQ = this.shop.qq;
        shopInfo.userid = this.dataApi.getToken();
        this.api.updateShopInfo(shopInfo).then(function (res) {
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                //this.tip.presentToast("修改成功");
                _this.shop = res.list;
                _this.shop.store_id = _this.dataApi.getStoreId();
                _this.dataApi.setUseShop(_this.shop);
                //this.navCtrl.push(MePage);
                _this.navCtrl.pop();
            }
        });
    };
    MyStoreInfo = __decorate([
        core_1.Component({
            selector: 'page-mystoreInfo',
            templateUrl: 'myStoreInfo.html'
        })
    ], MyStoreInfo);
    return MyStoreInfo;
}());
exports.MyStoreInfo = MyStoreInfo;
