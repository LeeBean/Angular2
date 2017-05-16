"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var chooseShop_1 = require('../storeManage/chooseShop/chooseShop');
var myStoreInfo_1 = require("../storeManage/myStoreInfo/myStoreInfo");
var modifypwd_1 = require("../modifypwd/modifypwd");
var login_1 = require("../login/login");
var MePage = (function () {
    function MePage(navCtrl, tip, api) {
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.api = api;
        this.shop = {};
        this.shop = this.api.getUseShop();
    }
    //this.local.set(Constants.LOGINUSER, { data: user });
    MePage.prototype.ngOnInit = function () {
        this.getUse();
        console.log(this.loginuser);
    };
    MePage.prototype.getUse = function () {
        this.loginuser = this.api.getLoginUser();
    };
    MePage.prototype.goToMyShop = function () {
        this.navCtrl.push(myStoreInfo_1.MyStoreInfo);
    };
    MePage.prototype.chooseShop = function () {
        this.navCtrl.push(chooseShop_1.ChooseShop);
    };
    MePage.prototype.modifyPwd = function () {
        this.navCtrl.push(modifypwd_1.ModifyPwdPage);
    };
    MePage.prototype.shareYqm = function () {
        ShareManager.shareAction({
            shareTypes: ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
            title: this.shop.name + "诚邀您加入集客多， 注册邀请码为" + this.shop.yqm,
            description: "千款正品，假一罚十。零成本开店，成本价自买。动动手指就赚钱!",
            url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd",
            imageUrl: this.shop.logo
        });
    };
    MePage.prototype.exitSystem = function () {
        var _this = this;
        this.tip.presentConfirm('您确定退出集客多系统吗?', {
            okText: '退出登录',
            cancelText: '取消'
        }).then(function (res) {
            if (res) {
                _this.api.logout();
                _this.tip.presentToast('退出成功');
                _this.navCtrl.push(login_1.LoginPage);
            }
        });
    };
    MePage = __decorate([
        core_1.Component({
            selector: 'page-me',
            templateUrl: 'me.html'
        })
    ], MePage);
    return MePage;
}());
exports.MePage = MePage;
