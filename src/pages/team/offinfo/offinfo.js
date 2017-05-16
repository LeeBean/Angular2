"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Offinfo = (function () {
    function Offinfo(navCtrl, api, tip) {
        this.navCtrl = navCtrl;
        this.api = api;
        this.tip = tip;
        this.sublistpar = {};
        this.hasMore = false;
        this.subxq = {};
        this.subxqList = [];
    }
    Offinfo.prototype.ngOnInit = function () {
        this.sublistpar.storeid = this.api.getStoreId();
        this.sublistpar.limit = "10";
        this.sublistpar.page = 1;
        this.sublistpar.order_status = "1";
        this.getsubxqList();
    };
    Offinfo.prototype.moreInfo = function (infiniteScroll) {
        if (!this.hasMore)
            return;
        this.getsubxqList().then(function (res) { return infiniteScroll.complete(); });
    };
    Offinfo.prototype.getsubxqList = function () {
        var _this = this;
        return this.api.getsubxqList(this.sublistpar).then(function (res) {
            if (res && res.list && res.list.length > 0) {
                if (res.totalPage > res.page) {
                    _this.hasMore = true;
                    _this.sublistpar.page++;
                }
                else
                    _this.hasMore = false;
                for (var i = 0; i < res.list.length; i++) {
                    _this.subxq = res.list[i];
                    _this.subxqList.push(_this.subxq);
                }
            }
        });
    };
    Offinfo.prototype.changeStatus = function (status) {
        this.subxqList = [];
        this.sublistpar.page = 1;
        this.sublistpar.order_status = status;
        this.getsubxqList();
    };
    Offinfo.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    Offinfo = __decorate([
        core_1.Component({
            selector: 'page-offinfo',
            templateUrl: 'offinfo.html'
        })
    ], Offinfo);
    return Offinfo;
}());
exports.Offinfo = Offinfo;
