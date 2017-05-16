"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Country = (function () {
    function Country(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.signup = {};
        this.signup = navParams.get("signup");
        console.log(this.signup);
    }
    Country.prototype.checkCountry = function (countryName, code) {
        this.signup.areaName = countryName;
        this.signup.areaCode = code;
        this.signup.hiddenflag = false;
        this.signup.yzcode = '';
        if (this.signup.areaCode != null && this.signup.areaCode != "+86") {
            this.signup.yzcode = '666666';
            this.signup.hiddenflag = true;
        }
        this.navCtrl.pop();
    };
    Country.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    Country = __decorate([
        core_1.Component({
            selector: 'page-country',
            templateUrl: 'country.html'
        })
    ], Country);
    return Country;
}());
exports.Country = Country;
