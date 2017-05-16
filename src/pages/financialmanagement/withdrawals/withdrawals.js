"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Withdrawals = (function () {
    function Withdrawals(navCtrl, navParams, dataApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataApi = dataApi;
        this.hasMore = false;
        this.widthdrawparameter = {};
        this.widthdrawrecode = {};
        this.widthdrawrecodeList = [];
    }
    Withdrawals.prototype.ngOnInit = function () {
        this.widthdrawparameter.storeid = this.dataApi.getStoreId();
        this.widthdrawparameter.limit = "10";
        this.widthdrawparameter.page = 1;
        this.getWithDrawList();
    };
    Withdrawals.prototype.moreInfo = function (infiniteScroll) {
        if (!this.hasMore)
            return;
        this.getWithDrawList().then(function (res) { return infiniteScroll.complete(); });
    };
    Withdrawals.prototype.getWithDrawList = function () {
        var _this = this;
        return this.dataApi.getWithDrawList(this.widthdrawparameter).then(function (res) {
            if (res && res.list && res.list.length > 0) {
                if (res.totalPage > res.page) {
                    _this.hasMore = true;
                    _this.widthdrawparameter.page++;
                }
                else
                    _this.hasMore = false;
                for (var i = 0; i < res.list.length; i++) {
                    _this.widthdrawrecode = res.list[i];
                    _this.widthdrawrecodeList.push(_this.widthdrawrecode);
                }
            }
        });
    };
    Withdrawals.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    Withdrawals = __decorate([
        core_1.Component({
            selector: 'page-withdrawals',
            templateUrl: 'withdrawals.html'
        })
    ], Withdrawals);
    return Withdrawals;
}());
exports.Withdrawals = Withdrawals;
