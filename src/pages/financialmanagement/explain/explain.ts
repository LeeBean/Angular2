import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-explain',
  templateUrl: 'explain.html'
})
export class Explain{
   constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  }
}
