"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var WuLiu = (function () {
    function WuLiu(navCtrl, navParams, storeApis, tip) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storeApis = storeApis;
        this.tip = tip;
        this.parameter = {};
        this.package = {};
        this.parameter.orderno = navParams.get("orderno");
    }
    WuLiu.prototype.ngOnInit = function () {
        var _this = this;
        this.storeApis.getOrderPackage(this.parameter).then(function (res) {
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                _this.package.orderList = res.list;
                console.log(_this.package);
            }
        });
    };
    WuLiu.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    WuLiu = __decorate([
        core_1.Component({
            selector: 'page-wuliu',
            templateUrl: 'wuliu.html'
        })
    ], WuLiu);
    return WuLiu;
}());
exports.WuLiu = WuLiu;
