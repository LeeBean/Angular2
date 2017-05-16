import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-yw',
  templateUrl: 'yw.html'
})
export class Yw{
   constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  } 
}