"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Cards = (function () {
    function Cards(navCtrl, tip, api) {
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.api = api;
        this.withdraw = {};
        this.mycard = {};
        this.withdraw.txje = "0.00";
    }
    Cards.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getMycardInfo(this.api.getStoreId(), this.api.getToken()).then(function (res) {
            if (res.code == "0") {
                _this.mycard = res.list[0];
                var carno = _this.mycard.bank_card;
                _this.mycard.bank_card = carno.substring(0, 4) + "*****" + carno.substring(carno.length - 3, carno.length);
                _this.mycard.balance = _this.mycard.balance == null ? "0.00" : _this.mycard.balance;
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    //提现
    Cards.prototype.dowidthdraw = function () {
        var _this = this;
        if (this.withdraw.txje == "") {
            this.tip.presentToast("请输入提现金额！");
            return;
        }
        if (Number(this.withdraw.txje) < 50) {
            this.tip.presentToast("提现金额必须大于或者等于50元！");
            return;
        }
        var loader = this.tip.presentLoading('数据提交中...');
        this.api.doWidthDraw(this.api.getStoreId(), this.api.getToken(), this.withdraw.txje).then(function (res) {
            loader.dismiss();
            if (res.code == "0") {
                _this.tip.presentToast("提现成功！");
                _this.navCtrl.pop();
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    //全部提现
    Cards.prototype.withdrawAll = function () {
        this.withdraw.txje = this.mycard.balance;
    };
    Cards.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    Cards = __decorate([
        core_1.Component({
            selector: 'page-cards',
            templateUrl: 'cards.html'
        })
    ], Cards);
    return Cards;
}());
exports.Cards = Cards;
