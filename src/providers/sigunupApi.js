"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var config_1 = require("./config");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
/**
 * 这里用来封装一些与数据请求相关的业务逻辑
 * 当程序规模增大时，需要分离此文件
 * 1.业务上的对外http数据请求接口，统一在此处
 * 2.某些从localstorage获取数据的接口
 */
var SigunupApis = (function () {
    function SigunupApis(http, api, local) {
        this.http = http;
        this.api = api;
        this.local = local;
        //获取单例config
        this.config = config_1.Config.getInstance();
    }
    SigunupApis.prototype.doSignup = function (signup) {
        return this.api.get('Reg/submit', signup);
    };
    SigunupApis = __decorate([
        core_1.Injectable()
    ], SigunupApis);
    return SigunupApis;
}());
exports.SigunupApis = SigunupApis;
