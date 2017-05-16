import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {OrderDetail} from "../orderdetail/orderDetail";
import {StoreApis,DataApi} from "../../../providers/index";
import {WuLiu} from "../wuliu/wuliu";

@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderList.html'
})
export class OrderList {
  order:{shopid?:string, status?: string, userid?: string, limit?: string,page?: number} = {};
  orderList: Array<{} >=[];
  hasMore : boolean = false;

  constructor(public navCtrl: NavController,private storeApi:StoreApis,private dataApi :DataApi) {



  }
  ngOnInit() {
    this.order.shopid = this.dataApi.getStoreId();
    this.order.status ="0";
    this.order.limit ="10"
    this.order.page=1;
    this.order.userid = this.dataApi.getToken();
    this.getOrderList();
  }
  moreInfo(infiniteScroll){
    if (!this.hasMore) return;

    this.getOrderList().then(res => infiniteScroll.complete());
  }
  getOrderList(){
    return this.storeApi.getOrderList(this.order).then((res)=>{
      if (res && res.list && res.list.length > 0){
        for(let i=0 ; i<res.list.length ; i++) {
          let showPackage :boolean = false;//是否显示物流按钮
          let showPay:boolean = false;//是否显示付款按钮
          let showCheck : boolean = false;//是否显示确认收货
          let item = res.list[i];

          if (item.tkstatus != null) {
            if (item.tkstatus == '1') {
              item.orderstatus = "申请中";
            } else if (item.tkstatus == "2") {
              item.orderstatus = "商家审核不通过";
            } else if (item.tkstatus == "3") {
              item.orderstatus = "商家审核通过";
            } else if (item.tkstatus == "4") {
              item.orderstatus = "商家审核通过";
            } else if (item.tkstatus == "5") {
              item.orderstatus = "商家审核通过";
            } else if (item.tkstatus == "6") {
              item.orderstatus = "商家审核通过";
            }
          } else {

            if (item.orderstatus == '0') {
              item.orderstatus = "临时订单";
            }else if (item.orderstatus == '1') {
              item.orderstatus = "待付款";
              if (item.is_noeself){
                showPay = true;
              }
            } else if (item.orderstatus =="2") {


              item.orderstatus = "待发货";
            } else if (item.orderstatus == "3") {
              item.orderstatus = "已发货";
              showPackage = true;
            } else if (item.orderstatus == "4") {
              item.orderstatus = "已完成";
            } else if (item.orderstatus == "5") {
              item.orderstatus = "已取消";
            } else if (item.orderstatus == "6") {
              item.orderstatus = "退款中";
            } else if (item.orderstatus == "7") {
              item.orderstatus = "已收货";
              showCheck=true;
            } else if (item.orderstatus == "8") {
              item.orderstatus = "交易完成";
            }
          }
          item.showPackage = showPackage;
          item.showPay = showPay;
          item.showCheck=showCheck;
          this.orderList.push(item);

        }

        if (res.totalPage > res.page ){
          this.hasMore = true;
          this.order.page ++;
        }else
          this.hasMore = false;
      }
    });
  }
  changeStatus(status){
    this.orderList = [];
    this.order.status = status;
    this.order.page =1;
    this.getOrderList();
  }
  showPackageInfo(orderid){
    this.navCtrl.push(WuLiu,{"orderno":orderid});

  }
  goBack() {
    this.navCtrl.pop();
  }
  goDetail(item){
    this.navCtrl.push(OrderDetail,{"order":item});

  }
}

