import { Component } from '@angular/core';

import { NavController,Modal } from 'ionic-angular';
import {DataApi,Tip,Config} from "../../providers/index";
import {Producttype} from "../producttype/producttype";
import {Marketproductlist} from "../productlist/productlist";
import {Productground} from "../productground/productground";
import {Productdetail} from "../productdetail/productdetail";
import {InnerMarket} from "../innermarket/innermarket";

declare var JkdPlugin: any;

@Component({
  selector: 'page-market',
  templateUrl: 'market.html'
})
export class Market {
    channelList : Array<{channel_id?: string,channel_name?: string} >=[];
    classIndex=0;
    isshowbottom:boolean=true;
    parameter:{store_id?:string, channel_id?: string, page_id?:string} = {};
    themeList :Array<{}> = [];
    imgaeURL : string;
    itemData:{attribute?:string,children_id?:string,picture?:string,special_name?:string,contents?:Array<{any}>}={};
    itemDataList :Array<{}> = [];
    private config: Config;
    constructor(public navCtrl: NavController,private dataApi :DataApi,private tip: Tip) {
        this.parameter.store_id = this.dataApi.getStoreId();
        this.config = Config.getInstance();//获取Config的实例
    }
    ngOnInit() {
        this.dataApi.getMarketChannelList().then((res) => {
            if (res.code != "0") {
                this.tip.presentToast(res.result);
            } else {
                this.channelList =  res.list;
                if (this.channelList && this.channelList.length >0){
                    this.parameter.channel_id = this.channelList[0].channel_id;
                }
                this.getMarketChannelIndexList();
            }
        });
    }
    //轮播图点击事件
    goToSlide(item) {
        let content=item.content;
        let target_type=item.target_type;
        let title=item.title;
        if(target_type=="0"){//页面
            this.navCtrl.push(InnerMarket,{"channelId":this.parameter.channel_id,"content":content,"title":title});
        }else if(target_type=="1"){//分类
            this.navCtrl.push(Producttype);
        }else if(target_type=="2"){//商品详情
            this.navCtrl.push(Productdetail,{"product":item,"tab":1});
        }
    }
    //icon点击事件
    goToTab(item){
        let content=item.content;
        let target_type=item.target_type;
        let title=item.title;

        if(target_type=="0"){//页面
            this.navCtrl.push(InnerMarket,{"channelId":this.parameter.channel_id,"content":content,"title":title});
        }else if(target_type=="1"){//分类
            this.navCtrl.push(Producttype);
        }else if(target_type=="2"){//商品详情
            
            this.navCtrl.push(Productdetail,{"product":item,"tab":1});
        }
    }
    //单张图点击事件
    goToPic(item){
        let content=item.contents[0].content;
        let target_type=item.contents[0].target_type;
        let title=item.contents[0].title;
        if(target_type=="0"){//页面
            this.navCtrl.push(InnerMarket,{"channelId":this.parameter.channel_id,"content":content,"title":title});
        }else if(target_type=="1"){//分类
            this.navCtrl.push(Producttype);
        }else if(target_type=="2"){//商品详情
        
        this.navCtrl.push(Productdetail,{"product":item,"tab":1});
        }
    }
    //商品操作
    oprProduct(item){
        let me=this;
        let isdaili=item.isdaili;// 是否代理 0 未代理 1 已代理
        let productid=item.product_id;
        if(isdaili=="0"){//未代理 到更改价格页面
            //this.navCtrl.push(Productground,{"product":item});
            this.tip.presentConfirm('是否确定代理该商品？', {
                okText: '确认',
                cancelText: '取消'
            }).then((res) => {
                if (res) {
                    me.dataApi.shopAgent(productid,me.dataApi.getStoreId(),me.dataApi.getToken()).then((res) => {
                        if (res.code=="0") {//取消代理成功
                            item.isdaili="1";
                            this.isshowbottom=false;
                        } else {
                            me.tip.presentToast(res.result);
                        }
                    });
                }
            })
        }else if(isdaili=="1"){//已代理 取消代理
            this.tip.presentConfirm('是否确定取消代理该商品？', {
                okText: '确认',
                cancelText: '取消'
            }).then((res) => {
                if (res) {
                    me.dataApi.shopAgent(productid,me.dataApi.getStoreId(),me.dataApi.getToken()).then((res) => {
                        if (res.code=="0") {//取消代理成功
                            item.isdaili="0";
                            this.isshowbottom=false;
                        } else {
                            me.tip.presentToast(res.result);
                        }
                    });
                }
            })
        }
    }
    //商品详情
    productdetail(id,tab){
        this.navCtrl.push(Productdetail,{"productid":id,"tab":tab});
    }
    //分享商品
    shareMarketProduct(product){
        console.log(product);
        let isdaili=product.isdaili;//是否代理 0 -未代理 1-代理
        
        if(this.config.mode=="prod"){
            JkdPlugin.shareJKD({
                shareTypes: ['WeiXin','WeiXinPYQ'],
                title:product.product_name,
                description: '百分百正品，绝对物有所值，快来看看有什么好东西！',
                url:'http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=225521&store_id=830&key=eyJuaWNrbmFtZSI6Ilx1NWRlNlx1NGY0ZFx1NTkyN1x1NTkyYiIsInVpZCI6IjUwMDkiLCJzb3VyY2UiOiJ3YXBwIn0&sign=576a6b0c5cf78e27d975f4344cfbfa75&_dc=1489741207',
                imageUrl:'http://www.jikeduo.com.cn/projects/webapp_1.50/uploads/thumbnail/57e3b2ea8995d.jpg',
                light:'赚¥45',
                dark:'您当前售价设置为175，您有45的利润'
            });
        }else{
            this.tip.presentToast('请使用APP进行分享');
        }
    }
    getMarketChannelIndexList(){
        let loader = this.tip.presentLoading('数据加载中...');
        this.itemDataList=[];
        this.dataApi.getMarketChannelIndexList(this.parameter).then(res =>{
            loader.dismiss();
            if (res.code != "0"){
                this.tip.presentToast(res.result);
            }else{
                if (res.list && res.list.length >0){
                    for(let i =0; i<res.list.length ;i++){
                        let obj=res.list[i];

                        this.itemData = res.list[i];
                        this.itemDataList.push(this.itemData);
                    }
                }
            }
        })
    }
    changeTab(index,channelId){
      this.classIndex = index;
      this.parameter.channel_id = channelId;
      this.getMarketChannelIndexList();
    }
     goSearch(){
      let productParameter:{yiji?: string, erji?:string,title?:string, keyword?: string} ={};
      productParameter.title = "";
      productParameter.erji = "";
      productParameter.yiji = "";
      this.navCtrl.push(Marketproductlist,{"productParameter":productParameter});

    }

    goType(){
      this.navCtrl.push(Producttype);
    }
    //关闭下边栏
    closebottom(){
        this.isshowbottom=true;
    }
    //去商品管理
    goproduct(){
         if(this.config.mode=="prod"){
            JkdPlugin.goShoppingCartJKD();
        }else{
            this.tip.presentToast('此功能仅限载APP中使用');
        }
    }
    //去商品管理
    pmanagent(){
       if(this.config.mode=="prod"){
            JkdPlugin.goShoppingCartJKD();
        }else{
            this.tip.presentToast('此功能仅限载APP中使用');
        }
    }
    
}
