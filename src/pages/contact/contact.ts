import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { User }    from './user';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }
  isSpecial=true;
  model = new User('刘理彬',"18521538009", '111111');
  submitted = true;
  canSave=true;
  badCurly="class1";
  onSubmit() {
    this.submitted = true;

  }
  newUser() {
    this.badCurly="class2";
    if(this.isSpecial){
      this.isSpecial=false;
    }else{
      this.isSpecial=true;
    }
    if(this.canSave){
      this.canSave=false;
    }else{
      this.canSave=true;
    }
    this.model = new User("小明", '2111221', '13131');
  }
}
