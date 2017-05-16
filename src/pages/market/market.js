"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var productdetail_1 = require("../productdetail/productdetail");
var producttype_1 = require("../producttype/producttype");
var productlist_1 = require("../productlist/productlist");
var Market = (function () {
    function Market(navCtrl, dataApi, tip) {
        this.navCtrl = navCtrl;
        this.dataApi = dataApi;
        this.tip = tip;
        this.channelList = [];
        this.classIndex = 0;
        this.parameter = {};
        this.brandList = [];
        this.navigationList = [];
        this.productList = [];
        this.themeList = [];
        this.parameter.store_id = this.dataApi.getStoreId();
    }
    Market.prototype.productdetail = function () {
        this.navCtrl.push(productdetail_1.Productdetail);
    };
    Market.prototype.ngOnInit = function () {
        var _this = this;
        this.dataApi.getMarketChannelList().then(function (res) {
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                _this.channelList = res.list;
                if (_this.channelList && _this.channelList.length > 0) {
                    _this.parameter.channel_id = _this.channelList[0].channel_id;
                }
                _this.getMarketChannelIndexList();
            }
        });
    };
    Market.prototype.getMarketChannelIndexList = function () {
        var _this = this;
        this.dataApi.getMarketChannelIndexList(this.parameter).then(function (res) {
            _this.navigationList = [];
            _this.themeList = [];
            _this.brandList = [];
            _this.productList = [];
            if (res.code != "0") {
                _this.tip.presentToast(res.result);
            }
            else {
                if (res.list && res.list.length > 0) {
                    for (var i = 0; i < res.list.length; i++) {
                        var obj = res.list[i];
                        if (obj.type == "0" && obj.attribute == "0") {
                            _this.brandList = obj.contents;
                        }
                        else if (obj.type == "0" && obj.attribute != "0") {
                            _this.imgaeURL = obj.picture;
                        }
                        else if (obj.type == "1") {
                            _this.navigationList = obj.contents;
                        }
                        else if (obj.type == "2") {
                            _this.themeList = obj.contents;
                        }
                        else if (obj.type == "3") {
                            _this.productList = obj.contents;
                        }
                    }
                    console.log(_this.navigationList);
                    console.log(_this.themeList);
                    console.log(_this.brandList);
                    console.log(_this.productList);
                }
            }
        });
    };
    Market.prototype.changeTab = function (index, channelId) {
        this.classIndex = index;
        this.parameter.channel_id = channelId;
        this.getMarketChannelIndexList();
    };
    Market.prototype.goSearch = function () {
        this.navCtrl.push(productlist_1.Marketproductlist);
    };
    Market.prototype.goType = function () {
        this.navCtrl.push(producttype_1.Producttype);
    };
    Market = __decorate([
        core_1.Component({
            selector: 'page-market',
            templateUrl: 'market.html'
        })
    ], Market);
    return Market;
}());
exports.Market = Market;
