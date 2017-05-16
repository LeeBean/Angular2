# 集客多Cordova插件功能

## 插件功能

### 分享

1. shareTypes 分享支持类型，默认支持QQ，微博，微信，可选
1. url 内容地址
1. description 描述
1. title 标题
1. imageUrl 图片，QQ空间分享必须要有图片
1. light 分享对话框title，第一行亮色调显示的文字，可选
1. dark 分享对话框title，第二行暗色调显示的文字，可选

light与dark属性内容同时存在时，才显示；否则显示分享title

```python
exports.shareJKD = function(options, success, error) {
    var parameter = [
        options.shareTypes ? options.shareTypes : ['WeiXin', 'WeiXinPYQ', 'QQZone', 'QQ', 'WeiBo'],
        {
            url: options.url ? options.url : "",
            description: options.description ? options.description : "",
            title: options.title ? options.title : "",
            imageUrl: options.imageUrl ? options.imageUrl : "",
        },
        {
            light: options.light ? options.light : "",
            dark: options.dark ? options.dark : ""
        }
    ];
    exec(success, error, "JkdPlugin", "share", parameter);
};
```

### 获取用户及店铺信息

获取信息成功后，回调success，传回json对象，格式待定

```python
exports.getUserInfoJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "userInfo", [options]);
};
```

success 若App登录，则回调成功，返回数据格式如下：

```python
{
    "user": {
        "userId": "123",
        "is_yqm": "1",
        "userpic": "http://www.jikeduo.com.cn/upload/images/000/000/000/201609/57de1a6da33dc.jpg"
    },
    "store": {
        "store_id": "256",
        "qcode": "111",
        "yqm": "OK5SA",
        "logo": "http://xxx.jikeduo.com.cn/upload/images/default_shop_2.jpg",
        "intro": "集客多，放在口袋里的移动商城",
        "flag": "1"
    }
}
```

error 若App未登录，则回调失败，Html应主动调用JkdPlugin.goLoginJKD()去登录

### 调用WebView

1. url 加载地址,必须传
1. title 标题，最多显示6个字，可选
1. isShare 是否支持分享，支持则显示分享文字，默认不支持，可选

点击分享时回调 success 函数，h5端判断回传msg为share，调用插件分享函数

```python
exports.goWebViewJKD = function(options, success, error) {
    var parameter = [{
        url: options.url ? options.url : "",
        title: options.title ? options.title : "",
        isShare: options.isShare ? options.isShare : false,
    }];
    exec(success, error, "JkdPlugin", "webView", parameter);
};
```

### 去登录

不需要参数

```python
exports.goLoginJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "reLogin", [options]);
};
```

### 请求网络，获取数据

1. url 服务器地址，必须
1. isGet 是否是get类型，默认是post，可选
1. parameter 参数key-vaule，可选

```python
exports.getNetworkDataJKD = function(options, success, error) {
    var parameter = [{
        url: options.url ? options.url : "",
        parameter: options.parameter ? options.parameter : {},
        isGet: options.isGet ? options.isGet : false
    }];
    exec(success, error, "JkdPlugin", "http", parameter);
};
```

success 从服务器拿到正确的数据，才回调成功，数据为服务器返回原始数据

error 未拿到服务器正确数据，才回调失败，数据格式待定

> *注意：*在调用getNetworkDataJKD()时，每次调用必须返回结果，要么是success要么是error，
> 以免HTML界面卡死在loading界面。

### 回退

不需要参数

```python
exports.goBackJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "goBack", [options]);
};
```

### 加入内容到剪贴板

1. options String类型，必须

```python
exports.copyJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "copy", [options]);
};
```

### 保存网络图片到相册

1. urls String数组，必须

```python
exports.saveImageJKD = function(options, success, error) {
    var parameter = [{
        urls: options.urls ? options.urls : []
    }];
    exec(success, error, "JkdPlugin", "saveImage", parameter);
};
```

### 定位到 省 市 区

不需要参数

```python
exports.getLocationJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "location", [options]);
};
```

success

```python
    {
        "country":"中国",//国家
        "locality":"上海市",//地点，市
        "subLocality":"闵行区"//子地点，区
    }
```

error 定位失败

```python

```

### 进入购物车

不需要参数

```python
exports.goShoppingCartJKD = function(options, success, error) {
    exec(success, error, "JkdPlugin", "goShoppingCart", [options]);
};
```

### 显示隐藏底部Tab

> 只在首页的时候hideBottomTab才能显示隐藏Tab,非首页hideBottomTab被调用时不做任何操作
> 各平台在自己插件中判断是否显示隐藏

1. isHide 是否是隐藏Tab，默认为是，可选

```python
exports.hideBottomTabJKD = function(isHide, success, error) {
    var parameter = [{
        isHide: isHide
    }];
    exec(success, error, "JkdPlugin", "hideBottomTab", parameter);
};
```


## JS侦听原生事件

### JS侦听方式

```python
document.addEventListener('eventName', this.callFuction, false);
```

### 事件

1. resume 界面恢复可见的时候发送该事件
1. pause  界面不可见的时候发送该事件
