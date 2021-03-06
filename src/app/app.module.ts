import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { CityPickerModule } from  "ionic2-city-picker"
import { 
  Api,
  DataApi,
  Local,
  Config,
  Tip,
  SigunupApis,
  StoreApis,
  ProductApi,
  //NativeService,
  // HttpIntercept,
  HttpService,
  Utils} from '../providers/index';
// import {HttpInterceptHandle} from "../providers/HttpInterceptHandle";
import { Storage } from '@ionic/storage';
//import {Http, XHRBackend, RequestOptions} from "@angular/http";

import {
  HomePage,
  TabsPage,
  MePage,
  ContactPage,
  LoginPage,
  SignupPage,
  SignupPage2,
  Country,
  MyStore,
  ChooseShop,
  CustomService,
  MyStoreInfo,
  MyStoreInvite,
  OrderList,
  OrderDetail,
  WuLiu,
  SearchProduct,
  ForgetPwdPage,
  OpenShopPage,
  CreateShopPage,
  ModifyPwdPage,
  Offline,
  Offinfo,
  Profit,
  EarningRecord,
  Trading,
  Withdrawals,
  BankCard,
  Explain,
  GoodCard,
  Cards,
  PriceChange,
  New,
  Introduce,
  Shop,
  Release,
  Development,
  Extension,
  Th,
  Tx,
  Yw,
  Market,
  ProductList,
  InnerMarket,
  Productdetail,
  Producttype,
  Marketproductlist,
  Productground
}from '../pages/index';


// export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
//   return new HttpIntercept(backend, defaultOptions, httpInterceptHandle);
// }

@NgModule({
  declarations: [
    ContactPage,
    HomePage,
    TabsPage,
    MePage,
    LoginPage,
    SignupPage,
    SignupPage2,
    Country,
    MyStore,
    ChooseShop,
    CustomService,
    MyStoreInfo,
    MyStoreInvite,
    OrderList,
    OrderDetail,
    WuLiu,
    SearchProduct,
    ForgetPwdPage,
    OpenShopPage,
    CreateShopPage,
    ModifyPwdPage,
    Offline,
    Offinfo,
    Profit,
    EarningRecord,
    Trading,
    BankCard,
    Withdrawals,
    Explain,
    GoodCard,
    Cards,
    PriceChange,
    New,
    Introduce,
    Shop,
    Release,
    Development,
    Extension,
    Th,
    Tx,
    Yw,
     MyApp,
     Market,
     InnerMarket,
     ProductList,
     Productdetail,
     Producttype,
     Marketproductlist,
     Productground
  ],
  imports: [
    CityPickerModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: Market, name: 'market', segment: '',pathMatch: 'full' },
        // { component: TabsPage, name: 'Tabs', segment: 'tabs/:tabId' },
        { component: Productdetail, name: 'productdetail', segment: 'productdetail/:productid',defaultHistory: [Market] },
        { component: Producttype, name: 'producttype', segment: 'producttype',defaultHistory: [Market] },
        { component: Productdetail, name: 'productdetail', segment: 'productdetail/:productid'},
        { component: Producttype, name: 'producttype', segment: 'producttype'}
      ]
    })
  ],
  //enableProdMode:[],
  bootstrap: [IonicApp],
  entryComponents: [
    ContactPage,
    HomePage,
    TabsPage,
    MePage,
    LoginPage,
    SignupPage,
    SignupPage2,
    Country,
    MyStore,
    ChooseShop,
    CustomService,
    MyStoreInfo,
    MyStoreInvite,
    OrderList,
    OrderDetail,
    WuLiu,
    SearchProduct,
    ForgetPwdPage,
    OpenShopPage,
    CreateShopPage,
    ModifyPwdPage,
    Offline,
    Offinfo,
    Profit,
    EarningRecord,
    Trading,
    Withdrawals,
    BankCard,
    Explain,
    GoodCard,
    Cards,
    PriceChange,
    New,
    Introduce,
    Shop,
    Release,
    Development,
    Extension,
    Th,
    Tx,
    Yw,
    MyApp,
    Market,
    InnerMarket,
    ProductList,
    Productdetail,
    Producttype,
    Marketproductlist,
    Productground
  ],
   providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    Local,
    DataApi,
    Config,
    SigunupApis,
    StoreApis,
    Tip,
    ProductApi,
    Storage,
     HttpService,Utils
  ],
 
})
export class AppModule {
    
}
