"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var myStore_1 = require('../storeManage/myStore/myStore');
var customService_1 = require('../customService/customService');
var orderList_1 = require("../ordermanager/orderlist/orderList");
var offline_1 = require("../team/offline/offline");
var earningRecord_1 = require("../financialmanagement/earningRecord/earningRecord");
var productList_1 = require("../productmanager/productlist/productList");
var constants_1 = require("../../providers/constants");
var new_1 = require("../tutorial/new/new");
var HomePage = (function () {
    function HomePage(navCtrl, platform, navParams, api, local, tip) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.api = api;
        this.local = local;
        this.tip = tip;
        this.isnewshop = true;
        this.shopId = "";
        this.viewUrl = "";
        this.homedata = {};
        this.shop = {};
        var value = navParams.data;
        if (value != undefined) {
            this.isnewshop = value;
        }
    }
    HomePage.prototype.ngOnInit = function () {
        this.getUseShop();
    };
    HomePage.prototype.getUseShop = function () {
        var me = this;
        this.local.get(constants_1.Constants.USRSHOP).then(function (res) {
            if (res && res.data) {
                me.shop = res.data;
                setTimeout(function () {
                    me.getHomeData();
                }, 100);
            }
        });
    };
    HomePage.prototype.getHomeData = function () {
        var _this = this;
        this.api.getHomeData(this.shop.store_id, this.api.getToken()).then(function (res) {
            if (res.code == "0") {
                _this.homedata.leijisy = res.sstyl == "" ? "0.00" : res.sstyl;
                _this.homedata.zuorilf = res.qrfxje == "" ? "0" : res.qrfxje;
                _this.homedata.leijiorder = res.qrddnum == "" ? "0" : res.qrddnum;
                _this.homedata.leijixiaoshou = res.qrxse == "" ? "0.00" : res.qrxse;
                _this.homedata.shareUrl = res.url;
            }
            else {
                _this.homedata.leijisy = "0.00";
                _this.homedata.zuorilf = "0";
                _this.homedata.leijiorder = "0";
                _this.homedata.leijixiaoshou = "0.00";
            }
        });
    };
    HomePage.prototype.myStore = function () {
        this.navCtrl.push(myStore_1.MyStore);
    };
    HomePage.prototype.customService = function () {
        this.navCtrl.push(customService_1.CustomService);
    };
    HomePage.prototype.orderList = function () {
        this.navCtrl.push(orderList_1.OrderList);
    };
    HomePage.prototype.team = function () {
        this.navCtrl.push(offline_1.Offline);
    };
    HomePage.prototype.earningRecord = function () {
        this.navCtrl.push(earningRecord_1.EarningRecord);
    };
    HomePage.prototype.productManagement = function () {
        this.navCtrl.push(productList_1.ProductList);
    };
    HomePage.prototype.new = function () {
        this.navCtrl.push(new_1.New);
    };
    HomePage.prototype.shareshop = function () {
        ShareManager.shareAction({
            //支持分享的类型，默认为所有类型['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo']
            shareTypes: ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
            //标题
            title: this.shop.name,
            //描述
            description: this.shop.intro == "" ? "百分百正品，绝对物有所值，快来看看有什么好东西！" : this.shop.intro,
            //跳转地址,必须以https://或http://开头
            url: this.homedata.shareUrl,
            //微博与QQ空间分享必须有imageUrl，若没有，我们会以APP Logo为图片
            imageUrl: this.shop.logo
        });
    };
    HomePage.prototype.closeMode = function () {
        this.isnewshop = true;
    };
    HomePage.prototype.pttuijian = function () {
        var _this = this;
        this.api.pttuijian(this.shop.store_id).then(function (res) {
            if (res.code == "0") {
                _this.isnewshop = true;
                _this.navCtrl.push(productList_1.ProductList);
            }
            else {
                _this.tip.presentToast(res.result);
            }
        });
    };
    HomePage.prototype.goweidian = function () {
        var me = this;
        //获取微店的浏览地址
        this.api.getViewurl(me.shop.store_id, me.api.getToken()).then(function (res) {
            if (res.code == "0") {
                me.viewUrl = res.url;
                WebViewPlugin.openWebView({
                    WeiDianUrl: me.viewUrl,
                    title: "我的店铺",
                    showShare: true
                }, function () {
                    ShareManager.shareAction({
                        shareTypes: ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
                        title: me.shop.name,
                        description: me.shop.intro == "" ? "百分百正品，绝对物有所值，快来看看有什么好东西！" : this.shop.intro,
                        url: me.homedata.shareUrl,
                        imageUrl: me.shop.logo
                    });
                }, function () {
                });
            }
            else {
                me.tip.presentToast(res.result);
            }
        });
    };
    HomePage.prototype.qqpihuo = function () {
        alert("前去批货");
        this.isnewshop = true;
    };
    HomePage.prototype.xuanhuo = function () {
        alert("去选货");
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
