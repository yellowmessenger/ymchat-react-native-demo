import React from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
// @ts-ignore
import {YMChat, YMChatEvents} from 'ymchat-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f6',
  },
  header: {
    height: 60,
    backgroundColor: '#fff685',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#384248',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginVertical: 20,
  },
  button: {
    width: '100%',
    marginBottom: 20,
  },
});

const MyApp = () => {
  const hasNetwork = async () => {
    try {
      const response = await fetch('https://example.com');
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const log = (name: string, data: any = null) => {
    console.log(`Logger - ${name}:`, data);
  };

  const showAlert = (description: any) => {
    Alert.alert('Event', description, [{text: 'OK'}], {cancelable: false});
  };

  const openYellowSDK = () => {
    YMChat.setBotId('x1645602443989');
    YMChat.setVersion(2);
    YMChat.startChatbot();

    YMChatEvents.addListener('YMChatEvent', (event: {code: any; data: any}) => {
      log(event.code, event.data);
    });

    YMChatEvents.addListener('YMBotCloseEvent', () => {
      log('Bot closed');
      showAlert('Bot Closed');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>YMChat Demo</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.spacer} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Register Device"
              onPress={() => {
                // Handle register device logic
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Unlink device token"
              onPress={() => {
                // Handle unlink device token logic
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Unread Message Count"
              onPress={() => {
                // Handle unread message count logic
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Start chatBot"
              onPress={async () => {
                if (await hasNetwork()) {
                  openYellowSDK();
                } else {
                  showAlert('No internet connection available.');
                }
              }}
            />
          </View>
        </View>
        <View style={styles.spacer} />
      </View>
    </View>
  );
};

export default MyApp;
