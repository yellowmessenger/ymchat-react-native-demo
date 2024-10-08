import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
// @ts-ignore
import {YMChat, YMChatEvents} from 'ymchat-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f6',
  },
  header: {
    height: 40,
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

  const showAlert = (description: any) => {
    Alert.alert('Event', description, [{text: 'OK'}], {cancelable: false});
  };

  const botId: string = 'x1645602443989'; // Initializing chatbot id to work with in the SDK
  const deviceToken: string = 'deviceToken';
  const apiKey: string = 'apiKey';
  const authToken: string = 'authToken';

  const openYellowSDK = () => {
    // Set botId, the first and compulsary step.
    YMChat.setBotId(botId);

    // Adding payload to communicate with chatbot
    YMChat.setPayload({name: 'Integration', type: 'react-native'});

    // associate an identity of the user with the chat bot
    YMChat.setAuthenticationToken(authToken);

    // enables firebase notifications
    // YMChat.setDeviceToken(deviceToken);

    // enables additional security to your chat history
    // read more about it here - 'https://docs.yellow.ai/docs/platform_concepts/mobile/chatbot/secure-ymauth'
    // YMChat.useSecureYmAuth(true);

    // If your bot is deployed on On-premise or in specific region
    // YMChat.config.customBaseUrl = 'https://your-on-prem-url.com';
    // or
    // YMChat.setCustomURL('https://rx.cloud.yellow.ai');

    // Enabling UI close button
    YMChat.showCloseButton(true);

    // Enabling voice input
    YMChat.setEnableSpeech(true);

    // using v2 widget
    YMChat.setVersion(2);

    // hides the input bar while the bot is loading
    YMChat.setDisableActionsOnLoad(true);

    // sets status bar color
    YMChat.setStatusBarColor('#000000');

    // sets close button color
    YMChat.setCloseButtonColor('#ffffff');

    // sets mic color
    YMChat.setMicIconColor('#000000');

    // sets mic background color
    YMChat.setMicBackgroundColor('#ffffff');

    // set theme for chatbot
    YMChat.setThemeBotName('Demo Bot Name');
    YMChat.setThemeBotDescription('Demo Bot Description');
    YMChat.setThemePrimaryColor('#ff0000');
    YMChat.setThemeSecondaryColor('#00ff00');
    YMChat.setThemeBotBubbleBackgroundColor('#0000ff');
    YMChat.setThemeBotIcon(
      'https://cdn.yellowmessenger.com/XJFcMhLpN6L91684914460598.png',
    );
    YMChat.setThemeBotClickIcon(
      'https://cdn.yellowmessenger.com/XJFcMhLpN6L91684914460598.png',
    );
    YMChat.setChatContainerTheme('dark');

    // presents the chatbot
    YMChat.startChatbot();

    // Listening to bot events
    YMChatEvents.addListener('YMChatEvent', (event: {code: any; data: any}) => {
      console.log(event.code, event.data);
      if (event.code === 'reloadBot') {
        // reload the bot without closing and reopening it.
        YMChat.reloadBot();
      }
    });

    // Listening to close bot events
    YMChatEvents.addListener('YMBotCloseEvent', () => {
      showAlert('Bot Closed');
    });

    // transmit data back to the bot after it has been successfully launched and is in a running state
    // YMChat.sendEventToBot('code', {key: 'some-value'});
  };

  return (
    <SafeAreaView style={styles.container}>
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
                try {
                  YMChat.setBotId(botId);
                  YMChat.setAuthenticationToken(authToken);
                  YMChat.setDeviceToken(deviceToken);
                  YMChat.registerDevice(apiKey, () => {
                    console.log('Device token linked successfully');
                  });
                } catch (error) {
                  console.log(`Failed to link devide token, error ${error}`);
                }
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Unlink device token"
              onPress={() => {
                try {
                  YMChat.unlinkDeviceToken(botId, apiKey, deviceToken, () => {
                    console.log('Device token unlinked successfully');
                  });
                } catch (error) {
                  console.log(`Failed to unlink devide token, error ${error}`);
                }
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Unread Message Count"
              onPress={() => {
                try {
                  YMChat.setBotId(botId);
                  YMChat.setAuthenticationToken(authToken);
                  YMChat.getUnreadMessagesCount((count: any) => {
                    console.log(`Unread Message Count: ${count}`);
                  });
                } catch (error) {
                  console.log(`error ${error}`);
                }
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
    </SafeAreaView>
  );
};

export default MyApp;
