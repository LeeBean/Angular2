import { Injectable } from '@angular/core';
//import { Http} from '@angular/http';
import { Http} from '@angular/http';
import { Api } from "./api";
import { Config } from "./config";
import { Local } from "./local";

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
export class ProductApi {
    private config: Config;
    constructor(private http: Http,
        private api: Api,
        private local: Local

    ) {
        //获取单例config
        this.config = Config.getInstance();
    }
    getProductList(product): any {
        return this.api.get('Product/shop_commodity', product);
    }
    getProducturl(productid,shopid){
        return this.api.get('Product/shop_product', {productid,shopid});
    }
    getBuyrul(productid,shopid,userid){
        return this.api.get('Product/buy_oneself', {productid,shopid,userid});
    }
    productProp(productid,type,is_zy){
        return this.api.get('Product/shop_handle', {productid,type,is_zy});
    }
    getProductDetailurl(productid,shopid){
        return this.api.get('Product/shop_product', {productid,shopid});
    }
    getProductInfo(productid){
        return this.api.get('Product/shop_displayInfo', {productid});
    }
    submitChangPrice(productInfo,productid){
        let price:string=productInfo.price;
        let lsprice:string=productInfo.lsprice;
         return this.api.get('product/shop_editInfo', {productid,price,lsprice});
    }
    getCategoryGroupList(){
        return this.api.get("Product/shop_yiji_category");
    }

    getCateGoryList(id){
      return this.api.get('Product/shop_erji_category', {id});
    }
    getCategoryProductList(parameter) {
      return this.api.get('Product/fx_market', parameter);
    }
}
