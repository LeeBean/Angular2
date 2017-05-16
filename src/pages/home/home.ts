import { Component} from '@angular/core';

import { NavController,Platform,NavParams } from 'ionic-angular';
import { MyStore } from '../storeManage/myStore/myStore';
import { CustomService } from '../customService/customService';
import {OrderList} from "../ordermanager/orderlist/orderList";
import {Offline} from "../team/offline/offline";
import {EarningRecord} from "../financialmanagement/earningRecord/earningRecord";
import {ProductList} from "../productmanager/productlist/productList"
import {Constants} from "../../providers/constants";
import {DataApi,Tip, Local} from '../../providers/index';
import {New} from "../tutorial/new/new";

declare var ShareManager: any;
declare var WebViewPlugin:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isnewshop : boolean = true;
  shopId:string="";
  viewUrl:string="";
  homedata:{leijisy?:string, zuorilf?: string, leijiorder?: string, leijixiaoshou?: string, shareUrl?: string}={};
  shop: {store_id?:string, name?: string, qcode?: string, yqm?: string,logo?: string, status?: string,intro?: string,flag?:string} = {};
  constructor(public navCtrl: NavController,public platform: Platform,public navParams: NavParams,private api :DataApi,private local :Local, private tip: Tip) {
    let value = navParams.data;
    if (value!=undefined){
      this.isnewshop=value;
    }
  }
  ngOnInit() {
    this.getUseShop();
  }
  getUseShop(){
    let me=this
    this.local.get(Constants.USRSHOP).then((res) => {
      if (res && res.data) {
        me.shop = res.data;
        setTimeout(function () {
          me.getHomeData();
        },100)
      }
    });
  }
  getHomeData(){
    this.api.getHomeData(this.shop.store_id,this.api.getToken()).then((res) => {
      if (res.code=="0") {
        this.homedata.leijisy=res.sstyl==""?"0.00":res.sstyl;
        this.homedata.zuorilf=res.qrfxje==""?"0":res.qrfxje;
        this.homedata.leijiorder=res.qrddnum==""?"0":res.qrddnum;
        this.homedata.leijixiaoshou=res.qrxse==""?"0.00":res.qrxse;
        this.homedata.shareUrl=res.url;
      } else {
        this.homedata.leijisy="0.00";
        this.homedata.zuorilf="0";
        this.homedata.leijiorder="0";
        this.homedata.leijixiaoshou="0.00";
      }
    });
  }
  myStore(){
    this.navCtrl.push(MyStore);
  }
  customService(){
    this.navCtrl.push(CustomService);
  }
  orderList(){
    this.navCtrl.push(OrderList);
  }
  team(){
  	this.navCtrl.push(Offline);
  }
  earningRecord(){
  	this.navCtrl.push(EarningRecord);
  }
  productManagement(){
    this.navCtrl.push(ProductList);
  }
  new(){
    this.navCtrl.push(New);
  }
  shareshop() {
    ShareManager.shareAction({
      //支持分享的类型，默认为所有类型['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo']
      shareTypes: ['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo'],
      //标题
      title:this.shop.name,
      //描述
      description: this.shop.intro==""?"百分百正品，绝对物有所值，快来看看有什么好东西！":this.shop.intro,
      //跳转地址,必须以https://或http://开头
      url:this.homedata.shareUrl,
      //微博与QQ空间分享必须有imageUrl，若没有，我们会以APP Logo为图片
      imageUrl:this.shop.logo
    });
  }
  closeMode(){
    this.isnewshop=true;
  }
  pttuijian(){
    this.api.pttuijian(this.shop.store_id).then((res) => {
      if (res.code=="0") {
        this.isnewshop=true;
        this.navCtrl.push(ProductList);
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }

  goweidian(){
    let me=this;
    //获取微店的浏览地址
    this.api.getViewurl(me.shop.store_id,me.api.getToken()).then((res) => {
      if (res.code=="0") {
          me.viewUrl=res.url;
          WebViewPlugin.openWebView(
              {
                WeiDianUrl:me.viewUrl,
                title:"我的店铺",
                showShare:true
              } ,
              function () {
                ShareManager.shareAction({
                  shareTypes: ['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo'],
                  title:me.shop.name,
                  description:  me.shop.intro==""?"百分百正品，绝对物有所值，快来看看有什么好东西！":this.shop.intro,
                  url:me.homedata.shareUrl,
                  imageUrl:me.shop.logo
                });
              },function () {

              }
          )
      } else {
        me.tip.presentToast(res.result);
      }
    });

  }
  qqpihuo(){
    alert("前去批货");
    this.isnewshop=true;
  }
  xuanhuo(){
    alert("去选货");
  }
}
