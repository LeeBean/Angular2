"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PriceChange = (function () {
    function PriceChange(navCtrl, tip, api, navParams, productApi) {
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.api = api;
        this.navParams = navParams;
        this.productApi = productApi;
        this.productid = "";
        this.productList = [];
        this.index = 0;
        this.productInfo = {};
        this.productid = navParams.get("productid");
        this.productList = navParams.get("productList");
        this.index = navParams.get("index");
    }
    PriceChange.prototype.ngOnInit = function () {
        this.getProductInfo();
    };
    PriceChange.prototype.getProductInfo = function () {
        var _this = this;
        this.productApi.getProductInfo(this.productid).then(function (res) {
            if (res.code == "0") {
                _this.productInfo = res.list;
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    //提交
    PriceChange.prototype.submitOPr = function () {
        var _this = this;
        var loader = this.tip.presentLoading('数据提交中...');
        this.productApi.submitChangPrice(this.productInfo, this.productid).then(function (res) {
            loader.dismiss();
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                _this.tip.presentToast('修改成功');
                _this.productList[_this.index].productprice = _this.productInfo.lsprice;
                _this.navCtrl.pop();
            }
        });
    };
    PriceChange.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PriceChange = __decorate([
        core_1.Component({
            selector: 'page-priceChange',
            templateUrl: 'priceChange.html'
        })
    ], PriceChange);
    return PriceChange;
}());
exports.PriceChange = PriceChange;
