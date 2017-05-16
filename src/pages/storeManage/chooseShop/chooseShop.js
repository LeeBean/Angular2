"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var createShop_1 = require("../createshop/createShop");
var tabs_1 = require('../../tabs/tabs');
var ChooseShop = (function () {
    function ChooseShop(navCtrl, tip, api, dataApi) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.api = api;
        this.dataApi = dataApi;
        this.shop = {};
        var loader = this.tip.presentLoading('');
        this.api.getShopList(this.dataApi.getToken()).then(function (res) {
            loader.dismiss();
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                _this.shopList = [];
                if (res.list && res.list.length > 0) {
                    for (var i = 0; i < res.list.length; i++) {
                        var obj = res.list[i];
                        _this.shop = obj;
                        _this.shop.flag = "2";
                        if (obj.status == 1) {
                            _this.shop.status = "正常";
                            _this.shop.flag = "1";
                        }
                        if (obj.status == 2)
                            _this.shop.status = "待审核";
                        if (obj.status == 3)
                            _this.shop.status = "审核未通过";
                        if (obj.status == 4)
                            _this.shop.status = "关闭";
                        _this.shopList.push(_this.shop);
                    }
                }
            }
        });
    }
    ChooseShop.prototype.userShop = function (event, item) {
        if (item.flag != 1) {
            this.tip.presentLoading('您的店铺正处于' + item.status + '状态');
        }
        this.dataApi.setUseShop(item);
        console.log(this.dataApi.getUseShop());
        this.navCtrl.push(tabs_1.TabsPage, { 'isnewshop': true });
    };
    ChooseShop.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ChooseShop.prototype.addShop = function () {
        var _this = this;
        var loader = this.tip.presentLoading('');
        this.api.getShopList(this.dataApi.getToken()).then(function (res) {
            loader.dismiss();
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                if (res.list && res.list.length > 1) {
                    _this.tip.presentToast('您的店铺已超过限定数量');
                    return;
                }
                _this.navCtrl.push(createShop_1.CreateShopPage);
            }
        });
    };
    ChooseShop = __decorate([
        core_1.Component({
            selector: 'page-chooseShop',
            templateUrl: 'chooseShop.html'
        })
    ], ChooseShop);
    return ChooseShop;
}());
exports.ChooseShop = ChooseShop;
