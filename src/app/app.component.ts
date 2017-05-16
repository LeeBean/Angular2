import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Config,Local, Constants, DataApi } from '../providers/index'
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Market } from '../pages/market/market';

declare var JkdPlugin: any;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any;
  userid: string = "";
  loginUser: { userId?: string, is_yqm?: string, userpic?: string } = {};
  shop: { store_id?: string, name?: string, qcode?: string, yqm?: string, logo?: string, status?: string, intro?: string, flag?: string } = {};
  // 构造函数
  private config: Config;
  constructor(platform: Platform, private local: Local, private dataApi: DataApi) {
    //console.log(platform.is("ios"));
    //this.assertNetwork();//检测网络
    this.config = Config.getInstance();//获取Config的实例
    if(this.config.mode=="prod"){
      JkdPlugin.getUserInfoJKD(null,
        function (data) {//成功

        }, function (error) {//失败 跳登入页面
          JkdPlugin.goLoginJKD();//到登入页
        }
      );
    }
    this.loginUser.userId = "5009";
    this.loginUser.is_yqm = "1";
    this.loginUser.userpic = "http://www.jikeduo.com.cn/upload/images/000/000/000/201609/57de1a6da33dc.jpg";


    // this.dataApi.setLoginUserWithId(this.loginUser);
    this.dataApi.setLoginUser(this.loginUser);
    this.dataApi.setToken(this.loginUser.userId);

    //暂时设置用户选择用户信息
    this.shop.store_id = "830";
    this.shop.name = "杜神";
    this.shop.qcode = "";
    this.shop.yqm = "OK5SA";
    this.shop.logo = "http://xxx.jikeduo.com.cn/upload/images/default_shop_2.jpg";
    this.shop.status = "1";
    this.shop.intro = "集客多，放在口袋里的移动商城";
    this.shop.flag = "1";
    this.dataApi.setUseShop(this.shop);

    platform.ready().then(() => {
      this.initApp();
      //console.log('device ready');
      //this.rootPage=LoginPage
    });

  }
  // assertNetwork() {
  //   if (!this.nativeService.isConnecting()) {
  //     this.nativeService.showToast('请连接网络');
  //   }
  // }
  initApp() {
    //StatusBar.styleDefault();
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByName("white");
    this.checkIsLogin();
    this.hideSplashScreen();
  }
  hideSplashScreen() {
    setTimeout(() => {
      Splashscreen.hide();
    }, 100);
  }

  checkIsLogin() {
    let config = Config.getInstance();
    //初始化全局信息
    //检测是否已经登录
    this.local.get(Constants.ACCESSTOKEN).then((res) => {
      if (res && res.data) {
        console.log('已登录');
        config.token = res.data;
        this.rootPage=TabsPage;
        //this.rootPage=Market;

      } else {
        this.rootPage=LoginPage;
        //this.rootPage=Market;
        console.log('未登录');
      }
    });
    this.local.get(Constants.LOGINUSER).then((res) => {
      if (res && res.data) {

        config.loginUser = res.data;
      }
    });
    this.local.get(Constants.LOGINUSERWITHID).then((res) => {
      if (res && res.data) {
        config.loginUserWithId = res.data;
      }
    });
    this.local.get(Constants.USRSHOP).then((res) => {
      if (res && res.data) {
        config.useShop = res.data;
      }
    });
  }
}
