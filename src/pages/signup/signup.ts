import { Component} from '@angular/core';

import { NavController,ViewController} from 'ionic-angular';
import { DataApi, Tip} from '../../providers/index';



import { SignupPage2 } from '../signup2/signup2';
import { Country } from '../country/country';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {phone?: string, password?: string ,password2?: string ,yzcode ?: string,areaCode ?: string,areaName ?: string,hiddenflag?:boolean} = {};


  countdown :any='发送验证码';
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,private tip: Tip, private api: DataApi) {
      this.signup.hiddenflag =false;
      if(this.signup.areaCode == null){
        this.signup.areaCode = '+86';
        this.signup.areaName = '中国';
      }
  }
  goBack() {
    this.navCtrl.pop();
  }
  onSignup() {

    if(!this.signup.areaCode){
      this.tip.presentToast('请选择国家');
      return;
    }
    if(!this.signup.phone){
      this.tip.presentToast('请输入手机号');
      return;
    }
    if(!this.signup.yzcode){
      this.tip.presentToast('请输入验证码');
      return;
    }else if(this.signup.yzcode.length!=6){
      this.tip.presentToast('验证码必须为六位');
      return;
    }

    console.log(this.signup);
    this.navCtrl.push(SignupPage2,{'signup':this.signup});
  }
  chooseCountry() {
    this.navCtrl.push(Country,{'signup':this.signup});
  }

  sendMsgCode(){
    if(this.countdown == "发送验证码" || this.countdown == "重新发送" ){
      if (!this.signup.phone){
        this.tip.presentToast('请输入手机号');
        return;
      }

      let loader = this.tip.presentLoading('正发送短信验证码');
      this.api.doSendMsgCode(this.signup.phone,"reg",this.signup.areaCode).then((res) => {
        loader.dismiss();
        if (res.code != "0") {
          this.tip.presentToast(res.result);
        } else {

          this.tip.presentToast('短信发送成功');

          let i=120;
          //this.countdown--;

          var t = setInterval(()=>{
            if(i==0){
              i=120;
              this.countdown='重新发送';
              clearInterval(t);
            }
            else{
              i--;
              this.countdown=i+"s";
              console.log(this.countdown);
            }
          },1000);
        }
      });
    }
  }

}
