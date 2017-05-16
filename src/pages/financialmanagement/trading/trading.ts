import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {DataApi} from "../../../providers/index";
import {Explain} from '../explain/explain';

@Component({
  selector: 'page-trading',
  templateUrl: 'trading.html'
})
export class Trading{
  userrole:string="";
  tradpageTitle:string="收益记录";
  tradparameter:{shopid?:string,userid?:string, status?: string,type?: string, page?: number, limit?: string} = {};
  hasMore : boolean = false;
  trad: {order_money?:string, order_no?: string, order_status?: string, order_time?: string,product_info?:Array<{name?:string,pro_num?:string}>,profit_money?: string, store_name?: string,user_name?: string} = {};
  tradList: Array<{} >=[];
  constructor(public navCtrl: NavController,public navParams: NavParams,private dataApi :DataApi) {
    this.userrole= navParams.get("userrole");
    this.tradparameter.status=navParams.get("status");
    if(this.tradparameter.status=="2"){
      this.tradpageTitle="交易中收益";
    }
  }
  ngOnInit() {
    this.tradparameter.userid=this.dataApi.getToken();
    this.tradparameter.shopid = this.dataApi.getStoreId();
    this.tradparameter.limit = "10";
    this.tradparameter.page = 1;
    this.tradparameter.type = "1";
    this.getTradList();

  }

  moreInfo(infiniteScroll){
    if (!this.hasMore) return;
    this.getTradList().then(res => infiniteScroll.complete());
  }

  getTradList(){
    return this.dataApi.getTradList(this.tradparameter).then((res)=>{
      if (res && res.list && res.list.length > 0){
        if (res.totalPage > res.page ){
          this.hasMore = true;
          this.tradparameter.page ++;
        }else
          this.hasMore = false;
        for(let i=0 ; i<res.list.length ; i++){
          this.trad = res.list[i];
          if (this.trad .order_status != null) {
            if (this.trad .order_status == '1') {
              this.trad .order_status = "交易中";
            } else if (this.trad .order_status == "3") {
              this.trad .order_status = "已结算";
            }
        }
          this.tradList.push(this.trad);
        }
      }
    });
  }
  changeStatus(status){
    this.tradList = [];
    this.tradparameter.page =1;
    this.tradparameter.type=status;
    this.getTradList();
  }
  syshuoming(){
    this.navCtrl.push(Explain);
  }
  goBack() {
    this.navCtrl.pop();
  }
}