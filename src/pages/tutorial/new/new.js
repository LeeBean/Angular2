"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var introduce_1 = require("../introduce/introduce");
var shop_1 = require("../shop/shop");
var release_1 = require("../release/release");
var development_1 = require("../development/development");
var extension_1 = require("../extension/extension");
var tx_1 = require("../tx/tx");
var th_1 = require("../th/th");
var yw_1 = require("../yw/yw");
var New = (function () {
    function New(navCtrl) {
        this.navCtrl = navCtrl;
    }
    New.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    New.prototype.introduce = function () {
        this.navCtrl.push(introduce_1.Introduce);
    };
    New.prototype.shop = function () {
        this.navCtrl.push(shop_1.Shop);
    };
    New.prototype.release = function () {
        this.navCtrl.push(release_1.Release);
    };
    New.prototype.development = function () {
        this.navCtrl.push(development_1.Development);
    };
    New.prototype.extension = function () {
        this.navCtrl.push(extension_1.Extension);
    };
    New.prototype.tx = function () {
        this.navCtrl.push(tx_1.Tx);
    };
    New.prototype.th = function () {
        this.navCtrl.push(th_1.Th);
    };
    New.prototype.yw = function () {
        this.navCtrl.push(yw_1.Yw);
    };
    New = __decorate([
        core_1.Component({
            selector: 'page-new',
            templateUrl: 'new.html'
        })
    ], New);
    return New;
}());
exports.New = New;
