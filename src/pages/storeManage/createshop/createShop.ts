import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from '../../tabs/tabs';

import { StoreApis, Tip, Local,DataApi } from '../../../providers/index';

@Component({
  selector: 'page-createshop',
  templateUrl: 'createShop.html'
})
export class CreateShopPage {
  shop: {userid?: string, shopname?: string ,linkname?: string ,linkphone ?: string,QQ ?: string,intro ?: string,areaName ?: string} = {};
  store: {store_id?:string, name?: string, qcode?: string, yqm?: string,logo?: string, status?: string,intro?: string,flag?:string} = {};
  constructor(public navCtrl: NavController,private tip: Tip, private api: StoreApis,private dataapi : DataApi,private local: Local) {
  }
  goBack() {
    this.navCtrl.pop();
  }
  createshopSubmit(){
    this.shop.userid=this.dataapi.getToken();
    let loader = this.tip.presentLoading('正在创建店铺...');
    this.api.doCreateShop(this.shop).then((res) => {
      loader.dismiss();
      if (res.code!="0") {
        this.tip.presentToast(res.result);
      } else {
        this.tip.presentToast('创建成功');
        if(res.list){
          let obj = res.list;
          this.store.store_id = obj.shopid;
          this.store.name =  obj.shopname;
          this.store.yqm = obj.yqm;
          this.store.status = "正常";
          this.store.flag = "1";
          this.store.logo = obj.shopimage;
          this.dataapi.setUseShop(this.store);
          this.navCtrl.push(TabsPage,{'isnewshop':false});
        }
      }
    });

  }
}

