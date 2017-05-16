"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var offinfo_1 = require("../offinfo/offinfo");
var profit_1 = require("../profit/profit");
var Offline = (function () {
    function Offline(navCtrl, api, tip) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.tip = tip;
        this.sub_number = "";
        this.sub_profit = "";
    }
    Offline.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getSubInfo(this.api.getStoreId()).then(function (res) {
            if (res.code == "0") {
                _this.sub_number = res.sub_number;
                _this.sub_profit = res.sub_profit;
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    Offline.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    Offline.prototype.offinfo = function () {
        this.navCtrl.push(offinfo_1.Offinfo);
    };
    Offline.prototype.profit = function () {
        this.navCtrl.push(profit_1.Profit);
    };
    Offline = __decorate([
        core_1.Component({
            selector: 'page-offline',
            templateUrl: 'offline.html'
        })
    ], Offline);
    return Offline;
}());
exports.Offline = Offline;
