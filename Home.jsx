import {
  View,
  Text,
  BackHandler,
  Alert,
  StatusBar,
  Linking,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';

const Home = ({route, navigation}) => {
  const {url} = route.params;

  const [siteRechable, setSiteRechable] = useState(true);
  const webViewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);

  const [currUrl, setcurrUrl] = useState('');

  checkInternet = () => {
    fetch(url)
      .then(res => {
        setSiteRechable(true);
      })
      .catch(error => {
        setSiteRechable(false);
      });
  };

  useEffect(() => {
    const backAction = () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
      } else {
        Alert.alert('Are You Sure !', 'Are you sure you want to Exit App?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color={'white'} />
    </View>
  );

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      {siteRechable ? (
        <>
          <WebView
            ref={webViewRef}
            userAgent="Mozilla/5.0 (Linux; Android Version 12) Chrome/103.0.0.0 Mobile Safari/WKWebView"
            source={{uri: url}}
            originWhitelist={['*']}
            renderLoading={Spinner}
            onError={async e => {
              await Linking.openURL(currUrl);
              webViewRef.current.goBack();
            }}
            startInLoadingState={true}
            onNavigationStateChange={navState => {
              setcurrUrl(navState.url);
              setCanGoBack(navState.canGoBack);
            }}
          />
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Image
              style={{height: '80%', width: '80%'}}
              source={require('./assets/no_internet.jpg')}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => checkInternet()}
              style={styles.fullWidthButton}>
              <Text style={styles.fullWidthButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

var styles = StyleSheet.create({
  fullWidthButton: {
    backgroundColor: '#e93578',
    height: 50,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: 'white',
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
});

export default Home;
