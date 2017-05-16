import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-th',
  templateUrl: 'th.html'
})
export class Th{
   constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  } 
}