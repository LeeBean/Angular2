import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {DataApi} from "../../../providers/index";

@Component({
  selector: 'page-withdrawals',
  templateUrl: 'withdrawals.html'
})
export class Withdrawals{
  hasMore : boolean = false;
  widthdrawparameter:{storeid?:string, page?: number, limit?: string} = {};
  widthdrawrecode: {present_time?:string, pass_status?: string, present_money?: string, pass_time?: string,pass_bak?:string} = {};
  widthdrawrecodeList: Array<{} >=[];
  constructor(public navCtrl: NavController,public navParams: NavParams,private dataApi :DataApi) {
  }
  ngOnInit() {
    this.widthdrawparameter.storeid = this.dataApi.getStoreId();
    this.widthdrawparameter.limit = "10";
    this.widthdrawparameter.page = 1;
    this.getWithDrawList();
  }
  moreInfo(infiniteScroll){
    if (!this.hasMore) return;
    this.getWithDrawList().then(res => infiniteScroll.complete());
  }

  getWithDrawList(){
    return this.dataApi.getWithDrawList(this.widthdrawparameter).then((res)=>{
      if (res && res.list && res.list.length > 0){
        if (res.totalPage > res.page ){
          this.hasMore = true;
          this.widthdrawparameter.page ++;
        }else
          this.hasMore = false;
        for(let i=0 ; i<res.list.length ; i++){
          this.widthdrawrecode = res.list[i];
          this.widthdrawrecodeList.push(this.widthdrawrecode);
        }
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
}