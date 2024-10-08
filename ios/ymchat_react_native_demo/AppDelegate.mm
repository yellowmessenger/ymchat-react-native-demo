#import "AppDelegate.h"
#import "Firebase.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [UNUserNotificationCenter currentNotificationCenter].delegate = self;
      UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
      UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
      [[UNUserNotificationCenter currentNotificationCenter]
       requestAuthorizationWithOptions:authOptions
       completionHandler:^(BOOL granted, NSError * _Nullable error) {
           if (!error) {
               NSLog(@"User Notification permission granted: %d", granted);
           }
       }];
      
      [application registerForRemoteNotifications];
  
  self.moduleName = @"ymchat_react_native_demo";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [FIRMessaging messaging].APNSToken = deviceToken;
  
  [[FIRMessaging messaging] tokenWithCompletion:^(NSString *token, NSError *error) {
    if (error != nil) {
      NSLog(@"Error getting FCM registration token: %@", error);
    } else {
      NSLog(@"FCM registration token: %@", token);
    }
  }];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
