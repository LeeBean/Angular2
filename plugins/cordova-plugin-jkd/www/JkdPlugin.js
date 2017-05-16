var exec = require('cordova/exec');

exports.shareJKD = function(options, success, error) {
    var parameter = [
        options.shareTypes ? options.shareTypes : ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
        {
            url: options.url ? options.url : "",
            description: options.description ? options.description : "",
            title: options.title ? options.title : "",
            imageUrl: options.imageUrl ? options.imageUrl : "",
        }, {
            light: options.light ? options.light : "",
            dark: options.dark ? options.dark : ""
        }
    ];
    exec(success, error, "JkdPlugin", "share", parameter);
};


exports.getUserInfoJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "userInfo", [options]);
};


exports.goWebViewJKD = function(options, success, error) {
    var parameter = [{
        url: options.url ? options.url : "",
        title: options.title ? options.title : "",
        isShare: options.isShare ? options.isShare : false,
    }];
    exec(success, error, "JkdPlugin", "webView", parameter);
};


exports.goLoginJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "reLogin", [options]);
};


exports.getNetworkDataJKD = function(options, success, error) {
    var parameter = [{
        url: options.url ? options.url : "",
        parameter: options.parameter ? options.parameter : {},
        isGet: options.isGet ? options.isGet : false
    }];
    exec(success, error, "JkdPlugin", "http", parameter);
};

exports.goBackJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "goBack", [options]);
};

exports.copyJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "copy", [options]);
};

exports.saveImageJKD = function(options, success, error) {
    var parameter = [{
        urls: options.urls ? options.urls : []
    }];
    exec(success, error, "JkdPlugin", "saveImage", parameter);
};

exports.getLocationJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "location", [options]);
};

exports.goShoppingCartJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "goShoppingCart", [options]);
};

exports.hideBottomTabJKD = function(isHide, success, error) {
    var parameter = [{
        isHide: isHide
    }];
    exec(success, error, "JkdPlugin", "hideBottomTab", parameter);
};