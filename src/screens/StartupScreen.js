import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Services from '../store/services';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
// import firebase from 'react-native-firebase';

const StartupScreen = (props) => {
    useEffect(() => {
      async function fetchMyAPI() {
        const newAuth = await AsyncStorage.getItem('userAuthToken')
        console.log('NEW', newAuth)
        if(newAuth){
          props.navigation.navigate('Home');
        } else {
          props.navigation.navigate('Welcome');
        }
    
      }
      fetchMyAPI()
    }, [])


  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
