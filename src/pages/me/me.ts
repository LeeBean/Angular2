import { Component} from '@angular/core';
import { DataApi,Tip} from '../../providers/index';
import { NavController } from 'ionic-angular';
import { ChooseShop } from '../storeManage/chooseShop/chooseShop';
import { MyStoreInfo } from "../storeManage/myStoreInfo/myStoreInfo";
import { ModifyPwdPage } from "../modifypwd/modifypwd";
import { LoginPage } from "../login/login";


declare let ShareManager: any;

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  shop: {store_id?:string, name?: string, qcode?: string, yqm?: string,logo?: string, status?: string,intro?: string,flag?:string} = {};
  loginuser:{userId:string,userName?:string, userPic?:string,userphone?:string,is_yqm?:string,token?:string};
  constructor(public navCtrl: NavController, private tip: Tip, private api: DataApi) {
    this.shop = this.api.getUseShop();
  }
  //this.local.set(Constants.LOGINUSER, { data: user });
  ngOnInit() {
    this.getUse();
    console.log(this.loginuser)
  }
  getUse(){
    this.loginuser=this.api.getLoginUser()
  }
  goToMyShop(){
    this.navCtrl.push(MyStoreInfo);
  }
  chooseShop(){
    this.navCtrl.push(ChooseShop);
  }
  modifyPwd(){
    this.navCtrl.push(ModifyPwdPage);
  }
  shareYqm(){
    ShareManager.shareAction({
      shareTypes: ['WeiXin','WeiXinPYQ','QQZone','QQ','WeiBo'],
      title:this.shop.name+"诚邀您加入集客多， 注册邀请码为"+this.shop.yqm,
      description: "千款正品，假一罚十。零成本开店，成本价自买。动动手指就赚钱!",
      url:"http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd",
      imageUrl:this.shop.logo
    });
  }
  exitSystem(){
    this.tip.presentConfirm('您确定退出集客多系统吗?', {
      okText: '退出登录',
      cancelText: '取消'
    }).then((res) => {
      if (res) {
        this.api.logout();
        this.tip.presentToast('退出成功');
        this.navCtrl.push(LoginPage);
      }
    })
  }
}

