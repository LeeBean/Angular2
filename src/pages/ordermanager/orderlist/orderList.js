"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var orderDetail_1 = require("../orderdetail/orderDetail");
var wuliu_1 = require("../wuliu/wuliu");
var OrderList = (function () {
    function OrderList(navCtrl, storeApi, dataApi) {
        this.navCtrl = navCtrl;
        this.storeApi = storeApi;
        this.dataApi = dataApi;
        this.order = {};
        this.orderList = [];
        this.hasMore = false;
    }
    OrderList.prototype.ngOnInit = function () {
        this.order.shopid = this.dataApi.getStoreId();
        this.order.status = "0";
        this.order.limit = "10";
        this.order.page = 1;
        this.order.userid = this.dataApi.getToken();
        this.getOrderList();
    };
    OrderList.prototype.moreInfo = function (infiniteScroll) {
        if (!this.hasMore)
            return;
        this.getOrderList().then(function (res) { return infiniteScroll.complete(); });
    };
    OrderList.prototype.getOrderList = function () {
        var _this = this;
        return this.storeApi.getOrderList(this.order).then(function (res) {
            if (res && res.list && res.list.length > 0) {
                for (var i = 0; i < res.list.length; i++) {
                    var showPackage = false; //是否显示物流按钮
                    var showPay = false; //是否显示付款按钮
                    var showCheck = false; //是否显示确认收货
                    var item = res.list[i];
                    if (item.tkstatus != null) {
                        if (item.tkstatus == '1') {
                            item.orderstatus = "申请中";
                        }
                        else if (item.tkstatus == "2") {
                            item.orderstatus = "商家审核不通过";
                        }
                        else if (item.tkstatus == "3") {
                            item.orderstatus = "商家审核通过";
                        }
                        else if (item.tkstatus == "4") {
                            item.orderstatus = "商家审核通过";
                        }
                        else if (item.tkstatus == "5") {
                            item.orderstatus = "商家审核通过";
                        }
                        else if (item.tkstatus == "6") {
                            item.orderstatus = "商家审核通过";
                        }
                    }
                    else {
                        if (item.orderstatus == '0') {
                            item.orderstatus = "临时订单";
                        }
                        else if (item.orderstatus == '1') {
                            item.orderstatus = "待付款";
                            if (item.is_noeself) {
                                showPay = true;
                            }
                        }
                        else if (item.orderstatus == "2") {
                            item.orderstatus = "待发货";
                        }
                        else if (item.orderstatus == "3") {
                            item.orderstatus = "已发货";
                            showPackage = true;
                        }
                        else if (item.orderstatus == "4") {
                            item.orderstatus = "已完成";
                        }
                        else if (item.orderstatus == "5") {
                            item.orderstatus = "已取消";
                        }
                        else if (item.orderstatus == "6") {
                            item.orderstatus = "退款中";
                        }
                        else if (item.orderstatus == "7") {
                            item.orderstatus = "已收货";
                            showCheck = true;
                        }
                        else if (item.orderstatus == "8") {
                            item.orderstatus = "交易完成";
                        }
                    }
                    item.showPackage = showPackage;
                    item.showPay = showPay;
                    item.showCheck = showCheck;
                    _this.orderList.push(item);
                }
                if (res.totalPage > res.page) {
                    _this.hasMore = true;
                    _this.order.page++;
                }
                else
                    _this.hasMore = false;
            }
        });
    };
    OrderList.prototype.changeStatus = function (status) {
        this.orderList = [];
        this.order.status = status;
        this.order.page = 1;
        this.getOrderList();
    };
    OrderList.prototype.showPackageInfo = function (orderid) {
        this.navCtrl.push(wuliu_1.WuLiu, { "orderno": orderid });
    };
    OrderList.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    OrderList.prototype.goDetail = function (item) {
        this.navCtrl.push(orderDetail_1.OrderDetail, { "order": item });
    };
    OrderList = __decorate([
        core_1.Component({
            selector: 'page-orderlist',
            templateUrl: 'orderList.html'
        })
    ], OrderList);
    return OrderList;
}());
exports.OrderList = OrderList;
