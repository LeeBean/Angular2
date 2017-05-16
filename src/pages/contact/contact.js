"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_1 = require('./user');
var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.isSpecial = true;
        this.model = new user_1.User('刘理彬', "18521538009", '111111');
        this.submitted = true;
        this.canSave = true;
        this.badCurly = "class1";
    }
    ContactPage.prototype.onSubmit = function () {
        this.submitted = true;
    };
    ContactPage.prototype.newUser = function () {
        this.badCurly = "class2";
        if (this.isSpecial) {
            this.isSpecial = false;
        }
        else {
            this.isSpecial = true;
        }
        if (this.canSave) {
            this.canSave = false;
        }
        else {
            this.canSave = true;
        }
        this.model = new user_1.User("小明", '2111221', '13131');
    };
    ContactPage = __decorate([
        core_1.Component({
            selector: 'page-contact',
            templateUrl: 'contact.html'
        })
    ], ContactPage);
    return ContactPage;
}());
exports.ContactPage = ContactPage;
