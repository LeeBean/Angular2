"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var index_1 = require('../index');
var TabsPage = (function () {
    function TabsPage(modalCtrl, navParams, api) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.api = api;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = index_1.HomePage;
        this.tab2Root = index_1.Market;
        this.tab3Root = index_1.MePage;
        this.isnewshop = true;
        this.changeTabs = function () {
            console.log("tab changed");
        };
        console.log(navParams.get("isnewshop"));
        var value = navParams.get("isnewshop");
        if (value != undefined) {
            this.isnewshop = value;
        }
    }
    __decorate([
        core_1.ViewChild('mainTabs')
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        core_1.Component({
            templateUrl: 'tabs.html'
        })
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
