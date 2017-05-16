"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BankCard = (function () {
    function BankCard(navCtrl, tip, api, alertCtrl) {
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.api = api;
        this.alertCtrl = alertCtrl;
        this.bank = {};
        this.banks = [];
        this.creatData = {};
    }
    BankCard.prototype.ngOnInit = function () {
        var _this = this;
        this.creatData.shopid = this.api.getStoreId();
        this.creatData.userid = this.api.getToken();
        this.api.getBanks().then(function (res) {
            if (res.code == "0") {
                _this.banks = res.list;
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    BankCard.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    BankCard.prototype.doCheckbox = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('请选择银行');
        for (var i = 0; i < this.banks.length; i++) {
            if (this.banks[i].bankCode == this.bank.bankCode) {
                alert.addInput({
                    type: 'radio',
                    label: this.banks[i].bankName,
                    value: this.banks[i].bankCode + "," + this.banks[i].bankName,
                    checked: true
                });
            }
            else {
                alert.addInput({
                    type: 'radio',
                    label: this.banks[i].bankName,
                    value: this.banks[i].bankCode + "," + this.banks[i].bankName,
                });
            }
        }
        //alert.addButton('取消');
        alert.addButton({
            text: '确定',
            handler: function (data) {
                _this.testRadioOpen = false;
                _this.testRadioResult = data;
                var vaule = [];
                if (vaule != null && vaule.length > 0) {
                    vaule = data.split(",");
                }
                if (vaule.length == 2) {
                    _this.bank.bankCode = vaule[0];
                    _this.bank.bankName = vaule[1];
                    _this.creatData.bankCode = vaule[0];
                }
            }
        });
        alert.present().then(function () {
            _this.testRadioOpen = true;
        });
    };
    BankCard.prototype.doSubmitdata = function () {
        var _this = this;
        //console.log(this.creatData);
        if (this.creatData.bankCode == "") {
            this.tip.presentToast("请选择银行卡");
            return;
        }
        if (this.creatData.khuhang == "") {
            this.tip.presentToast("请输入开户行");
            return;
        }
        if (this.creatData.cardNo == "") {
            this.tip.presentToast("请输入卡号");
            return;
        }
        if (this.creatData.name == "") {
            this.tip.presentToast("请输入姓名");
            return;
        }
        var loader = this.tip.presentLoading('数据提交中...');
        this.api.doCreatBankcard(this.creatData).then(function (res) {
            loader.dismiss();
            if (res.code == "0") {
                _this.tip.presentToast("银行卡添加成功");
                _this.navCtrl.pop();
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    BankCard = __decorate([
        core_1.Component({
            selector: 'page-bankCard',
            templateUrl: 'bankCard.html'
        })
    ], BankCard);
    return BankCard;
}());
exports.BankCard = BankCard;
