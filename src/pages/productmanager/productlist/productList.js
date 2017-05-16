"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var searchProduct_1 = require("../searchProduct/searchProduct");
var priceChange_1 = require('../priceChange/priceChange');
var constants_1 = require("../../../providers/constants");
var ProductList = (function () {
    function ProductList(navCtrl, alertCtrl, platform, productApi, dataApi, tip, local) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.productApi = productApi;
        this.dataApi = dataApi;
        this.tip = tip;
        this.local = local;
        this.hasMore = false;
        this.producturl = "";
        this.buyurl = "";
        this.productDetailurl = "";
        this.parameter = {};
        this.product = {};
        this.productList = [];
        this.shop = {};
    }
    ProductList.prototype.ngOnInit = function () {
        this.parameter.shopid = this.dataApi.getStoreId();
        this.parameter.status = "0";
        this.parameter.limit = "10";
        this.parameter.page = 1;
        this.getProductList();
        this.getUseShop();
    };
    ProductList.prototype.getUseShop = function () {
        var _this = this;
        this.local.get(constants_1.Constants.USRSHOP).then(function (res) {
            if (res && res.data) {
                _this.shop = res.data;
            }
        });
    };
    ProductList.prototype.moreInfo = function (infiniteScroll) {
        if (!this.hasMore)
            return;
        this.getProductList().then(function (res) { return infiniteScroll.complete(); });
    };
    ProductList.prototype.getProductList = function () {
        var _this = this;
        return this.productApi.getProductList(this.parameter).then(function (res) {
            if (res && res.list && res.list.length > 0) {
                if (res.totalPage > res.page) {
                    _this.hasMore = true;
                    _this.parameter.page++;
                }
                else
                    _this.hasMore = false;
                for (var i = 0; i < res.list.length; i++) {
                    _this.product = res.list[i];
                    _this.productList.push(_this.product);
                }
            }
        });
    };
    ProductList.prototype.changeStatus = function (status) {
        this.productList = [];
        this.parameter.page = 1;
        this.parameter.status = status;
        this.getProductList();
    };
    //下架及更改价格
    ProductList.prototype.present = function (item, i) {
        var _this = this;
        var me = this;
        var actionSheet = this.alertCtrl.create({
            buttons: [
                {
                    text: '下架',
                    role: 'destructive',
                    icon: !me.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        _this.tip.presentConfirm('是否确定下架该商品？', {
                            okText: '确认',
                            cancelText: '取消'
                        }).then(function (res) {
                            if (res) {
                                me.productApi.productProp(item.productid, "0", "2").then(function (res) {
                                    if (res.code == "0") {
                                        me.productList.splice(i, 1);
                                    }
                                    else {
                                        me.tip.presentToast(res.result);
                                    }
                                });
                            }
                        });
                    }
                },
                {
                    text: '更改价格',
                    icon: !me.platform.is('ios') ? 'share' : null,
                    handler: function () {
                        me.navCtrl.push(priceChange_1.PriceChange, { 'productid': item.productid, 'index': i, 'productList': me.productList });
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    icon: !me.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        //console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    //商品详情
    ProductList.prototype.productDetail = function (item) {
        var _this = this;
        var me = this;
        me.productApi.getProductDetailurl(item.productid, me.parameter.shopid).then(function (res) {
            if (res.code == "0") {
                me.productDetailurl = res.url;
                WebViewPlugin.openWebView({
                    WeiDianUrl: me.productDetailurl,
                    title: item.productname,
                    showShare: false
                });
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    //推广商品
    ProductList.prototype.shareProduct = function (item) {
        var me = this;
        this.productApi.getProducturl(item.productid, this.dataApi.getToken()).then(function (res) {
            if (res.code == "0") {
                me.producturl = res.url;
                ShareManager.shareAction({
                    shareTypes: ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
                    title: me.shop.name,
                    description: item.productname,
                    url: me.producturl,
                    imageUrl: item.lsimage
                });
            }
            else {
                me.tip.presentToast(res.result);
            }
        });
    };
    //自己购买
    ProductList.prototype.buyMyself = function (item) {
        var me = this;
        this.productApi.getBuyrul(item.productid, me.dataApi.getStoreId(), me.dataApi.getToken()).then(function (res) {
            if (res.code == "0") {
                me.buyurl = res.url;
                WebViewPlugin.openWebView({
                    WeiDianUrl: me.buyurl,
                    title: item.productname,
                    showShare: false
                });
            }
            else {
                me.tip.presentToast(res.result);
            }
        });
    };
    //非自用商品上架
    ProductList.prototype.shangjia = function (item, i) {
        var _this = this;
        var me = this;
        me.tip.presentConfirm('是否确定上架该商品？', {
            okText: '确认',
            cancelText: '取消'
        }).then(function (res) {
            if (res) {
                _this.productApi.productProp(item.productid, "1", "2").then(function (res) {
                    if (res.code == "0") {
                        me.productList.splice(i, 1);
                    }
                    else {
                        me.tip.presentToast(res.result);
                    }
                });
            }
        });
    };
    //自用商品上架
    ProductList.prototype.shangjia2 = function (item, i) {
        var _this = this;
        this.tip.presentConfirm('是否确定上架该商品？', {
            okText: '确认',
            cancelText: '取消'
        }).then(function (res) {
            if (res) {
                _this.productApi.productProp(item.productid, "1", "1").then(function (res) {
                    if (res.code == "0") {
                        _this.productList.splice(i, 1);
                    }
                    else {
                        _this.tip.presentToast(res.result);
                    }
                });
            }
        });
    };
    //非自用商品删除
    ProductList.prototype.delproduct = function (item, i) {
        var _this = this;
        this.tip.presentConfirm('是否确定删除该商品？', {
            okText: '确认',
            cancelText: '取消'
        }).then(function (res) {
            if (res) {
                _this.productApi.productProp(item.productid, "2", "2").then(function (res) {
                    if (res.code == "0") {
                        _this.productList.splice(i, 1);
                    }
                    else {
                        _this.tip.presentToast(res.result);
                    }
                });
            }
        });
    };
    //自用商品删除
    ProductList.prototype.delproduct2 = function (item, i) {
        var _this = this;
        this.tip.presentConfirm('是否确定删除该商品？？', {
            okText: '确认',
            cancelText: '取消'
        }).then(function (res) {
            if (res) {
                _this.productApi.productProp(item.productid, "2", "1").then(function (res) {
                    if (res.code == "0") {
                        _this.productList.splice(i, 1);
                    }
                    else {
                        _this.tip.presentToast(res.result);
                    }
                });
            }
        });
    };
    //下架
    ProductList.prototype.xiajia = function (item, i) {
        var _this = this;
        this.tip.presentConfirm('是否确定下架该商品？', {
            okText: '确认',
            cancelText: '取消'
        }).then(function (res) {
            if (res) {
                _this.productApi.productProp(item.productid, "0", "2").then(function (res) {
                    if (res.code == "0") {
                        _this.productList.splice(i, 1);
                    }
                    else {
                        _this.tip.presentToast(res.result);
                    }
                });
            }
        });
    };
    //下架及更改价格
    ProductList.prototype.changePrice = function (item, i) {
        this.navCtrl.push(priceChange_1.PriceChange, { 'productid': item.productid, 'index': i, 'productList': this.productList });
    };
    ProductList.prototype.goSearch = function () {
        this.navCtrl.push(searchProduct_1.SearchProduct);
    };
    ProductList.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ProductList = __decorate([
        core_1.Component({
            selector: 'page-productlist',
            templateUrl: 'productList.html'
        })
    ], ProductList);
    return ProductList;
}());
exports.ProductList = ProductList;
