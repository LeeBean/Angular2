"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var openShop_1 = require('../storeManage/openshop/openShop');
var SignupPage2 = (function () {
    function SignupPage2(navCtrl, tip, navParams, api, dataapi) {
        this.navCtrl = navCtrl;
        this.tip = tip;
        this.navParams = navParams;
        this.api = api;
        this.dataapi = dataapi;
        this.signup = {};
        this.submitted = false;
        this.signup = navParams.get("signup");
    }
    SignupPage2.prototype.onSignup = function (form) {
        var _this = this;
        //this.submitted = true;
        if (!this.signup.yqcode) {
            this.tip.presentToast('请输入邀请码');
            return;
        }
        if (!this.signup.password) {
            this.tip.presentToast('请输入6-16位密码');
            return;
        }
        else if (this.signup.password.length < 6) {
            this.tip.presentToast('请输入6-16位密码');
            return;
        }
        if (!this.signup.password2) {
            this.tip.presentToast('请再次输入密码');
            return;
        }
        if (this.signup.password != this.signup.password2) {
            this.tip.presentToast('两次密码输入不一致');
            return;
        }
        console.log(this.signup);
        var loader = this.tip.presentLoading('正在注册...');
        this.api.doSignup(this.signup).then(function (res) {
            loader.dismiss();
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                var user = {};
                user.userId = res.list.userid;
                _this.tip.presentToast('注册成功');
                _this.dataapi.setLoginUserWithId(user);
                _this.dataapi.setLoginUser(user);
                _this.dataapi.setToken(res.list.userid);
                _this.navCtrl.push(openShop_1.OpenShopPage);
            }
        });
    };
    SignupPage2.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SignupPage2 = __decorate([
        core_1.Component({
            selector: 'page-signup2',
            templateUrl: 'signup2.html'
        })
    ], SignupPage2);
    return SignupPage2;
}());
exports.SignupPage2 = SignupPage2;
