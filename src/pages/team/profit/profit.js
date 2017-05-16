"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Profit = (function () {
    function Profit(navCtrl, api, tip) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.tip = tip;
        this.subparameter = {};
        this.hasMore = false;
        this.subRecode = {};
        this.subRecodeList = [];
    }
    Profit.prototype.ngOnInit = function () {
        this.subparameter.storeid = this.api.getStoreId();
        this.subparameter.limit = "10";
        this.subparameter.page = 1;
        this.getSubList();
    };
    Profit.prototype.moreInfo = function (infiniteScroll) {
        if (!this.hasMore)
            return;
        this.getSubList().then(function (res) { return infiniteScroll.complete(); });
    };
    Profit.prototype.getSubList = function () {
        var _this = this;
        return this.api.getSubList(this.subparameter).then(function (res) {
            if (res && res.list && res.list.length > 0) {
                if (res.totalPage > res.page) {
                    _this.hasMore = true;
                    _this.subparameter.page++;
                }
                else
                    _this.hasMore = false;
                for (var i = 0; i < res.list.length; i++) {
                    _this.subRecode = res.list[i];
                    _this.subRecodeList.push(_this.subRecode);
                }
            }
        });
    };
    Profit.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    Profit = __decorate([
        core_1.Component({
            selector: 'page-profit',
            templateUrl: 'profit.html'
        })
    ], Profit);
    return Profit;
}());
exports.Profit = Profit;
