"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var index_1 = require('../providers/index');
var tabs_1 = require('../pages/tabs/tabs');
var login_1 = require('../pages/login/login');
var MyApp = (function () {
    // 构造函数
    function MyApp(platform, local) {
        var _this = this;
        this.local = local;
        platform.ready().then(function () {
            _this.initApp();
            //console.log('device ready');
            //this.rootPage=LoginPage
        });
    }
    MyApp.prototype.initApp = function () {
        //StatusBar.styleDefault();
        ionic_native_1.StatusBar.overlaysWebView(false);
        ionic_native_1.StatusBar.backgroundColorByName("white");
        this.checkIsLogin();
        this.hideSplashScreen();
    };
    MyApp.prototype.hideSplashScreen = function () {
        setTimeout(function () {
            ionic_native_1.Splashscreen.hide();
        }, 100);
    };
    MyApp.prototype.checkIsLogin = function () {
        var _this = this;
        var config = index_1.Config.getInstance();
        //初始化全局信息
        //检测是否已经登录
        this.local.get(index_1.Constants.ACCESSTOKEN).then(function (res) {
            if (res && res.data) {
                console.log('已登录');
                config.token = res.data;
                _this.rootPage = tabs_1.TabsPage;
            }
            else {
                _this.rootPage = login_1.LoginPage;
                console.log('未登录');
            }
        });
        this.local.get(index_1.Constants.LOGINUSER).then(function (res) {
            if (res && res.data) {
                config.loginUser = res.data;
            }
        });
        this.local.get(index_1.Constants.LOGINUSERWITHID).then(function (res) {
            if (res && res.data) {
                config.loginUserWithId = res.data;
            }
        });
        this.local.get(index_1.Constants.USRSHOP).then(function (res) {
            if (res && res.data) {
                config.useShop = res.data;
            }
        });
    };
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'app.html'
        })
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
