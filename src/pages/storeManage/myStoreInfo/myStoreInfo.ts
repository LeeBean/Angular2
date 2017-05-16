import { Component } from '@angular/core';
import { DataApi,StoreApis,Tip} from '../../../providers/index';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-mystoreInfo',
  templateUrl: 'myStoreInfo.html'
})
export class MyStoreInfo {
  shop: { store_id?:string,name?: string, linkman?: string, tel?: string,qq?: string, intro?: string,logo?: string,yqm?:string } = {};
  constructor(public navCtrl: NavController,private dataApi: DataApi,private api : StoreApis,private tip :Tip) {

    this.api.getShopInfo(this.dataApi.getStoreId()).then((res)=>{
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {
        if (res.list ){
          this.shop = res.list;
          console.log(this.shop);
        }

      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  saveShopInfo(){
    let shopInfo : any = {};
    if(!this.shop.name){
      this.tip.presentToast('店铺名称不能为空');
      return;
    }
    if(!this.shop.linkman){
      this.tip.presentToast('联系人不能为空');
      return;
    }
    if(!this.shop.tel){
      this.tip.presentToast('联系方式不能为空');
      return;
    }
    shopInfo.shopid = this.dataApi.getStoreId();

    shopInfo.shopname = this.shop.name;
    shopInfo.linkname = this.shop.linkman;
    shopInfo.linkphone = this.shop.tel;
    shopInfo.QQ = this.shop.qq;
    shopInfo.userid = this.dataApi.getToken();
    this.api.updateShopInfo(shopInfo).then((res)=>{
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {
        //this.tip.presentToast("修改成功");
        this.shop = res.list;
        this.shop.store_id = this.dataApi.getStoreId();
        this.dataApi.setUseShop(this.shop);
        //this.navCtrl.push(MePage);
        this.navCtrl.pop();
      }
    });

  }
}

