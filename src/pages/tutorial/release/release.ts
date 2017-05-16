import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-release',
  templateUrl: 'release.html'
})
export class Release{
   constructor(public navCtrl: NavController) {
  }
  goBack() {
    this.navCtrl.pop();
  } 
}