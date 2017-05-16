import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Marketproductlist} from "../productlist/productlist"
import {Tip,ProductApi,Config} from "../../providers/index";

declare var JkdPlugin: any;
@Component({
  selector: 'page-producttype',
  templateUrl: 'producttype.html'
})
export class Producttype {
  categoryGroupList : Array<{cat_id?:string,cat_name?:string,cat_pic?:string}> = [];
  categoryList : Array<{cat_id?:string,cat_name?:string,cat_pic?:string,cat_fid?:string}> = [];
  categoryObj :{cat_id?:string,cat_name?:string,cat_pic?:string}={};
  classIndex =0;
  productParameter :{yiji?: string, erji?:string,title?:string}={};
   private config: Config;
  constructor(public navCtrl: NavController,private tip: Tip,private productApi : ProductApi) {
    this.config = Config.getInstance();//获取Config的实例
  }
  ngOnInit(){
    if(this.config.mode=="prod"){
      JkdPlugin.hideBottomTabJKD({isHide:true});
    }
    this.productApi.getCategoryGroupList().then((res) => {
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {
        this.categoryGroupList =  res.list;
        if (this.categoryGroupList && this.categoryGroupList.length >0){
            this.categoryObj = this.categoryGroupList[0];
            this.getCateGoryList(this.categoryObj.cat_id);
        }
      }
    })
  }
  getCateGoryList(id){
    let loader = this.tip.presentLoading('数据加载中...');
    this.productApi.getCateGoryList(id).then((res) => {
      loader.dismiss();
      if (res.code != "0") {
        this.tip.presentToast(res.result);

      } else {
        this.categoryList =  res.list;

      }
    })
  }
  changeTab(index,obj){
      this.categoryObj = obj;
      this.classIndex = index;
      this.getCateGoryList(this.categoryObj.cat_id);
  }
  goBack() {
   // console.log(this.navCtrl.canGoBack());
   // console.log(this.navCtrl.getViews().length);
    if(this.navCtrl.canGoBack()){
        this.navCtrl.pop();
    }else{
         this.tip.presentToast("没有页面历史栈，返回原生页面");
          if(this.config.mode=="prod"){
              JkdPlugin.goBackJKD();
          }
    }
  }
  goProductList(category){
    if (category) {
      this.productParameter.erji = category.cat_id;
      this.productParameter.title = category.cat_name;
    }else{
      this.productParameter.title = this.categoryObj.cat_name;
      this.productParameter.erji = "";
    }

    this.productParameter.yiji=this.categoryObj.cat_id;

    this.navCtrl.push(Marketproductlist,{"productParameter":this.productParameter});
  }
  goAllProductList(){

    this.productParameter.title = "";
    this.productParameter.erji = "";
    this.productParameter.yiji = "";
    this.navCtrl.push(Marketproductlist,{"productParameter":this.productParameter});
  }
}
