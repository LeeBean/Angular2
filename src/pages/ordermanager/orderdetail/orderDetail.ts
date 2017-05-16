import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {WuLiu} from "../wuliu/wuliu";
import {DataApi,StoreApis,Tip} from "../../../providers/index";

@Component({
  selector: 'page-orderdatail',
  templateUrl: 'orderDetail.html'
})
export class OrderDetail {
  parameter:{orderid?:string, userid?: string} = {};
  showPackage :boolean = false;//是否显示物流按钮
  showPay:boolean = false;//是否显示付款按钮
  showCheck:boolean = false;//是否显示确认收货按钮
  order :{orderstatus?:string,revname?:string,revaddress?:string,list?:string,yunfei?:string,jinkoushui?:string,youhuiquan?:string,
    sjfk?:string,orderno?:string,creattime?:number,paytime?:number,sendtime?:number,overtime?:number,is_noeself?:string,productlist?:any}={}

  constructor(public navCtrl: NavController,public navParams: NavParams,private tip: Tip,private dataApi: DataApi,private storeApis:StoreApis) {
    let orderInfo = navParams.get("order");
    this.parameter.orderid =orderInfo.orderid;
    this.showPay =orderInfo.showPay;
    this.showPackage = orderInfo.showPackage;
    this.showCheck = orderInfo.showCheck;

    this.parameter.userid = this.dataApi.getToken();
  }
  ngOnInit() {
    this.storeApis.getOrderDetail(this.parameter).then((res) => {
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {

        if (res.list) {
          this.order = res.list;
          if (this.order.creattime)
            this.order.creattime = this.order.creattime * 1000;
          else
            this.order.creattime=0;
          if (this.order.paytime)
            this.order.paytime = this.order.paytime * 1000;
          else
            this.order.paytime =0;
          if (this.order.sendtime)
            this.order.sendtime = this.order.sendtime * 1000;
          else
            this.order.sendtime =0;
          if (this.order.overtime)
            this.order.overtime = this.order.overtime * 1000;
          else
            this.order.overtime=0;
          if (res.list.list)
            this.order.productlist = res.list.list;
          if (this.order.orderstatus == '0') {
            this.order.orderstatus = "临时订单";
          }else if (this.order.orderstatus == '1') {
            this.order.orderstatus = "待付款";
          } else if (this.order.orderstatus =="2") {

            this.order.orderstatus = "待发货";
          } else if (this.order.orderstatus == "3") {
            this.order.orderstatus = "已发货";
          } else if (this.order.orderstatus == "4") {
            this.order.orderstatus = "已完成";
          } else if (this.order.orderstatus == "5") {
            this.order.orderstatus = "已取消";
          } else if (this.order.orderstatus == "6") {
            this.order.orderstatus = "退款中";
          } else if (this.order.orderstatus == "7") {
            this.order.orderstatus = "已收货";
          }else if (this.order.orderstatus == "8") {
            this.order.orderstatus = "交易完成";
          }
        }
      }
    })
  }

  goWuliu(){
    this.navCtrl.push(WuLiu,{"orderno":this.order.orderno});
  }
  //确认收货
  checkTake(){
    if (!this.showCheck) return;
    this.storeApis.checkTake(this.parameter).then(res=>{
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {
        //this.navCtrl.
      }
    })
  }
  goBack() {
    this.navCtrl.pop();
  }
}

