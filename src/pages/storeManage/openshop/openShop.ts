import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {CreateShopPage} from "../createshop/createShop";

@Component({
  selector: 'openshop',
  templateUrl: 'openShop.html'
})
export class OpenShopPage {

  constructor(public navCtrl: NavController) {}

  toOpenShop(){
    this.navCtrl.push(CreateShopPage);
  }
}
