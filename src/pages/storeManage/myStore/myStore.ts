import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {MyStoreInfo} from "../myStoreInfo/myStoreInfo";
import {MyStoreInvite} from "../myStoreInvite/myStoreInvite";
import {DataApi} from "../../../providers/dataApi";

@Component({
  selector: 'page-mystore',
  templateUrl: 'myStore.html'
})
export class MyStore {
  is_yqm:string="0";
  shop: {store_id?:string, name?: string, qcode?: string, yqm?: string,logo?: string, status?: string,intro?: string,flag?:string} = {};

  constructor(public navCtrl: NavController,private api: DataApi) {
    this.shop = this.api.getUseShop();
    this.is_yqm =this.api.getLoginUser().is_yqm;
  }
  // ngOnInit() {
  //   console.log(this.shop);
  // }
  goBack() {
    this.navCtrl.pop();
  }
  goToMyShop(){
    this.navCtrl.push(MyStoreInfo);
  }
  storeInvite(){
    this.navCtrl.push(MyStoreInvite);
  }
}

