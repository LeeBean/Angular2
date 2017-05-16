"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * 这是一个单例模式的config，用于共享全局变量
 */
var Config = (function() {
    function Config() {
        this.mode = 'dev'; //运行模式 dev or release
        this.hostURL = 'http://xxx.jikeduo.com.cn/jkdApp/v1.5.0/webapp/'; //http请求前缀
        //public hostURL = 'http://www.jikeduo.com.cn/projects/webapp_1.50/';         //http请求前缀
        this.isIonic = true;
        this.pageLimit = 20; //每页多少
        this.token = ''; //如果已经登录，存放token，请和localstorage.get('token')同步
        if (!Config.isCreating) {
            throw new Error("You can't call new in Config Singleton instance!");
        }
    }
    Config.getInstance = function() {
        if (Config.instance == null) {
            Config.isCreating = true;
            Config.instance = new Config();
            Config.isCreating = false;
        }
        return Config.instance;
    };
    Config.isCreating = false;
    Config = __decorate([
        core_1.Injectable()
    ], Config);
    return Config;
}());
exports.Config = Config;