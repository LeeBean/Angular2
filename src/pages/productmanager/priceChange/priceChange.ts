import { Component } from '@angular/core';
import {ProductApi, DataApi, Tip} from '../../../providers/index';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-priceChange',
  templateUrl: 'priceChange.html'
})
export class PriceChange{
  productid:any="";
  productList: Array<any>=[];
  index:number=0;
  productInfo:{fx_number?:string, image?: string, lsprice?: string, minprice?: string,price?: string,product?: string,tjprice?: string} = {};
  constructor(public navCtrl: NavController, private tip: Tip, private api: DataApi,public navParams: NavParams,private productApi:ProductApi) {
    this.productid = navParams.get("productid");
    this.productList=navParams.get("productList");
    this.index=navParams.get("index");
  }
  ngOnInit() {
     this.getProductInfo();
  }
  getProductInfo(){
    this.productApi.getProductInfo(this.productid).then((res) => {
      if (res.code=="0") {
        this.productInfo=res.list;
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  //提交
  submitOPr(){
    let loader = this.tip.presentLoading('数据提交中...');
    this.productApi.submitChangPrice(this.productInfo,this.productid).then((res) => {
      loader.dismiss();
      if (res.code!="0") {
        this.tip.presentToast(res.result);
      } else {
        this.tip.presentToast('修改成功');
        this.productList[this.index].productprice=this.productInfo.lsprice;
        this.navCtrl.pop();
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
}