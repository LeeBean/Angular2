import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {DataApi} from "../../../providers/dataApi";

declare var ShareManager: any;
@Component({
  selector: 'page-mystoreinvite',
  templateUrl: 'myStoreInvite.html'
})
export class MyStoreInvite {
  shop: {store_id?:string, name?: string, qcode?: string, yqm?: string,logo?: string, status?: string,intro?: string,flag?:string} = {};
  constructor(public navCtrl: NavController,private api: DataApi) {
    this.shop = this.api.getUseShop();
  }
  goBack() {
    this.navCtrl.pop();
  }
  shareYqm(){
    ShareManager.shareAction({
      shareTypes: ['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo'],
      title:this.shop.name+"诚邀您加入集客多， 注册邀请码为"+this.shop.yqm,
      description: "千款正品，假一罚十。零成本开店，成本价自买。动动手指就赚钱!",
      url:"http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd",
      imageUrl:this.shop.logo
    });
  }
}

