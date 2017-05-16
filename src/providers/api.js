"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var config_1 = require('./config');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
/**
 * 对http的二次封装，在程序中用来获取远程数据
 */
var Api = (function () {
    function Api(http) {
        this.http = http;
        this.init();
    }
    Api.prototype.init = function () {
        //获取config单例一个实例
        this.config = config_1.Config.getInstance();
        this.hostUrl = this.config.hostURL;
        var headers = new http_1.Headers();
        //headers.append('Accept', '*/*');
        //headers.append('Cache-Control', 'no-cache');
        this.requestOpts = new http_1.RequestOptions({
            headers: headers
        });
    };
    Api.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    Api.prototype.getWithNoParam = function (url) {
        return this.http.get(this.hostUrl + url)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    Api.prototype.get = function (url, params) {
        if (params) {
            var paramsArray_1 = [];
            Object.keys(params).forEach(function (key) { return paramsArray_1.push(key + '=' + encodeURIComponent(params[key])); });
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray_1.join('&');
            }
            else {
                url += '&' + paramsArray_1.join('&');
            }
        }
        return this.http.get(this.hostUrl + url, this.requestOpts)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    Api.prototype.post = function (url, body) {
        return this.http.post(this.hostUrl + url, body, this.requestOpts)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    Api.prototype.put = function (url, body) {
        return this.http.put(this.hostUrl + url, body, this.requestOpts)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    Api.prototype.delete = function (url) {
        return this.http.delete(this.hostUrl + url, this.requestOpts)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    Api.prototype.readFromLocalJson = function (localUrl) {
        return this.http.get(localUrl, this.requestOpts)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    Api.prototype.writeToLocalJson = function (localUrl, json) {
        return this.http.post(localUrl, json, this.requestOpts)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    Api = __decorate([
        core_1.Injectable()
    ], Api);
    return Api;
}());
exports.Api = Api;
