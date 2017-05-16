import { Component } from '@angular/core';
import { DataApi, Tip} from '../../../providers/index';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
declare var ShareManager: any;

@Component({
  selector: 'page-bankCard',
  templateUrl: 'bankCard.html'
})
export class BankCard{
  testRadioOpen: boolean;
  testRadioResult;
  bank:{bankCode ?:string ,bankName?:string }={};
  banks:Array<{bankCode ?:string ,bankName?:string }>=[];
  creatData:{shopid?:string ,userid?:string ,bankCode?:string ,khuhang?:string,cardNo?:string,name?:string }={};
  constructor(public navCtrl: NavController, private tip: Tip, private api: DataApi,public alertCtrl: AlertController) {
     
  }
  ngOnInit() {
    this.creatData.shopid=this.api.getStoreId();
    this.creatData.userid=this.api.getToken();
    this.api.getBanks().then((res) => {
      if (res.code=="0") {
          this.banks=res.list;
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  doCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择银行');
    for(let i=0;i<this.banks.length;i++){
      if(this.banks[i].bankCode==this.bank.bankCode){
        alert.addInput({
          type: 'radio',
          label: this.banks[i].bankName,
          value: this.banks[i].bankCode+","+this.banks[i].bankName,
          checked: true
        });
      }else{
        alert.addInput({
          type: 'radio',
          label: this.banks[i].bankName,
          value: this.banks[i].bankCode+","+this.banks[i].bankName,
        });
      }
    }
    //alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        let vaule=[];
        if(vaule!=null&&vaule.length>0){
          vaule=data.split(",");
        }
       
        if(vaule.length==2){
          this.bank.bankCode=vaule[0];
          this.bank.bankName=vaule[1];
          this.creatData.bankCode=vaule[0];
        }
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
  doSubmitdata(){
     //console.log(this.creatData);
     if(this.creatData.bankCode==""){
        this.tip.presentToast("请选择银行卡");
        return;
     }
     if(this.creatData.khuhang==""){
        this.tip.presentToast("请输入开户行");
        return;
     }
     if(this.creatData.cardNo==""){
        this.tip.presentToast("请输入卡号");
        return;
     }
     if(this.creatData.name==""){
        this.tip.presentToast("请输入姓名");
        return;
     }
      let loader = this.tip.presentLoading('数据提交中...');
      this.api.doCreatBankcard(this.creatData).then((res) => {
        loader.dismiss();
        if (res.code=="0") {
          this.tip.presentToast("银行卡添加成功");
          this.navCtrl.pop();
        } else {
          this.tip.presentToast(res.result);
        }
    });
  }
}