package com.webapp.jkd.cordova;

import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * 集客多插件
 */
public class JkdPlugin extends CordovaPlugin {
    /**
     * 分享
     */
    private static final String ACTION_SHARE = "share";
    /**
     * 获取用户及店铺信息
     */
    private static final String ACTION_USER_INFO = "userInfo";
    /**
     * 调用WebView
     */
    private static final String ACTION_WEB_VIEW = "webView";
    /**
     * 去登录
     */
    private static final String ACTION_RE_LOGIN = "reLogin";
    /**
     * 请求网络，获取数据
     */
    private static final String ACTION_HTTP = "http";
    /**
     * 回退
     */
    private static final String ACTION_GO_BACK = "goBack";
    /**
     * 加入内容到剪贴板
     */
    private static final String ACTION_COPY = "copy";
    /**
     * 保存网络图片到相册
     */
    private static final String ACTION_SAVE_IMAGE = "saveImage";
    /**
     * 定位到 省 市 区
     */
    private static final String ACTION_LOCATION = "location";
    /**
     * 进入购物车
     */
    private static final String ACTION_GO_SHOPPING_CART = "goShoppingCart";

    /**
     * 在首页时，进入二级页，隐藏底部Tab按钮
     */
    private static final String ACTION_HIDE_BOTTMO_TAB = "hideBottomTab";


    @Override
    public boolean execute(String action,
                           final JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {
        if (ACTION_SHARE.equals(action)){
            Toast.makeText(cordova.getActivity(), "分享", Toast.LENGTH_SHORT).show();
        }else if(ACTION_USER_INFO.equals(action)){
            Toast.makeText(cordova.getActivity(), "获取用户信息", Toast.LENGTH_SHORT).show();
        }else if(ACTION_WEB_VIEW.equals(action)){
            Toast.makeText(cordova.getActivity(), "调用WebView", Toast.LENGTH_SHORT).show();
        }else if(ACTION_RE_LOGIN.equals(action)){
            Toast.makeText(cordova.getActivity(), "去登录", Toast.LENGTH_SHORT).show();
        }else if(ACTION_HTTP.equals(action)){
            Toast.makeText(cordova.getActivity(), "网络请求", Toast.LENGTH_SHORT).show();
        }else if(ACTION_GO_BACK.equals(action)){
            Toast.makeText(cordova.getActivity(), "回退", Toast.LENGTH_SHORT).show();
        }else if(ACTION_COPY.equals(action)){
            Toast.makeText(cordova.getActivity(), "复制", Toast.LENGTH_SHORT).show();
        }else if(ACTION_LOCATION.equals(action)){
            Toast.makeText(cordova.getActivity(), "定位", Toast.LENGTH_SHORT).show();
        }else if(ACTION_SAVE_IMAGE.equals(action)){
            Toast.makeText(cordova.getActivity(), "保存图片", Toast.LENGTH_SHORT).show();
        }else if(ACTION_GO_SHOPPING_CART.equals(action)){
            Toast.makeText(cordova.getActivity(), "进入购物车", Toast.LENGTH_SHORT).show();
        }else if(ACTION_HIDE_BOTTMO_TAB.equals(action)){
            Toast.makeText(cordova.getActivity(), "操作底部Tab", Toast.LENGTH_SHORT).show();
        }else{
            return false;
        }
        return true;
    }


    @Override
    public Boolean shouldAllowRequest(String url) {
        return true;
    }

    @Override
    public Boolean shouldAllowBridgeAccess(String url) {
        return true;
    }

    @Override
    public Boolean shouldAllowNavigation(String url) {
        return true;
    }
}
