"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var trading_1 = require('../trading/trading');
var withdrawals_1 = require('../withdrawals/withdrawals');
var bankCard_1 = require('../bankCard/bankCard');
var cards_1 = require('../bankCard/cards/cards');
var goodCard_1 = require('../bankCard/goodCard/goodCard');
var EarningRecord = (function () {
    function EarningRecord(navCtrl, tip, api) {
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.api = api;
        //status 用户权限 1：小B权限  2：大B权限  3：供应商权限
        this.finance = {};
        this.myBankCard = {};
    }
    EarningRecord.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getFinance(this.api.getStoreId(), this.api.getToken()).then(function (res) {
            if (res.code == "0") {
                _this.finance = res.list[0];
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    EarningRecord.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    EarningRecord.prototype.trad = function () {
        this.navCtrl.push(trading_1.Trading, { "status": "1", "userrole": this.finance.status });
    };
    EarningRecord.prototype.trad2 = function () {
        this.navCtrl.push(trading_1.Trading, { "status": "2", "userrole": this.finance.status });
    };
    EarningRecord.prototype.withd = function () {
        this.navCtrl.push(withdrawals_1.Withdrawals);
    };
    EarningRecord.prototype.profit = function () {
        var _this = this;
        this.api.getShopBank(this.api.getStoreId(), this.api.getToken()).then(function (res) {
            if (res.code == "0") {
                var data = res.list;
                if (data.length > 0) {
                    _this.myBankCard = data[0];
                    _this.navCtrl.push(goodCard_1.GoodCard, { 'myBankCard': _this.myBankCard });
                }
                else {
                    _this.tip.presentConfirm('您还未添加银行卡!是否添加?', {
                        okText: '立即前往',
                        cancelText: '取消'
                    }).then(function (res) {
                        if (res) {
                            _this.navCtrl.push(bankCard_1.BankCard);
                        }
                    });
                }
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    EarningRecord.prototype.dofinance = function () {
        var _this = this;
        this.api.getShopBank(this.api.getStoreId(), this.api.getToken()).then(function (res) {
            if (res.code == "0") {
                var data = res.list;
                if (data.length > 0) {
                    _this.navCtrl.push(cards_1.Cards);
                }
                else {
                    _this.tip.presentConfirm('您还未添加银行卡!是否添加?', {
                        okText: '立即前往',
                        cancelText: '取消'
                    }).then(function (res) {
                        if (res) {
                            _this.navCtrl.push(bankCard_1.BankCard);
                        }
                    });
                }
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    EarningRecord = __decorate([
        core_1.Component({
            selector: 'page-earningRecord',
            templateUrl: 'earningRecord.html'
        })
    ], EarningRecord);
    return EarningRecord;
}());
exports.EarningRecord = EarningRecord;
