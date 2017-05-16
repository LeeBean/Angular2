"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * 这里存放全局用到的常量
 * 全是静态成员，请使用 Constants.DRAFTS 直接调用
 */
var Constants = (function () {
    function Constants() {
    }
    Constants.DRAFTS = "DRAFTS";
    Constants.ACCESSTOKEN = "ACCESSTOKEN";
    Constants.LOGINUSER = "LOGINUSER";
    Constants.USRSHOP = "USESHOP";
    Constants.LOGINUSERWITHID = 'LOGINUSERWITHID';
    Constants = __decorate([
        core_1.Injectable()
    ], Constants);
    return Constants;
}());
exports.Constants = Constants;
