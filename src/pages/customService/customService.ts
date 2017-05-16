import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-customService',
  templateUrl: 'customService.html'
})
export class CustomService {
  constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  }
}

