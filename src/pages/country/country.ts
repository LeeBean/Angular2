import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-country',
  templateUrl: 'country.html'
})

export class Country {
  signup: {phone?: string, password?: string ,password2?: string ,yzcode ?: string,yqcode ?: string,areaCode ?: string,areaName ?: string,hiddenflag?:boolean,readonly ?: string} = {};
  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.signup = navParams.get("signup");
  }
  checkCountry(countryName,code){
    this.signup.areaName = countryName;
    this.signup.areaCode = code;
    this.signup.hiddenflag =false;
    this.signup.yzcode = '';
    if(this.signup.areaCode != null && this.signup.areaCode != "+86"){
      this.signup.yzcode = '666666';
      this.signup.hiddenflag =true;
    }

    this.navCtrl.pop();
  }
  goBack() {
    this.navCtrl.pop();
  }
}
