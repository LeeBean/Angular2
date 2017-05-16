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
export class SigunupApis {
    private config: Config;
    constructor(private http: Http,
        private api: Api,
        private local: Local

    ) {
        //获取单例config
        this.config = Config.getInstance();
    }

    doSignup(signup): any {
        return this.api.get('Reg/submit', signup);

    }

}
