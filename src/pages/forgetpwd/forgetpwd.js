"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var country_1 = require('../country/country');
var ForgetPwdPage = (function () {
    function ForgetPwdPage(navCtrl, viewCtrl, tip, api) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.tip = tip;
        this.api = api;
        this.signup = {};
        this.submitted = false;
        this.countdown = "发送验证码";
        this.signup.hiddenflag = false;
        if (this.signup.areaCode == null) {
            this.signup.areaCode = '+86';
            this.signup.areaName = '中国';
        }
    }
    ForgetPwdPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ForgetPwdPage.prototype.submitForgerPwd = function (form) {
        var _this = this;
        if (!this.signup.areaCode) {
            this.tip.presentToast('请选择国家');
            return;
        }
        if (!this.signup.phone) {
            this.tip.presentToast('请输入手机号');
            return;
        }
        if (!this.signup.yzcode) {
            this.tip.presentToast('请输入验证码');
            return;
        }
        if (this.signup.yzcode.length != 6) {
            this.tip.presentToast('验证码必须为六位');
            return;
        }
        if (!this.signup.password) {
            this.tip.presentToast('请输入6-16位密码');
            return;
        }
        if (this.signup.password.length < 6) {
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
        var loader = this.tip.presentLoading('正发修改密码...');
        this.api.doForgetpwd(this.signup).then(function (res) {
            loader.dismiss();
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                _this.tip.presentToast('密码修改成功');
                _this.navCtrl.pop();
            }
        });
    };
    ForgetPwdPage.prototype.chooseCountry = function () {
        this.navCtrl.push(country_1.Country, { 'signup': this.signup });
    };
    ForgetPwdPage.prototype.sendMsgCode = function () {
        var _this = this;
        if (this.countdown == "发送验证码" || this.countdown == "重新发送") {
            if (!this.signup.phone) {
                this.tip.presentToast('请输入手机号');
                return;
            }
            //发送短信验证码
            var loader_1 = this.tip.presentLoading('正发送短信验证码');
            this.api.doSendMsgCode(this.signup.phone, "forget", this.signup.areaCode).then(function (res) {
                loader_1.dismiss();
                if (res.code != "0") {
                    _this.tip.presentToast(res.result);
                }
                else {
                    _this.tip.presentToast('短信发送成功');
                    var i_1 = 120;
                    //this.countdown--;
                    var t = setInterval(function () {
                        if (i_1 == 0) {
                            i_1 = 120;
                            _this.countdown = '重新发送';
                            clearInterval(t);
                        }
                        else {
                            i_1--;
                            _this.countdown = i_1 + "s";
                            console.log(_this.countdown);
                        }
                    }, 1000);
                }
            });
        }
    };
    ForgetPwdPage = __decorate([
        core_1.Component({
            selector: 'page-forgetpwd',
            templateUrl: 'forgetpwd.html'
        })
    ], ForgetPwdPage);
    return ForgetPwdPage;
}());
exports.ForgetPwdPage = ForgetPwdPage;
