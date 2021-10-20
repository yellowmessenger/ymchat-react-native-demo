/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { YMChat } from 'ymchat-react-native';

let deviceToken = "deviceToken";
let apiKey = "apiKey";
let botId = "x1608615889375";

const App: () => Node = () => {
  const onPress = () => {
    YMChat.setBotId(botId); // Default Bot Id
    YMChat.setEnableHistory(true);
    // ... OTHER Configurations. (refer: https://github.com/yellowmessenger/ymchat-react-native)
    YMChat.setVersion(2);
    YMChat.startChatbot();
  };

  const logout = () => {
    YMChat.unlinkDeviceToken(botId, apiKey, deviceToken, (unLinkDeviceTokenResult) => {
      if (unLinkDeviceTokenResult == true) {
        console.log("Device token unlinked");
      }
      else {
        console.log(unLinkDeviceTokenResult);
      }
    });
  }

  return (
    <>
      <View style={styles.fixToText}>
        <Button title="Start Chatbot" onPress={onPress} />
        <Button title="Unlink device token" onPress={logout} />
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
