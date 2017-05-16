"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
// import {rootRouterConfig} from "./app.routes";
var index_1 = require('../pages/index');
var index_2 = require('../providers/index');
var storage_1 = require('@ionic/storage');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                index_1.ContactPage,
                index_1.HomePage,
                index_1.TabsPage,
                index_1.MePage,
                index_1.Market,
                index_1.LoginPage,
                index_1.SignupPage,
                index_1.SignupPage2,
                index_1.Country,
                index_1.MyStore,
                index_1.ChooseShop,
                index_1.CustomService,
                index_1.MyStoreInfo,
                index_1.MyStoreInvite,
                index_1.OrderList,
                index_1.OrderDetail,
                index_1.WuLiu,
                index_1.ProductList,
                index_1.SearchProduct,
                index_1.ForgetPwdPage,
                index_1.OpenShopPage,
                index_1.CreateShopPage,
                index_1.ModifyPwdPage,
                index_1.Offline,
                index_1.Offinfo,
                index_1.Profit,
                index_1.EarningRecord,
                index_1.Trading,
                index_1.BankCard,
                index_1.Withdrawals,
                index_1.Explain,
                index_1.GoodCard,
                index_1.Cards,
                index_1.PriceChange,
                index_1.New,
                index_1.Introduce,
                index_1.Shop,
                index_1.Release,
                index_1.Development,
                index_1.Extension,
                index_1.Th,
                index_1.Tx,
                index_1.Yw,
                index_1.Productdetail,
                index_1.Producttype,
                index_1.Marketproductlist
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, {}, {
                    links: [
                        { component: index_1.Producttype, name: 'Producttype', segment: 'producttype' }
                    ]
                })
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                index_1.ContactPage,
                index_1.HomePage,
                index_1.TabsPage,
                index_1.MePage,
                index_1.Market,
                index_1.LoginPage,
                index_1.SignupPage,
                index_1.SignupPage2,
                index_1.Country,
                index_1.MyStore,
                index_1.ChooseShop,
                index_1.CustomService,
                index_1.MyStoreInfo,
                index_1.MyStoreInvite,
                index_1.OrderList,
                index_1.OrderDetail,
                index_1.WuLiu,
                index_1.ProductList,
                index_1.SearchProduct,
                index_1.ForgetPwdPage,
                index_1.OpenShopPage,
                index_1.CreateShopPage,
                index_1.ModifyPwdPage,
                index_1.Offline,
                index_1.Offinfo,
                index_1.Profit,
                index_1.EarningRecord,
                index_1.Trading,
                index_1.Withdrawals,
                index_1.BankCard,
                index_1.Explain,
                index_1.GoodCard,
                index_1.Cards,
                index_1.PriceChange,
                index_1.New,
                index_1.Introduce,
                index_1.Shop,
                index_1.Release,
                index_1.Development,
                index_1.Extension,
                index_1.Th,
                index_1.Tx,
                index_1.Yw,
                index_1.Productdetail,
                index_1.Producttype,
                index_1.Marketproductlist
            ],
            providers: [{ provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler, },
                index_2.Api,
                index_2.Local,
                index_2.DataApi,
                index_2.SigunupApis,
                index_2.StoreApis,
                index_2.Tip,
                index_2.ProductApi,
                storage_1.Storage
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
