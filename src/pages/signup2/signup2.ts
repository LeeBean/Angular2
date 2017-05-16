import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import { SigunupApis, DataApi,Tip } from '../../providers/index';

import { OpenShopPage } from '../storeManage/openshop/openShop';



@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html'
})
export class SignupPage2 {
  signup: {phone?: string, password?: string ,password2?: string ,yzcode ?: string,yqcode ?: string,areaCode ?: string,areaName ?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController,private tip: Tip,public navParams: NavParams,private api :SigunupApis,private dataapi: DataApi,) {
    this.signup = navParams.get("signup");
  }

  onSignup(form) { //注册
    //this.submitted = true;
    if(!this.signup.yqcode){
      this.tip.presentToast('请输入邀请码');
      return;
    }
    if(!this.signup.password){
      this.tip.presentToast('请输入6-16位密码');
      return;
    }else if(this.signup.password.length<6){
      this.tip.presentToast('请输入6-16位密码');
      return;
    }
    if(!this.signup.password2){
      this.tip.presentToast('请再次输入密码');
      return;
    }
    if(this.signup.password!=this.signup.password2){
      this.tip.presentToast('两次密码输入不一致');
      return;
    }
    console.log(this.signup);
    let loader = this.tip.presentLoading('正在注册...');
    this.api.doSignup(this.signup).then((res) => {
      loader.dismiss();
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {


        let user:any={};
        user.userId=res.list.userid;


        this.tip.presentToast('注册成功');
        this.dataapi.setLoginUserWithId(user);
        this.dataapi.setLoginUser(user);
        this.dataapi.setToken(res.list.userid);
        this.navCtrl.push(OpenShopPage);
      }
    });

  }
  goBack() {
    this.navCtrl.pop();
  }
}
