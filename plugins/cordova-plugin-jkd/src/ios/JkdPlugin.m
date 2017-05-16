//
//  JkdPlugin.m
//  JKDApp
//
//  Created by abc on 2017/3/13.
//
//

#import "JkdPlugin.h"
#import <CoreLocation/CoreLocation.h>
#import <Photos/Photos.h>


@interface JkdPlugin ()<CLLocationManagerDelegate>

@property (strong, nonatomic) NSString *callbackId;
@property (strong, nonatomic) CLLocationManager *locationManager;


@end


@implementation JkdPlugin

-(void)share:(CDVInvokedUrlCommand*)command{
    
}


-(void)userInfo:(CDVInvokedUrlCommand*)command{
    
#warning 倒闭
    
}


-(void)webView:(CDVInvokedUrlCommand*)command{
    
}


-(void)reLogin:(CDVInvokedUrlCommand*)command{
    
}

-(void)http:(CDVInvokedUrlCommand*)command{
    
}


-(void)goBack:(CDVInvokedUrlCommand*)command{
    
}


-(void)copy:(CDVInvokedUrlCommand*)command{
    
    NSString *copyStr = (NSString *)[command.arguments objectAtIndex:0];
    
    UIPasteboard *pad = [UIPasteboard generalPasteboard];
    [pad setString:copyStr];
    
}


-(void)saveImage:(CDVInvokedUrlCommand*)command{
    
    __weak JkdPlugin *weakSelf = self;
    PHAuthorizationStatus status = [PHPhotoLibrary authorizationStatus];
    
    // 2.判断用户的授权状态
    if (status == PHAuthorizationStatusNotDetermined) {
        
        // 如果状态是不确定的话,block中的内容会等到授权完成再调用
        [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
            // 授权完成就会调用
            if (status == PHAuthorizationStatusAuthorized) {
                [weakSelf creatAndSaveImg];
            }
            
        }];
        
    } else if (status == PHAuthorizationStatusAuthorized) {
        
        // 调用存储图片的方法
        [weakSelf creatAndSaveImg];
        
    } else {
        
        // 使用第三方框架,弹出一个页面提示用户去打开授权
    }
}

-(void)creatAndSaveImg{
    
    // 以 App 的名称作为相册名字
    NSString *title = [NSBundle mainBundle].infoDictionary[(NSString *)kCFBundleNameKey];
    // 已经创建的自定义相册
    PHAssetCollection *createdCollection = nil;
    
    // 获得所有的自定义相册
    PHFetchResult<PHAssetCollection *> *collections = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum subtype:PHAssetCollectionSubtypeAlbumRegular options:nil];
    for (PHAssetCollection *collection in collections) {
        if ([collection.localizedTitle isEqualToString:title]) {
            createdCollection = collection;
            break;
        }
    }
    
    if (!createdCollection) { // 没有创建过相册
        __block NSString *createdCollectionId = nil;
        // 创建一个新的相册
        [[PHPhotoLibrary sharedPhotoLibrary] performChangesAndWait:^{
            
            createdCollectionId = [PHAssetCollectionChangeRequest creationRequestForAssetCollectionWithTitle:title].placeholderForCreatedAssetCollection.localIdentifier;
            
        } error:nil];
        
        // 创建完毕后再取出相册
        createdCollection = [PHAssetCollection fetchAssetCollectionsWithLocalIdentifiers:@[createdCollectionId] options:nil].firstObject;
    }
    
    
    UIImage *img = [UIImage imageNamed:@"icon_pyq"];
    __block NSString *createdAssetId = nil;
    // 添加图片到【相机胶卷】
    // 同步方法,直接创建图片,代码执行完,图片没创建完,所以使用占位ID (createdAssetId)
    [[PHPhotoLibrary sharedPhotoLibrary] performChangesAndWait:^{
        createdAssetId = [PHAssetChangeRequest creationRequestForAssetFromImage:img].placeholderForCreatedAsset.localIdentifier;
    } error:nil];
    
    PHFetchResult<PHAsset *> *createdAsset = [PHAsset fetchAssetsWithLocalIdentifiers:@[createdAssetId] options:nil];
    
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
        
        // 写入图片到相册
        PHAssetCollectionChangeRequest *request = [PHAssetCollectionChangeRequest changeRequestForAssetCollection:createdCollection];
        [request addAssets:createdAsset];
        
    } completionHandler:^(BOOL success, NSError * _Nullable error) {
        
        NSLog(@"success = %d, error = %@", success, error);
        
    }];

}

-(void)location:(CDVInvokedUrlCommand*)command{
    
    self.callbackId = command.callbackId;
    
    if ([CLLocationManager locationServicesEnabled] && [CLLocationManager authorizationStatus] != kCLAuthorizationStatusDenied) {
        // 定位信息被允许
        [self.locationManager startUpdatingLocation];
        
    }else{

    }
    
}

- (CLLocationManager *)locationManager{
    if (!_locationManager) {
        _locationManager = [[CLLocationManager alloc]init];
        _locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters;
        _locationManager.delegate = self;
        
        if ([[[UIDevice currentDevice] systemVersion] doubleValue]>8.0) {
            
            [_locationManager requestWhenInUseAuthorization];//添加这句
        }
    }
    return _locationManager;
}

-(void)goShoppingCart:(CDVInvokedUrlCommand*)command{
    
}


-(void)hideBottomTab:(CDVInvokedUrlCommand*)command{
    
}


- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations{
    
    __weak JkdPlugin *weakSelf = self;
    CLLocation *currentLocation = [locations lastObject];
    CLGeocoder *geocoder = [[CLGeocoder alloc]init];
    // 反解码出位置信息
    [geocoder reverseGeocodeLocation:currentLocation completionHandler:^(NSArray<CLPlacemark *> * _Nullable placemarks, NSError * _Nullable error) {
        
        if (placemarks.count > 0) {
            CLPlacemark *placeMark = placemarks[0];
            NSDictionary *dict = [NSDictionary dictionaryWithObjectsAndKeys:placeMark.addressDictionary[@"Country"],@"country",placeMark.addressDictionary[@"City"],@"locality",placeMark.addressDictionary[@"SubLocality"],@"subLocality", nil];
            [weakSelf successWithCallbackID:weakSelf.callbackId withDictionary:dict];
        }
    }];
}


- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error{
    NSLog(@" 失败了么  %@",error);
}


- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
    switch (status) {
        case kCLAuthorizationStatusNotDetermined:
            if ([self.locationManager respondsToSelector:@selector(requestWhenInUseAuthorization)]) {
                [self.locationManager requestWhenInUseAuthorization];
            }
            break;
        default:
            [self.locationManager startUpdatingLocation];
            break;
    }
}


// 插件信息成功的回调
- (void)successWithCallbackID:(NSString *)callbackID withMessage:(NSString *)message
{
    if (self.callbackId) {
        
        CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
    }
    
}



- (void)successWithCallbackID:(NSString *)callbackID withDictionary:(NSDictionary *)dictionary
{
    
    if (self.callbackId) {
        
        CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
        
        [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
        
    }
    
}
@end

