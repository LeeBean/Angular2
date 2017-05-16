import { Component } from '@angular/core';
import { DataApi, Tip} from '../../../providers/index';
import { NavController } from 'ionic-angular';
import {Trading} from '../trading/trading';
import {Withdrawals} from '../withdrawals/withdrawals';
import {BankCard} from '../bankCard/bankCard'; 
import {Cards} from '../bankCard/cards/cards'; 
import { GoodCard } from '../bankCard/goodCard/goodCard'; 
declare var ShareManager: any;

@Component({
  selector: 'page-earningRecord',
  templateUrl: 'earningRecord.html'
})
export class EarningRecord{
  //status 用户权限 1：小B权限  2：大B权限  3：供应商权限
  finance:{jiaoyizhong?:string, ketixian?: string, status?: number, withdrawal_amount?: string} = {};
  myBankCard:{bankcode?:string, bankname?: string, cardno?: String, khuhang?: string,name?: string} = {};
  constructor(public navCtrl: NavController, private tip: Tip, private api: DataApi) {
  }
  ngOnInit() {
    this.api.getFinance(this.api.getStoreId(),this.api.getToken()).then((res) => {
      if (res.code=="0") {
        this.finance=res.list[0];
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  trad(){
  	this.navCtrl.push(Trading,{"status":"1","userrole":this.finance.status});
  }
  trad2(){
    this.navCtrl.push(Trading,{"status":"2","userrole":this.finance.status});
  }
  withd(){
  	this.navCtrl.push(Withdrawals);
  }
  profit(){
    this.api.getShopBank(this.api.getStoreId(),this.api.getToken()).then((res) => {
      if (res.code=="0") {
        let data:Array<any>=res.list;
        if(data.length>0){
          this.myBankCard=data[0];
          this.navCtrl.push(GoodCard,{'myBankCard':this.myBankCard});
        }else{
          this.tip.presentConfirm('您还未添加银行卡!是否添加?', {
            okText: '立即前往',
            cancelText: '取消'
          }).then((res) => {
            if (res) {
              this.navCtrl.push(BankCard);
            }
          })
        }
      } else {
        this.tip.presentToast(res.result);
      }
    });
  
  }
  dofinance(){
     this.api.getShopBank(this.api.getStoreId(),this.api.getToken()).then((res) => {
      if (res.code=="0") {
        let data:Array<any>=res.list;
        if(data.length>0){
          this.navCtrl.push(Cards);
        }else{
          this.tip.presentConfirm('您还未添加银行卡!是否添加?', {
            okText: '立即前往',
            cancelText: '取消'
          }).then((res) => {
            if (res) {
              this.navCtrl.push(BankCard);
            }
          })
        }
      } else {
        this.tip.presentToast(res.result);
      }
    });
    
  }
}