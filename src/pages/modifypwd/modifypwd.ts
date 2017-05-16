import { Component} from '@angular/core';

import { NavController,ViewController} from 'ionic-angular';
import { DataApi, Tip} from '../../providers/index';


@Component({
  selector: 'page-modifypwd',
  templateUrl: 'modifypwd.html'
})
export class ModifyPwdPage {
  passwd: {userid?: string, oldpwd?: string ,newpwd ?: string,newpwd2 ?: string} = {};
  submitted = false;


  constructor(public navCtrl: NavController,public viewCtrl: ViewController,private tip: Tip,private api: DataApi) {
      this.passwd.userid = api.getToken();

  }
  goBack() {
    this.navCtrl.pop();
  }

  modifypwdSubmit(){


    if(!this.passwd.oldpwd){
      this.tip.presentToast('请输入6-16位密码');
      return;
    }
    if(!this.passwd.newpwd){
      this.tip.presentToast('请输入6-16位密码');
      return;
    } if(!this.passwd.newpwd2){
      this.tip.presentToast('请再次输入密码');
      return;
    }
    if(this.passwd.newpwd!=this.passwd.newpwd2){
      this.tip.presentToast('两次密码输入不一致');
      return;
    }
    let loader = this.tip.presentLoading('正发修改密码...');
    this.api.doModifyPassword(this.passwd).then((res) => {
      loader.dismiss();
      if (res.code != "0") {
        this.tip.presentToast(res.result);
      } else {

        this.tip.presentToast('密码修改成功');
        this.navCtrl.pop();
      }
    });
  }
}
