import { Component } from '@angular/core';
import { DataApi, Tip} from '../../providers/index';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-productground',
  templateUrl: 'productground.html'
})
export class Productground{
  product:any={};
  displayInfo:{fx_number?:string,image?:string,lsprice?:string,minprice?:string,price?:string,product?:string,tjprice?:string}={};
  constructor(public navCtrl: NavController,private api: DataApi,public navParams: NavParams,private tip: Tip) {
    this.product = navParams.get("product");
  }
  ngOnInit() {
    this.getDisplayInfo();

  }
  getDisplayInfo(){
    this.api.getDisplayInfo(this.product.product_id==undefined?this.product.productid:this.product.product_id,"yes").then((res) => {
      if (res.code=="0") {
        this.displayInfo=res.list;
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  Pagent(){
    this.api.Shopagent(this.product.product_id==undefined?this.product.productid:this.product.product_id,this.api.getStoreId(),this.api.getToken(),this.displayInfo.lsprice).then((res) => {
      if (res.code=="0") {
        this.tip.presentToast("代理成功");
        this.product.isdaili="1";
        this.navCtrl.pop();
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
}