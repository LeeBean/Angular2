import { Component } from '@angular/core';
import { DataApi, Tip} from '../../../../providers/index';
import { NavController } from 'ionic-angular';
declare var ShareManager: any;

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class Cards{
  withdraw:{txje?:string}={};
  mycard:{balance?:string, bank_card?: string, name?: string} = {};
  constructor(public navCtrl: NavController, private tip: Tip, private api: DataApi) {
    this.withdraw.txje="0.00";
  }
  ngOnInit() {
    this.api.getMycardInfo(this.api.getStoreId(),this.api.getToken()).then((res) => {
      if (res.code=="0") {
        this.mycard=res.list[0];
        let carno=this.mycard.bank_card;
        this.mycard.bank_card=carno.substring(0,4)+"*****"+carno.substring(carno.length-3,carno.length);
        this.mycard.balance=this.mycard.balance==null?"0.00":this.mycard.balance;
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  //提现
  dowidthdraw(){
    if(this.withdraw.txje==""){
      this.tip.presentToast("请输入提现金额！");
      return;
    }
    if(Number(this.withdraw.txje)<50){
      this.tip.presentToast("提现金额必须大于或者等于50元！");
      return;
    }
    let loader = this.tip.presentLoading('数据提交中...');
    this.api.doWidthDraw(this.api.getStoreId(),this.api.getToken(),this.withdraw.txje).then((res) => {
      loader.dismiss();
      if (res.code=="0") {
         this.tip.presentToast("提现成功！");
         this.navCtrl.pop();
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  //全部提现
  withdrawAll(){
    this.withdraw.txje=this.mycard.balance;
  }
  goBack() {
    this.navCtrl.pop();
  }
}