import { Component } from '@angular/core';
import {NavController,NavParams,ViewController,Events} from 'ionic-angular';
import { DataApi,Tip,Config} from '../../providers/index';

declare var JkdPlugin: any;

@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html'
})
export class Productdetail {
  tab: string = "jiesao";
  productid:string="";
  
  // citys: any;
  // areas: any;
  // locales: any;

  // provInceindex: number=0;
  // cityIndex: number=0;
  // areaIndex: number=0;

  // chooseprovince: any;
  // choosecity: any;
  // choosearea: any;

  tabnum:number=1;
  isshowsheet:boolean=true;

  cityData: any[]; //城市数据
  cityName:string = '北京市 - 北京市 - 东城区'; //初始化城市名
  code:string; //城市编码

   private config: Config;
  constructor(public navCtrl: NavController, private dataApi: DataApi, private tip: Tip, public navParams: NavParams, public view: ViewController, public events: Events) {
    this.productid= this.navParams.get("productid");
    this.tabnum= this.navParams.get("tab")==undefined?1:this.navParams.get("tab");
    this.config = Config.getInstance();//获取Config的实例
}

  

  ngOnInit() {
    if(this.config.mode=="prod"){
      JkdPlugin.hideBottomTabJKD({isHide:true});
    }
    // this.dataApi.loadLocales().then((locales) => {
    //   this.locales = locales;
    //   this.citys = this.locales[0].city;
    //   this.areas = this.citys[0].area;
    // });
    this.setCityPickerData();
  }

  /**
   * 获取城市数据
   */
  setCityPickerData(){
    this.dataApi.getCitiesData()
      .then( data => {
        this.cityData = data;
      });
  }

  /**
   * 城市选择器被改变时触发的事件
   * @param event
   */
  cityChange(event){
    console.log(event);
    this.code = event['region'].value
  }
  // selectCity(type) {
  //   if (type == 1) {//选择省
  //     this.chooseprovince=this.locales[this.provInceindex].name;
  //     this.citys = this.locales[this.provInceindex].city;
  //     this.choosecity=this.citys[0].name;
  //     this.areas = this.citys[0].area;
  //     this.choosearea=this.areas[0];
  //   } else if(type == 2){//选择市
  //     this.choosecity=this.citys[this.cityIndex].name;
  //     this.areas = this.citys[this.cityIndex].area;
  //     this.choosearea=this.areas[0];
  //   }else if(type == 3){//选择区
  //     this.choosearea=this.areas[this.areaIndex];
  //   }
  // }
  onSegmentChanged(status){
    this.tabnum=status;
  }
  changePirce(){
    this.isshowsheet=false;
  }
  colseMode(){
    this.isshowsheet=true;
  }
  goBack() {
    if(this.navCtrl.canGoBack()){
        this.navCtrl.pop();
    }else{
         this.tip.presentToast("没有页面历史栈，返回原生页面");
          if(this.config.mode=="prod"){
              JkdPlugin.goBackJKD();
          }
    }
  }
}
