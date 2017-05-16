"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var signup_1 = require('../signup/signup');
var forgetpwd_1 = require('../forgetpwd/forgetpwd');
var chooseShop_1 = require("../storeManage/chooseShop/chooseShop");
var LoginPage = (function () {
    function LoginPage(navCtrl, api, tip) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.tip = tip;
        this.login = {};
        this.submitted = false;
        this.loginuser = {};
        this.isLogin = false;
        this.token = '';
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        this.getLoginUser();
    };
    LoginPage.prototype.getLoginUser = function () {
        if (this.api.getLoginUser()) {
            this.loginuser = this.api.getLoginUser();
            this.token = this.api.getToken();
            this.isLogin = true;
        }
        else {
            this.isLogin = false;
        }
    };
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            var loader_1 = this.tip.presentLoading('正在登录...');
            this.api.doLogin(this.login.phone, this.login.password).then(function (res) {
                loader_1.dismiss();
                if (res.code != "0") {
                    _this.tip.presentToast(res.result);
                }
                else {
                    var user = {};
                    user.userId = res.userid;
                    user.is_yqm = res.is_yqm;
                    user.userpic = res.userpic;
                    _this.tip.presentToast('登录成功');
                    _this.api.setLoginUserWithId(user);
                    _this.api.setLoginUser(user);
                    _this.api.setToken(res.userid);
                    _this.navCtrl.push(chooseShop_1.ChooseShop);
                }
            });
        }
    };
    LoginPage.prototype.onSignup = function () {
        this.navCtrl.push(signup_1.SignupPage);
    };
    LoginPage.prototype.forgetPwd = function () {
        this.navCtrl.push(forgetpwd_1.ForgetPwdPage);
    };
    LoginPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
