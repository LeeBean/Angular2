"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var priceChange_1 = require('../priceChange/priceChange');
var SearchProduct = (function () {
    function SearchProduct(navCtrl, alertCtrl, platform, productApi, dataApi, tip, local) {
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
    SearchProduct.prototype.ngOnInit = function () {
        // this.parameter.shopid = this.dataApi.getStoreId();
        // this.parameter.status="0";
        // this.parameter.limit = "10";
        // this.parameter.page = 1;
        //this.getProductList();
    };
    SearchProduct.prototype.moreInfo = function (infiniteScroll) {
        if (!this.hasMore)
            return;
        this.getProductList().then(function (res) { return infiniteScroll.complete(); });
    };
    SearchProduct.prototype.getItems = function (ev) {
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.productList = [];
            this.parameter.shopid = this.dataApi.getStoreId();
            this.parameter.status = "0";
            this.parameter.limit = "10";
            this.parameter.page = 1;
            this.parameter.keyword = val;
            this.getProductList();
        }
    };
    SearchProduct.prototype.getProductList = function () {
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
    SearchProduct.prototype.changeStatus = function (status) {
        this.productList = [];
        this.parameter.page = 1;
        this.parameter.status = status;
        this.getProductList();
    };
    //下架及更改价格
    SearchProduct.prototype.present = function (item, i) {
        var _this = this;
        var actionSheet = this.alertCtrl.create({
            buttons: [
                {
                    text: '下架',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        _this.tip.presentConfirm('是否确定下架该商品？', {
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
                    }
                },
                {
                    text: '更改价格',
                    icon: !this.platform.is('ios') ? 'share' : null,
                    handler: function () {
                        _this.navCtrl.push(priceChange_1.PriceChange, { 'productid': item.productid, 'index': i, 'productList': _this.productList });
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    //商品详情
    SearchProduct.prototype.productDetail = function (item) {
        var _this = this;
        this.productApi.getProductDetailurl(item.productid, this.parameter.shopid).then(function (res) {
            if (res.code == "0") {
                _this.productDetailurl = res.url;
                WebViewPlugin.openWebView({
                    WeiDianUrl: _this.productDetailurl,
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
    SearchProduct.prototype.shareProduct = function (item) {
        var _this = this;
        this.productApi.getProducturl(item.productid, this.dataApi.getToken()).then(function (res) {
            if (res.code == "0") {
                _this.producturl = res.url;
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
        ShareManager.shareAction({
            shareTypes: ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
            title: this.shop.name,
            description: item.productname,
            url: this.producturl,
            imageUrl: item.lsimage
        });
    };
    //自己购买
    SearchProduct.prototype.buyMyself = function (item) {
        var _this = this;
        this.productApi.getBuyrul(item.productid, this.dataApi.getStoreId(), this.dataApi.getToken()).then(function (res) {
            if (res.code == "0") {
                _this.buyurl = res.url;
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
        WebViewPlugin.openWebView({
            WeiDianUrl: this.buyurl,
            title: item.productname,
            showShare: false
        });
    };
    //非自用商品上架
    SearchProduct.prototype.shangjia = function (item, i) {
        var _this = this;
        this.tip.presentConfirm('是否确定上架该商品？', {
            okText: '确认',
            cancelText: '取消'
        }).then(function (res) {
            if (res) {
                _this.productApi.productProp(item.productid, "1", "2").then(function (res) {
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
    //自用商品上架
    SearchProduct.prototype.shangjia2 = function (item, i) {
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
    SearchProduct.prototype.delproduct = function (item, i) {
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
    SearchProduct.prototype.delproduct2 = function (item, i) {
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
    SearchProduct.prototype.xiajia = function (item, i) {
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
    SearchProduct.prototype.changePrice = function (item, i) {
        this.navCtrl.push(priceChange_1.PriceChange, { 'productid': item.productid, 'index': i, 'productList': this.productList });
    };
    SearchProduct.prototype.goSearch = function () {
        this.navCtrl.push(SearchProduct);
    };
    SearchProduct.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    SearchProduct = __decorate([
        core_1.Component({
            selector: 'page-searchProduct',
            templateUrl: 'searchProduct.html'
        })
    ], SearchProduct);
    return SearchProduct;
}());
exports.SearchProduct = SearchProduct;
