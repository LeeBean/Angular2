//
//  JkdPlugin.h
//  JKDApp
//
//  Created by abc on 2017/3/13.
//
//

#import <Cordova/CDV.h>

@interface JkdPlugin : CDVPlugin

/* 登录调用插件 */
-(void)share:(CDVInvokedUrlCommand*)command;

/* 获取用户信息插件 */
-(void)userInfo:(CDVInvokedUrlCommand*)command;

/* 调取 WebView 插件*/
-(void)webView:(CDVInvokedUrlCommand*)command;

/* 去登录插件 */
-(void)reLogin:(CDVInvokedUrlCommand*)command;

/* 网络请求插件 */
-(void)http:(CDVInvokedUrlCommand*)command;

/* 回退 */
-(void)goBack:(CDVInvokedUrlCommand*)command;

/* 加入内容到剪贴板 */
-(void)copy:(CDVInvokedUrlCommand*)command;

/* 保存网络图片到相册 */
-(void)saveImage:(CDVInvokedUrlCommand*)command;

/* 定位到省市区 */
-(void)location:(CDVInvokedUrlCommand*)command;

/* 进入购物车 */
-(void)goShoppingCart:(CDVInvokedUrlCommand*)command;

/* 隐藏底部 */
-(void)hideBottomTab:(CDVInvokedUrlCommand*)command;
@end
