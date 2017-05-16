import { Component } from '@angular/core';
import { DataApi, Tip} from '../../../../providers/index';
import { NavController ,NavParams} from 'ionic-angular';
declare var ShareManager: any;

@Component({
  selector: 'page-goodCard',
  templateUrl: 'goodCard.html'
})
export class GoodCard{
   myBankCard:{bankcode?:string, bankname?: string, cardno?: String, khuhang?: string,name?: string} = {};
  constructor(public navCtrl: NavController, private tip: Tip, private api: DataApi,public navParams: NavParams) {
    this.myBankCard=navParams.get("myBankCard");
  }
  goBack() {
    this.navCtrl.pop();
  }
}