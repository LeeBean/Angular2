import { Component } from '@angular/core';

import { NavController,ActionSheetController,Platform } from 'ionic-angular';
import {ProductApi,DataApi,Tip,Local} from "../../../providers/index";
import {SearchProduct} from "../searchProduct/searchProduct";
import {PriceChange} from '../priceChange/priceChange';
import {Constants} from "../../../providers/constants";

declare var ShareManager: any;
declare var WebViewPlugin:any;

@Component({
  selector: 'page-productlist',
  templateUrl: 'productList.html'
})
export class ProductList {
  hasMore : boolean = false;
  producturl:string="";
  buyurl:string="";
  productDetailurl:string="";
  parameter:{shopid?:string, status?: string, page?: number, limit?: string,keyword?: string} = {};
  product: {productid?:string, productname?: string, productcost?: string, productprofit?: string,producttype?: string, productprice?: string,howmanybuy?: string,productpic?:string,lsimage?:string,status?:string} = {};
  productList: Array<{} >=[];
  shop: {store_id?:string, name?: string, qcode?: string, yqm?: string,logo?: string, status?: string,intro?: string,flag?:string} = {};
  constructor(public navCtrl: NavController,public alertCtrl: ActionSheetController,
              public platform: Platform,private productApi:ProductApi,private dataApi :DataApi, private tip: Tip,private local :Local) {

  }

  ngOnInit() {
    this.parameter.shopid = this.dataApi.getStoreId();
    this.parameter.status="0";
    this.parameter.limit = "10";
    this.parameter.page = 1;
    this.getProductList();
    this.getUseShop();
  }
  getUseShop() {
    this.local.get(Constants.USRSHOP).then((res) => {
      if (res && res.data) {
        this.shop = res.data;
      }
    })
  }
  moreInfo(infiniteScroll){
    if (!this.hasMore) return;
    this.getProductList().then(res => infiniteScroll.complete());
  }

  getProductList(){
    return this.productApi.getProductList(this.parameter).then((res)=>{
      if (res && res.list && res.list.length > 0){
        if (res.totalPage > res.page ){
          this.hasMore = true;
          this.parameter.page ++;
        }else
          this.hasMore = false;
          for(let i=0 ; i<res.list.length ; i++){
            this.product = res.list[i];
            this.productList.push(this.product);
          }
      }
    });
  }
  changeStatus(status){
    this.productList = [];
    this.parameter.page =1;
    this.parameter.status=status;
    this.getProductList();
  }
  //下架及更改价格
  present(item,i) {
    var me=this;
    let actionSheet = this.alertCtrl.create({
      buttons: [
        {
          text: '下架',
          role: 'destructive',
          icon: !me.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.tip.presentConfirm('是否确定下架该商品？', {
              okText: '确认',
              cancelText: '取消'
            }).then((res) => {
              if (res) {
                me.productApi.productProp(item.productid,"0","2").then((res) => {
                  if (res.code=="0") {//下架成功
                    me.productList.splice(i,1);
                  } else {
                    me.tip.presentToast(res.result);
                  }
                });
              }
            })
          }
        },
        {
          text: '更改价格',
          icon: !me.platform.is('ios') ? 'share' : null,
          handler: () => {
            me.navCtrl.push(PriceChange,{'productid':item.productid,'index':i,'productList':me.productList});
          }
        },
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          icon: !me.platform.is('ios') ? 'close' : null,
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  //商品详情
  productDetail(item){
    let me=this;
    me.productApi.getProductDetailurl(item.productid,me.parameter.shopid ).then((res) => {
      if (res.code=="0") {
        me.productDetailurl=res.url;
         WebViewPlugin.openWebView(
          {
            WeiDianUrl:me.productDetailurl,
            title:item.productname,
            showShare:false
          }
        )
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  
  //推广商品
  shareProduct(item){
    let me=this;
    this.productApi.getProducturl(item.productid,this.dataApi.getToken()).then((res) => {
      if (res.code=="0") {
        me.producturl=res.url;
        ShareManager.shareAction({
          shareTypes: ['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo'],
          title:me.shop.name,
          description: item.productname,
          url:me.producturl,
          imageUrl:item.lsimage
        });
      } else {
        me.tip.presentToast(res.result);
      }
    });

  }
  //自己购买
  buyMyself(item){
    let me=this;
    this.productApi.getBuyrul(item.productid,me.dataApi.getStoreId(),me.dataApi.getToken()).then((res) => {
      if (res.code=="0") {
        me.buyurl=res.url;
        WebViewPlugin.openWebView(
          {
            WeiDianUrl:me.buyurl,
            title:item.productname,
            showShare:false
          }
        )
      } else {
        me.tip.presentToast(res.result);
      }
    });

  }
  //非自用商品上架
  shangjia(item,i){
    let me=this;
    me.tip.presentConfirm('是否确定上架该商品？', {
        okText: '确认',
        cancelText: '取消'
    }).then((res) => {
      if (res) {
        this.productApi.productProp(item.productid,"1","2").then((res) => {
          if (res.code=="0") {//上架成功
             me.productList.splice(i,1);
          } else {
            me.tip.presentToast(res.result);
          }
        });
      }
    })
  }
  //自用商品上架
  shangjia2(item,i){
    this.tip.presentConfirm('是否确定上架该商品？', {
        okText: '确认',
        cancelText: '取消'
    }).then((res) => {
      if (res) {
        this.productApi.productProp(item.productid,"1","1").then((res) => {
          if (res.code=="0") {//上架成功
             this.productList.splice(i,1);
          } else {
            this.tip.presentToast(res.result);
          }
        });
      }
    })
  }
  //非自用商品删除
  delproduct(item,i){
   this.tip.presentConfirm('是否确定删除该商品？', {
        okText: '确认',
        cancelText: '取消'
    }).then((res) => {
      if (res) {
        this.productApi.productProp(item.productid,"2","2").then((res) => {
          if (res.code=="0") {//删除成功
             this.productList.splice(i,1);
          } else {
            this.tip.presentToast(res.result);
          }
        });
      }
    })
  }
   //自用商品删除
  delproduct2(item,i){
   this.tip.presentConfirm('是否确定删除该商品？？', {
        okText: '确认',
        cancelText: '取消'
    }).then((res) => {
      if (res) {
        this.productApi.productProp(item.productid,"2","1").then((res) => {
          if (res.code=="0") {//删除成功
             this.productList.splice(i,1);
          } else {
            this.tip.presentToast(res.result);
          }
        });
      }
    })
  }
  //下架
  xiajia(item,i){
    this.tip.presentConfirm('是否确定下架该商品？', {
        okText: '确认',
        cancelText: '取消'
      }).then((res) => {
        if (res) {
          this.productApi.productProp(item.productid,"0","2").then((res) => {
            if (res.code=="0") {//下架成功
               this.productList.splice(i,1);
            } else {
              this.tip.presentToast(res.result);
            }
          });
        }
      })
  }
  //下架及更改价格
  changePrice(item,i){
    this.navCtrl.push(PriceChange,{'productid':item.productid,'index':i,'productList':this.productList});
  }
  goSearch(){
    this.navCtrl.push(SearchProduct);
  }
  goBack() {
    this.navCtrl.pop();
  }
}

