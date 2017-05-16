import { Component } from '@angular/core';

import { NavController,ActionSheetController,Platform } from 'ionic-angular';
import {ProductApi,DataApi,Tip,Local} from "../../../providers/index";
import {PriceChange} from '../priceChange/priceChange';


declare var ShareManager: any;
declare var WebViewPlugin:any;

@Component({
  selector: 'page-searchProduct',
  templateUrl: 'searchProduct.html'
})
export class SearchProduct {
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
    // this.parameter.shopid = this.dataApi.getStoreId();
    // this.parameter.status="0";
    // this.parameter.limit = "10";
    // this.parameter.page = 1;
    //this.getProductList();
  }
  moreInfo(infiniteScroll){
    if (!this.hasMore) return;
    this.getProductList().then(res => infiniteScroll.complete());
  }
  getItems(ev) {
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
        this.productList=[];
        this.parameter.shopid = this.dataApi.getStoreId();
        this.parameter.status="0";
        this.parameter.limit = "10";
        this.parameter.page = 1;
        this.parameter.keyword=val;
        this.getProductList();
    }
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

    let actionSheet = this.alertCtrl.create({
      buttons: [
        {
          text: '下架',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
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
        },
        {
          text: '更改价格',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.navCtrl.push(PriceChange,{'productid':item.productid,'index':i,'productList':this.productList});
          }
        },
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
  //商品详情
  productDetail(item){
    this.productApi.getProductDetailurl(item.productid,this.parameter.shopid ).then((res) => {
      if (res.code=="0") {
        this.productDetailurl=res.url;
         WebViewPlugin.openWebView(
          {
            WeiDianUrl:this.productDetailurl,
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
    this.productApi.getProducturl(item.productid,this.dataApi.getToken()).then((res) => {
      if (res.code=="0") {
        this.producturl=res.url;
      } else {
        this.tip.presentToast(res.result);
      }
    });
    ShareManager.shareAction({
      shareTypes: ['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo'],
      title:this.shop.name,
      description: item.productname,
      url:this.producturl,
      imageUrl:item.lsimage
    });
  }
  //自己购买
  buyMyself(item){
    this.productApi.getBuyrul(item.productid,this.dataApi.getStoreId(),this.dataApi.getToken()).then((res) => {
      if (res.code=="0") {
        this.buyurl=res.url;
      } else {
        this.tip.presentToast(res.result);
      }
    });
    WebViewPlugin.openWebView(
      {
        WeiDianUrl:this.buyurl,
        title:item.productname,
        showShare:false
      }
    )
  }
  //非自用商品上架
  shangjia(item,i){
    this.tip.presentConfirm('是否确定上架该商品？', {
        okText: '确认',
        cancelText: '取消'
    }).then((res) => {
      if (res) {
        this.productApi.productProp(item.productid,"1","2").then((res) => {
          if (res.code=="0") {//上架成功
             this.productList.splice(i,1);
          } else {
            this.tip.presentToast(res.result);
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

