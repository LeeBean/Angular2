import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {CreateShopPage} from "../createshop/createShop";
import { StoreApis, DataApi,Tip} from '../../../providers/index';
import {TabsPage} from '../../tabs/tabs';

@Component({
  selector: 'page-chooseShop',
  templateUrl: 'chooseShop.html'
})
export class ChooseShop {
  shop: {store_id?:string, name?: string, qcode?: string, yqm?: string,logo?: string, status?: string,intro?: string,flag?:string} = {};
  shopList: Array<{} >;
  constructor(public navCtrl: NavController,private tip: Tip,private api: StoreApis,private dataApi :DataApi) {
    let loader = this.tip.presentLoading('加载中....');
    this.api.getShopList(this.dataApi.getToken()).then((res) => {
      loader.dismiss();
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {
        this.shopList = [];
        if (res.list && res.list.length >0){

          for (let i =0 ; i<res.list.length;i++){
            let obj = res.list[i];
            this.shop = obj;
            this.shop.flag="2";
            if (obj.status == 1) {
              this.shop.status = "正常";
              this.shop.flag="1";
            }
            if (obj.status == 2)
              this.shop.status="待审核";
            if (obj.status == 3)
              this.shop.status="审核未通过";
            if (obj.status == 4)
              this.shop.status="关闭";

            this.shopList.push(this.shop);

          }
        }
      }
    });
  }
  userShop(event, item){
    if (item.flag != 1){
      this.tip.presentLoading('您的店铺正处于'+item.status+'状态');
    }
    this.dataApi.setUseShop(item);
    //console.log(this.dataApi.getUseShop());
    this.navCtrl.push(TabsPage,{'isnewshop':true});
  }
  goBack() {
    this.navCtrl.pop();
  }
  addShop(){
    let loader = this.tip.presentLoading('');
    this.api.getShopList(this.dataApi.getToken()).then((res) => {
      loader.dismiss();
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {
        if (res.list && res.list.length > 1){
          this.tip.presentToast('您的店铺已超过限定数量');
          return;
        }
        this.navCtrl.push(CreateShopPage);
      }
    });

  }
}

