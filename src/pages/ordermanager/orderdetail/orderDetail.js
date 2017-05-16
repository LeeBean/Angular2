"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var wuliu_1 = require("../wuliu/wuliu");
var OrderDetail = (function () {
    function OrderDetail(navCtrl, navParams, tip, dataApi, storeApis) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tip = tip;
        this.dataApi = dataApi;
        this.storeApis = storeApis;
        this.parameter = {};
        this.showPackage = false; //是否显示物流按钮
        this.showPay = false; //是否显示付款按钮
        this.showCheck = false; //是否显示确认收货按钮
        this.order = {};
        var orderInfo = navParams.get("order");
        this.parameter.orderid = orderInfo.orderid;
        this.showPay = orderInfo.showPay;
        this.showPackage = orderInfo.showPackage;
        this.showCheck = orderInfo.showCheck;
        this.parameter.userid = this.dataApi.getToken();
    }
    OrderDetail.prototype.ngOnInit = function () {
        var _this = this;
        this.storeApis.getOrderDetail(this.parameter).then(function (res) {
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                if (res.list) {
                    _this.order = res.list;
                    if (_this.order.creattime)
                        _this.order.creattime = _this.order.creattime * 1000;
                    else
                        _this.order.creattime = 0;
                    if (_this.order.paytime)
                        _this.order.paytime = _this.order.paytime * 1000;
                    else
                        _this.order.paytime = 0;
                    if (_this.order.sendtime)
                        _this.order.sendtime = _this.order.sendtime * 1000;
                    else
                        _this.order.sendtime = 0;
                    if (_this.order.overtime)
                        _this.order.overtime = _this.order.overtime * 1000;
                    else
                        _this.order.overtime = 0;
                    if (res.list.list)
                        _this.order.productlist = res.list.list;
                    if (_this.order.orderstatus == '0') {
                        _this.order.orderstatus = "临时订单";
                    }
                    else if (_this.order.orderstatus == '1') {
                        _this.order.orderstatus = "待付款";
                    }
                    else if (_this.order.orderstatus == "2") {
                        _this.order.orderstatus = "待发货";
                    }
                    else if (_this.order.orderstatus == "3") {
                        _this.order.orderstatus = "已发货";
                    }
                    else if (_this.order.orderstatus == "4") {
                        _this.order.orderstatus = "已完成";
                    }
                    else if (_this.order.orderstatus == "5") {
                        _this.order.orderstatus = "已取消";
                    }
                    else if (_this.order.orderstatus == "6") {
                        _this.order.orderstatus = "退款中";
                    }
                    else if (_this.order.orderstatus == "7") {
                        _this.order.orderstatus = "已收货";
                    }
                    else if (_this.order.orderstatus == "8") {
                        _this.order.orderstatus = "交易完成";
                    }
                }
            }
        });
    };
    OrderDetail.prototype.goWuliu = function () {
        this.navCtrl.push(wuliu_1.WuLiu, { "orderno": this.order.orderno });
    };
    //确认收货
    OrderDetail.prototype.checkTake = function () {
        var _this = this;
        if (!this.showCheck)
            return;
        this.storeApis.checkTake(this.parameter).then(function (res) {
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
            }
        });
    };
    OrderDetail.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    OrderDetail = __decorate([
        core_1.Component({
            selector: 'page-orderdatail',
            templateUrl: 'orderDetail.html'
        })
    ], OrderDetail);
    return OrderDetail;
}());
exports.OrderDetail = OrderDetail;
