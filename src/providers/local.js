"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/*
 * 对Storage进行二次封装，增加可维护性, 或方便添加我们自己的钩子代码
 */
var Local = (function () {
    function Local(storage) {
        this.storage = storage;
    }
    Local.prototype.get = function (key) {
        return this.storage.get(key);
    };
    Local.prototype.set = function (key, value) {
        return this.storage.set(key, value);
    };
    Local.prototype.remove = function (key) {
        return this.storage.remove(key);
    };
    Local.prototype.clear = function () {
        return this.storage.clear();
    };
    /**
     * @return the number of keys stored.
     */
    Local.prototype.length = function () {
        return this.storage.length();
    };
    /**
     * @return the keys in the store.
     */
    Local.prototype.keys = function () {
        return this.storage.keys();
    };
    /**
     * Iterate through each key,value pair.
     * @param iteratorCallback a callback of the form (value, key, iterationNumber)
     */
    Local.prototype.forEach = function (iteratorCallback) {
        this.storage.forEach(iteratorCallback);
    };
    Local = __decorate([
        core_1.Injectable()
    ], Local);
    return Local;
}());
exports.Local = Local;
