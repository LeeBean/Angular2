import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataApi, Tip} from "../../../providers/index";

@Component({
  selector: 'page-profit',
  templateUrl: 'profit.html'
})
export class Profit{
  subparameter:{storeid?:string, page?: number, limit?: string} = {};
  hasMore : boolean = false;
  subRecode: {shop_image?:string, sub_name?: string, sub_store_num?: string, top_profit?: string} = {};
  subRecodeList: Array<{} >=[];
  constructor(public navCtrl: NavController,private api :DataApi,private tip:Tip) {
  }
  ngOnInit() {
    this.subparameter.storeid = this.api.getStoreId();
    this.subparameter.limit = "10";
    this.subparameter.page = 1;
    this.getSubList();
  }
  moreInfo(infiniteScroll){
    if (!this.hasMore) return;
    this.getSubList().then(res => infiniteScroll.complete());
  }

  getSubList(){
    return this.api.getSubList(this.subparameter).then((res)=>{
      if (res && res.list && res.list.length > 0){
        if (res.totalPage > res.page ){
          this.hasMore = true;
          this.subparameter.page ++;
        }else
          this.hasMore = false;
        for(let i=0 ; i<res.list.length ; i++){
          this.subRecode = res.list[i];
          this.subRecodeList.push(this.subRecode);
        }
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
}