"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var explain_1 = require('../explain/explain');
var Trading = (function () {
    function Trading(navCtrl, navParams, dataApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataApi = dataApi;
        this.userrole = "";
        this.tradpageTitle = "收益记录";
        this.tradparameter = {};
        this.hasMore = false;
        this.trad = {};
        this.tradList = [];
        this.userrole = navParams.get("userrole");
        this.tradparameter.status = navParams.get("status");
        if (this.tradparameter.status == "2") {
            this.tradpageTitle = "交易中收益";
        }
    }
    Trading.prototype.ngOnInit = function () {
        this.tradparameter.userid = this.dataApi.getToken();
        this.tradparameter.shopid = this.dataApi.getStoreId();
        this.tradparameter.limit = "10";
        this.tradparameter.page = 1;
        this.tradparameter.type = "1";
        this.getTradList();
    };
    Trading.prototype.moreInfo = function (infiniteScroll) {
        if (!this.hasMore)
            return;
        this.getTradList().then(function (res) { return infiniteScroll.complete(); });
    };
    Trading.prototype.getTradList = function () {
        var _this = this;
        return this.dataApi.getTradList(this.tradparameter).then(function (res) {
            if (res && res.list && res.list.length > 0) {
                if (res.totalPage > res.page) {
                    _this.hasMore = true;
                    _this.tradparameter.page++;
                }
                else
                    _this.hasMore = false;
                for (var i = 0; i < res.list.length; i++) {
                    _this.trad = res.list[i];
                    if (_this.trad.order_status != null) {
                        if (_this.trad.order_status == '1') {
                            _this.trad.order_status = "交易中";
                        }
                        else if (_this.trad.order_status == "3") {
                            _this.trad.order_status = "已结算";
                        }
                    }
                    _this.tradList.push(_this.trad);
                }
            }
        });
    };
    Trading.prototype.changeStatus = function (status) {
        this.tradList = [];
        this.tradparameter.page = 1;
        this.tradparameter.type = status;
        this.getTradList();
    };
    Trading.prototype.syshuoming = function () {
        this.navCtrl.push(explain_1.Explain);
    };
    Trading.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    Trading = __decorate([
        core_1.Component({
            selector: 'page-trading',
            templateUrl: 'trading.html'
        })
    ], Trading);
    return Trading;
}());
exports.Trading = Trading;
