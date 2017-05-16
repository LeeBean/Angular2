import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable} from "rxjs";
import {Utils} from "./Utils";

@Injectable()
export class HttpService {

  constructor(public http: Http) {
  }

  public postFormData(url: string, paramMap?: any): Observable<Response> {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'application/json;charset=utf-8'
    });
    return this.http.post(url, HttpService.buildURLSearchParams(paramMap).toString(), new RequestOptions({headers: headers}))
  }

  public get(url: string, paramMap?: any): Observable<Response> {
    return this.http.get(url, {search: HttpService.buildURLSearchParams(paramMap)});
  }

  // 默认Content-Type为application/json;
  public post(url: string, body: any = null): Observable<Response> {
    return this.http.post(url, body);
  }

  public put(url: string, body: any = null, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(url, body, options);
  }

  public delete(url: string, paramMap?: any): Observable<Response> {
    return this.http.delete(url, {search: HttpService.buildURLSearchParams(paramMap)});
  }

  public patch(url: string, body: any = null, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, options);
  }

  public head(url: string, paramMap?: any): Observable<Response> {
    return this.http.head(url, {search: HttpService.buildURLSearchParams(paramMap)});
  }

  public options(url: string, paramMap?: any): Observable<Response> {
    return this.http.options(url, {search: HttpService.buildURLSearchParams(paramMap)});
  }

  public static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = Utils.dateFormat(val,'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }


}
