import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions, StackActions} from 'react-navigation';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {LOGOUT} from '../store/actions/actions';
import RootNavigator from './AppNavigation';

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.authToken);

  // useEffect(() => {
  //   navRef.current.dispatch(NavigationActions.navigate({routeName: 'Welcome'}));
  // }, [isAuth]);

  const checkAuth = async (props) => {
    // const userData = await AsyncStorage.getItem('userAuthToken');
    // const newAuth = await AsyncStorage.getItem('userAuthToken')
    // console.log('BBBBBB',newAuth)
    // if (!userData) {
    //       await AsyncStorage.clear();
    //       // navRef.current.dispatch(
    //       //   StackActions.reset({
    //       //     index: 0,
    //       //     actions: [NavigationActions.navigate({routeName: 'Home'})],
    //       //   }),
    //       // );
    //       navRef.current.dispatch(
    //         NavigationActions.navigate({routeName: 'Welcome'}),
    //       );
    //       return {type: LOGOUT};
    //   } else {
    //     navRef.current.dispatch(
    //         NavigationActions.navigate({routeName: 'Home'}),
    //     );
    //   }
    }

  return (
    <RootNavigator
      ref={navRef}
      props={props}
      // dispatch={this.dispatch}
      // onNavigationStateChange={checkAuth}
    />
  );
};

export default NavigationContainer;