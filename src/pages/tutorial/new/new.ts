import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Introduce} from "../introduce/introduce";
import {Shop} from "../shop/shop";
import {Release} from "../release/release";
import {Development} from "../development/development";
import {Extension} from "../extension/extension";
import {Tx} from "../tx/tx";
import {Th} from "../th/th";
import {Yw} from "../yw/yw";

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class New{
   constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  }
  introduce(){
  	this.navCtrl.push(Introduce);
  }
  shop(){
  	this.navCtrl.push(Shop);
  }
  release(){
  	this.navCtrl.push(Release);
  }
  development(){
  	this.navCtrl.push(Development);
  }
  extension(){
  	this.navCtrl.push(Extension);
  }
  tx(){
  	this.navCtrl.push(Tx);
  }
  th(){
  	this.navCtrl.push(Th);
  }
  yw(){
  	this.navCtrl.push(Yw);
  }
}