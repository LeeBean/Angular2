import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Api } from "./api";
import { Config } from "./config";
import { Local } from "./local";
import { Constants } from "./constants";
import { UserInterface} from "../interfaces/index";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


/**
 * 这里用来封装一些与数据请求相关的业务逻辑
 * 当程序规模增大时，需要分离此文件
 * 1.业务上的对外http数据请求接口，统一在此处
 * 2.某些从localstorage获取数据的接口
 */
@Injectable()
export class DataApi {
    private config: Config;
    constructor(private http: Http,
        private api: Api,
        private local: Local
    ) {
        //获取单例config
        this.config = Config.getInstance();
    }
    setLoginUser(user) {
        this.local.set(Constants.LOGINUSER, { data: user });
        this.config.loginUser = user;
    }
    getLoginUser(): UserInterface {
        return this.config.loginUser;
    }
    setUseShop(shop) {
      this.local.set(Constants.USRSHOP,{data :shop});
      this.config.useShop = shop;

    }
    getUseShop(): any {
      return this.config.useShop;

    }
    getStoreId(){
      return this.config.useShop.store_id;
    }
    //登录
    doLogin(phone: string,password: string): any {
        return this.api.get('Login/submit', {phone,password});
    }
    getHomeData(shopid,userid): any {
        return this.api.get('Shop/shop_index', {shopid,userid});
    }
    setToken(token: string) {
        this.local.set(Constants.ACCESSTOKEN, { data: token });
        this.config.token = token;
    }
    getToken() {
        return this.config.token;
    }
    setLoginUserWithId(user: any) {
        this.local.set(Constants.LOGINUSERWITHID, { data: user });
        this.config.loginUserWithId = user;
    }
    getLoginUserWithId() {
        return this.config.loginUserWithId;
    }
    //退出登录
    logout() {
        this.local.remove(Constants.ACCESSTOKEN);
        this.local.remove(Constants.LOGINUSER);
        this.local.remove(Constants.LOGINUSERWITHID);
        this.config.token = '';
        this.config.loginUser = null;
        this.config.useShop = null;
        this.config.loginUserWithId = null;
        console.log('token、loginuser已经清除，退出成功');
    }
    clearCache(){
        this.local.forEach((value,key,index)=>{
            if(key.startsWith('CACHE_')){
                this.local.remove(key);
            }
        })
    }
    isIonic(){
        return this.config.isIonic;
    }
    //type = reg：注册，forget：忘记密码
    doSendMsgCode(phone:string , type :string , areaCode ){
      return this.api.get('Public/send_code', {phone,type,areaCode});
    }
    doForgetpwd(signup ){
      return this.api.get('Lostpwd/submit', signup);
    }
    doModifyPassword(passwd ){
      return this.api.get('Pwd/edit_pwd', passwd);
    }
    pttuijian(shopid){
        return this.api.get('Shop/addStoreProduct', {shopid});
    }
    getViewurl(shopid,userid){
        return this.api.get('Shop/preview', {shopid,userid});
    }
    getFinance(shopid,userid){
        return this.api.get('Shop/finance', {shopid,userid});
    }
    getShopBank(shopid,userid){
        return this.api.get('Shop/shop_bank', {shopid,userid});
    }
    getMycardInfo(shopid,userid){
        return this.api.get('Shop/depositors_index', {shopid,userid});
    }
    doWidthDraw(shopid,userid,txje){
        return this.api.get('Shop/depositors_apply', {shopid,userid,txje});
    }
    getBanks(){
        return this.api.get('Shop/bank');
    }
    doCreatBankcard(ob){
        return this.api.get('Shop/shop_add_bank',ob);
    }
    //收益记录
    getTradList(ob): any {
        return this.api.get('Shop/records', ob);
    }
    getWithDrawList(ob): any {
        return this.api.get('Shop/present_record', ob);
    }
    //下线管理
    getSubInfo(storeid){
        return this.api.get('Shop/sub_manage', {storeid});
    }
    //下线详情
    getSubList(ob){
        return this.api.get('Shop/sub_list', ob);
    }
    //分成收益
    getsubxqList(ob){
        return this.api.get('Shop/sub_order', ob);
    }

  //分销市场
    getMarketChannelList () {
        return this.api.get('Fx/fx_channel');
    };
    //分销市场频道主页
    getMarketChannelIndexList(parameter) {
        return this.api.get('Fx/fx_index',parameter);
    };
    shopAgent(productid,shopid,userid){
        return this.api.get('Product/shop_agent', {productid,shopid,userid});
    }
    getDisplayInfo(productid,fx){
        return this.api.get('product/shop_displayInfo', {productid,fx});
    }
    Shopagent(productid,shopid,userid,lsprice){
        return this.api.get('Product/shop_agent', {productid,shopid,userid,lsprice});
    }
    loadLocales() {
        return new Promise(resolve => {
            this.http.get('assets/city.json').subscribe(res => {
                resolve(res.json());
            });
        });
    }

    getCitiesData(){
        return this.http.get('assets/city-data.json')
        .toPromise()
        .then(response => response.json())
        .catch( err => {
            return Promise.reject(err)
        })

    }
}
