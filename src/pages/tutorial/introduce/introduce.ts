import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-introduce',
  templateUrl: 'introduce.html'
})
export class Introduce{
   constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  } 
}