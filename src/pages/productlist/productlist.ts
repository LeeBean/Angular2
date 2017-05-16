import { Component ,ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DataApi,Tip,ProductApi,Config} from "../../providers/index";
// import {Productground} from "../productground/productground";
import {Productdetail} from "../productdetail/productdetail";

declare var JkdPlugin: any;

@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html'
})

export class Marketproductlist {
  hasMore=false;
  isshowbottom:boolean=true;
  parameter:{shopid?:string, yiji?: string, erji?:string,order?:string, keyword?: string, page?:number,start?:string,limit?:string} = {};
  productList :Array<{productid?:string,is_oneself?:string,productname?:string,productpic?:string,productcb?:string,tjprice?:string,totalxs?:string,totalfx?:string,isdaili?:string,profit?:string}>=[];
  productParameter :{yiji?: string, erji?:string,title?:string}={};
  @ViewChild('mySearchbar') searchbar:any;
   private config: Config;
  constructor(public navCtrl: NavController,private dataApi :DataApi,private tip: Tip,public navParams: NavParams,private productApi :ProductApi) {
    this.productParameter = navParams.get("productParameter");
    if (this.productParameter){
      this.parameter.yiji = this.productParameter.yiji;
      this.parameter.erji = this.productParameter.erji;
    }
   // this.element=elementRef.nativeElement;
    this.parameter.shopid=this.dataApi.getStoreId();

    this.parameter.order ="1";
    this.parameter.page=1;
    this.parameter.start="0";
    this.parameter.limit="10";
     this.config = Config.getInstance();//获取Config的实例
  }
  ngOnInit(){
    if(this.config.mode=="prod"){
      JkdPlugin.hideBottomTabJKD({isHide:true});
    }
    if(this.productParameter.title == null || this.productParameter.title == ''){//从搜索过来的
        this.productList=[];
    }else{
        this.getProductList();
    }
  
  }
  ngAfterViewInit() {
   // console.log(this.searchbar);
   if(this.searchbar){
      this.searchbar.setFocus();
   }
  }
  getProductList(){
    let loader = this.tip.presentLoading('数据加载中...');
    return this.productApi.getCategoryProductList(this.parameter).then((res)=>{
      loader.dismiss();
      if (res.code != "0") {
        this.tip.presentToast(res.result);

      } else {
        for(let i=0 ; i<res.list.length ; i++) {
          this.productList.push(res.list[i]);
        }

        if (res.totalPage > res.page ){
          this.hasMore = true;
          this.parameter.page ++;
        }else
          this.hasMore = false;
      }

    })
  }
  moreInfo(infiniteScroll){
    if (!this.hasMore) return;

    this.getProductList().then(res => infiniteScroll.complete());
  }
  //1-人气 2-利润 3价格
  changeOrder(type){
    this.parameter.page=1;
    this.parameter.start="0";
    this.parameter.limit="10";
    if(type != 3){
      this.parameter.order = type;
    }else{
      if (this.parameter.order =="3"){
        this.parameter.order = '4';
      }else {
        this.parameter.order = '3'
      }

    }
    this.productList = [];
    this.getProductList();

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
  getItems(ev) {
    this.productList =[];
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.parameter.keyword = val;
      this.getProductList();
    }
  }
  // searchProduct(){
  //   //alert("搜索");
  // }
  //商品操作
  oprProduct(item){
    let me=this;
    let isdaili=item.isdaili;// 是否代理 0 未代理 1 已代理
    let productid=item.productid;
    if(isdaili=="0"){//未代理 到更改价格页面
      //this.navCtrl.push(Productground,{"product":item});
      this.tip.presentConfirm('是否确定代理该商品？', {
        okText: '确认',
        cancelText: '取消'
      }).then((res) => {
        if (res) {
          me.dataApi.shopAgent(productid,me.dataApi.getStoreId(),me.dataApi.getToken()).then((res) => {
            if (res.code=="0") {//代理成功
              item.isdaili="1";
               this.isshowbottom=false;
            } else {
              me.tip.presentToast(res.result);
            }
          });
        }
      })
    }else if(isdaili=="1"){//已代理 取消代理
      this.tip.presentConfirm('是否确定取消代理该商品？', {
        okText: '确认',
        cancelText: '取消'
      }).then((res) => {
        if (res) {
          me.dataApi.shopAgent(productid,me.dataApi.getStoreId(),me.dataApi.getToken()).then((res) => {
            if (res.code=="0") {//取消代理成功
              item.isdaili="0";
               this.isshowbottom=false;
            } else {
              me.tip.presentToast(res.result);
            }
          });
        }
      })
    }
  }
  //商品详情
  productdetail(id,tab){
    this.navCtrl.push(Productdetail,{"productid":id,"tab":tab});
  }
  //分享商品
  shareMarketProduct(product){
      console.log(product);
      let isdaili=product.isdaili;//是否代理 0 -未代理 1-代理
      
      if(this.config.mode=="prod"){
          JkdPlugin.shareJKD({
              shareTypes: ['WeiXin','WeiXinPYQ'],
              title:product.product_name,
              description: '百分百正品，绝对物有所值，快来看看有什么好东西！',
              url:'http://www.jikeduo.com.cn/projects/jkd/Home/Goods/detail?id=225521&store_id=830&key=eyJuaWNrbmFtZSI6Ilx1NWRlNlx1NGY0ZFx1NTkyN1x1NTkyYiIsInVpZCI6IjUwMDkiLCJzb3VyY2UiOiJ3YXBwIn0&sign=576a6b0c5cf78e27d975f4344cfbfa75&_dc=1489741207',
              imageUrl:'http://www.jikeduo.com.cn/projects/webapp_1.50/uploads/thumbnail/57e3b2ea8995d.jpg',
              light:'赚¥45',
              dark:'您当前售价设置为175，您有45的利润'
          });
      }else{
          this.tip.presentToast('请使用APP进行分享');
      }
  }
  //关闭下边栏
  closebottom(){
      this.isshowbottom=true;
  }
   //去商品管理
  goproduct(){
        if(this.config.mode=="prod"){
          JkdPlugin.goShoppingCartJKD();
      }else{
          this.tip.presentToast('此功能仅限载APP中使用');
      }
  }
  //去商品管理
  pmanagent(){
      if(this.config.mode=="prod"){
          JkdPlugin.goShoppingCartJKD();
      }else{
          this.tip.presentToast('此功能仅限载APP中使用');
      }
  }
}
