import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Text,
  Alert,
  BackHandler,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  const api_url = 'https://www.ajsmartbuild.com';

  const navigation = useNavigation();

  useEffect(() => {
    // setTimeout(() => setLoading(false), 3000);
    fetch(api_url)
      .then(response => {
        // console.log(response);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
                params: {url: api_url},
              },
            ],
          });
        }, 2500);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Server Error', 'Please Try After Sometime');
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <View style={styles.logoContainer}>
        <Image source={require('./assets/aj_logo.png')} style={styles.logo} />
      </View>

      {/* Loader Section */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 100,
  },
});

export default SplashScreen;
