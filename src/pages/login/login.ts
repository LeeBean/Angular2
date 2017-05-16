import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataApi, Tip} from '../../providers/index';
import { SignupPage } from '../signup/signup';
import { ForgetPwdPage } from '../forgetpwd/forgetpwd';
import {ChooseShop} from "../storeManage/chooseShop/chooseShop";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {phone?: string, password?: string} = {};

  submitted = false;

  private token: string;
  public loginuser: any = {};
  public isLogin = false;

  constructor(public navCtrl: NavController,
              private api: DataApi,
              private tip: Tip)
  {
      this.token = '';
  }
  ionViewWillEnter() {
    this.getLoginUser();
  }

  getLoginUser() {
    if (this.api.getLoginUser()) {
      this.loginuser = this.api.getLoginUser();
      this.token = this.api.getToken();
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      let loader = this.tip.presentLoading('正在登录...');
      this.api.doLogin(this.login.phone,this.login.password).then((res) => {
        loader.dismiss();
        if (res.code!="0") {
          this.tip.presentToast(res.result);
        } else {
          let user:any={};
          user.userId=res.userid;
          user.is_yqm=res.is_yqm;
          user.userpic=res.userpic;
          this.tip.presentToast('登录成功');
          this.api.setLoginUserWithId(user);
          this.api.setLoginUser(user);
          this.api.setToken(res.userid);
          this.navCtrl.push(ChooseShop);
        }
      });
    }
  }
  onSignup() {
    this.navCtrl.push(SignupPage);
  }
  forgetPwd(){
    this.navCtrl.push(ForgetPwdPage);
  }
  goBack() {
    this.navCtrl.pop();
  }
}
