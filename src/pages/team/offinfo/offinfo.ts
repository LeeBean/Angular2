import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataApi, Tip} from "../../../providers/index";

@Component({
  selector: 'page-offinfo',
  templateUrl: 'offinfo.html'
})
export class Offinfo{
  sublistpar:{storeid?:string, order_status?: string,type?: string, page?: number, limit?: string} = {};
  hasMore : boolean = false;
  subxq: {order_on?:string, order_price?: string, order_profit?: string, order_storeName?: string,order_productList?:{order_product?:string,product_num?:string},order_time?: string, order_userName?: string} = {};
  subxqList: Array<{} >=[];
  constructor(public navCtrl: NavController,private api :DataApi,private tip:Tip) {
  }
  ngOnInit() {
    this.sublistpar.storeid = this.api.getStoreId();
    this.sublistpar.limit = "10";
    this.sublistpar.page = 1;
    this.sublistpar.order_status = "1";
    this.getsubxqList();

  }

  moreInfo(infiniteScroll){
    if (!this.hasMore) return;
    this.getsubxqList().then(res => infiniteScroll.complete());
  }

  getsubxqList(){
    return this.api.getsubxqList(this.sublistpar).then((res)=>{
      if (res && res.list && res.list.length > 0){
        if (res.totalPage > res.page ){
          this.hasMore = true;
          this.sublistpar.page ++;
        }else
          this.hasMore = false;
        for(let i=0 ; i<res.list.length ; i++){
          this.subxq = res.list[i];
          this.subxqList.push(this.subxq);
        }
      }
    });
  }
  changeStatus(status){
    this.subxqList = [];
    this.sublistpar.page =1;
    this.sublistpar.order_status=status;
    this.getsubxqList();
  }
  goBack() {
    this.navCtrl.pop();
  }
}