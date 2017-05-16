"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ModifyPwdPage = (function () {
    function ModifyPwdPage(navCtrl, viewCtrl, tip, api) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.tip = tip;
        this.api = api;
        this.passwd = {};
        this.submitted = false;
        this.passwd.userid = api.getToken();
    }
    ModifyPwdPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ModifyPwdPage.prototype.modifypwdSubmit = function () {
        var _this = this;
        if (!this.passwd.oldpwd) {
            this.tip.presentToast('请输入6-16位密码');
            return;
        }
        if (!this.passwd.newpwd) {
            this.tip.presentToast('请输入6-16位密码');
            return;
        }
        if (!this.passwd.newpwd2) {
            this.tip.presentToast('请再次输入密码');
            return;
        }
        if (this.passwd.newpwd != this.passwd.newpwd2) {
            this.tip.presentToast('两次密码输入不一致');
            return;
        }
        var loader = this.tip.presentLoading('正发修改密码...');
        this.api.doModifyPassword(this.passwd).then(function (res) {
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
    ModifyPwdPage = __decorate([
        core_1.Component({
            selector: 'page-modifypwd',
            templateUrl: 'modifypwd.html'
        })
    ], ModifyPwdPage);
    return ModifyPwdPage;
}());
exports.ModifyPwdPage = ModifyPwdPage;
