/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {YMChat} from 'ymchat-react-native';

const App: () => Node = () => {
  const onPress = () => {
    YMChat.setBotId('x1568547207370'); // Default Bot Id
    YMChat.setEnableHistory(true);
    // ... OTHER Configurations. (refer: https://github.com/yellowmessenger/ymchat-react-native)
    YMChat.startChatbot();
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
