/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Platform } from 'react-native';
import { YMChat } from 'ymchat-react-native';
import messaging from '@react-native-firebase/messaging';

// const App: () => Node = () => {
const App = () => {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function registerForRemoteMessages() {
    await messaging().registerDeviceForRemoteMessages();
  }

  async function setAutoInitEnabled() {
    await messaging().setAutoInitEnabled();
  }

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification',
          remoteMessage.notification,
        );
        return remoteMessage;
      }
    })

    messaging().onMessage((remoteMessage) => {
      console.log(remoteMessage.notification);
    })

    if (Platform.OS == "ios") {
      requestUserPermission();
      // registerForRemoteMessages();
      // setAutoInitEnabled();
    }
  }, []);

  const onPress = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
        YMChat.setBotId('x1608615889375'); // Default Bot Id
        // ... OTHER Configurations. (refer: https://github.com/yellowmessenger/ymchat-react-native)
        YMChat.setDeviceToken(token);
        YMChat.startChatbot();
      });

  };

  return (
    <>
      <View style={styles.fixToText}>
        <Button title="Start Chatbot" onPress={onPress} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fixToText: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
  },
});

export default App;
