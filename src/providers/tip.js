"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Tip = (function () {
    function Tip(alertCtrl, toastCtrl, loadingCtrl) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    Tip.prototype.presentToast = function (message, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        return new Promise(function (resolve, reject) {
            var toast = _this.toastCtrl.create({
                message: message,
                duration: opts.duration || 1000,
                position: opts.position || 'top'
            });
            toast.onDidDismiss(function () {
                resolve();
            });
            toast.present();
        });
    };
    Tip.prototype.presentLoading = function (message, opts) {
        if (opts === void 0) { opts = {}; }
        var loader = this.loadingCtrl.create({
            content: message || "",
            duration: opts.duration || 5000
        });
        loader.present();
        return loader;
        // setTimeout(() => {
        //   loader.dismiss();
        // }, 5000);
    };
    Tip.prototype.presentConfirm = function (message, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        return new Promise(function (resolve, reject) {
            var alert = _this.alertCtrl.create({
                title: '提示',
                message: message || '请确认操作',
                buttons: [
                    {
                        text: opts.cancelText || '取消',
                        role: 'cancel',
                        handler: function () {
                            resolve(false);
                        }
                    },
                    {
                        text: opts.okText || '退出',
                        handler: function () {
                            resolve(true);
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    Tip.prototype.presentReplyPrompt = function (at) {
        return this.presentPrompt({ title: '发表回复:', okText: '发送', inputName: 'data', inputPlaceholder: at || '回复文章' });
    };
    Tip.prototype.presentPrompt = function (opts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var alert = _this.alertCtrl.create({
                title: opts.title || '输入',
                inputs: [
                    {
                        name: opts.inputName || 'data',
                        placeholder: opts.inputPlaceholder || '请输入',
                        checked: true
                    }
                ],
                buttons: [
                    {
                        text: opts.cancelText || '取消',
                        role: 'cancel',
                        handler: function (data) {
                            resolve(false);
                        }
                    },
                    {
                        text: opts.okText || '确定',
                        handler: function (data) {
                            resolve(data);
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    Tip = __decorate([
        core_1.Injectable()
    ], Tip);
    return Tip;
}());
exports.Tip = Tip;
