import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tx',
  templateUrl: 'tx.html'
})
export class Tx{
   constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  } 
}