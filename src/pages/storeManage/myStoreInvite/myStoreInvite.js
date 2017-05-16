"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MyStoreInvite = (function () {
    function MyStoreInvite(navCtrl, api) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.shop = {};
        this.shop = this.api.getUseShop();
    }
    MyStoreInvite.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    MyStoreInvite.prototype.shareYqm = function () {
        ShareManager.shareAction({
            shareTypes: ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
            title: this.shop.name + "诚邀您加入集客多， 注册邀请码为" + this.shop.yqm,
            description: "千款正品，假一罚十。零成本开店，成本价自买。动动手指就赚钱!",
            url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd",
            imageUrl: this.shop.logo
        });
    };
    MyStoreInvite = __decorate([
        core_1.Component({
            selector: 'page-mystoreinvite',
            templateUrl: 'myStoreInvite.html'
        })
    ], MyStoreInvite);
    return MyStoreInvite;
}());
exports.MyStoreInvite = MyStoreInvite;
