import { Component } from '@angular/core';
import {Offinfo} from "../offinfo/offinfo";
import {Profit} from "../profit/profit";
import { NavController } from 'ionic-angular';
import {DataApi, Tip} from "../../../providers/index";

@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html'
})
export class Offline{
  sub_number:string="";
  sub_profit:string="";
  constructor(public navCtrl: NavController,private api :DataApi,private tip:Tip) {

  }
  ngOnInit() {
    this.api.getSubInfo(this.api.getStoreId()).then((res) => {
      if (res.code=="0") {
          this.sub_number=res.sub_number;
          this.sub_profit=res.sub_profit;
      } else {
        this.tip.presentToast(res.result);
      }
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  offinfo(){
  	this.navCtrl.push(Offinfo);
  }
  profit(){
  	this.navCtrl.push(Profit);
  }
}