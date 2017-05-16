import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {StoreApis,Tip} from "../../../providers/index";

@Component({
  selector: 'page-wuliu',
  templateUrl: 'wuliu.html'
})
export class WuLiu {
  parameter:{orderno?:string, userid?: string} = {};
  package:{orderList ?: any}={};
  constructor(public navCtrl: NavController,public navParams: NavParams,private storeApis:StoreApis,private tip: Tip) {
    this.parameter.orderno=navParams.get("orderno");
  }
  ngOnInit() {
    this.storeApis.getOrderPackage(this.parameter).then((res) => {
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {
        this.package.orderList = res.list;
        console.log(this.package);
      }
    })
  }
  goBack() {
    this.navCtrl.pop();
  }

}

