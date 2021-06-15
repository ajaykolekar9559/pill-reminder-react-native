import React from "react";
import { Animated, Easing, Image, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import PatientWelcomeScreen from '../screens/PatientWelcomeScreen';
import StartupScreen from '../screens/StartupScreen';
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";
import DrawerContainer from "../components/DrawerContainer";
import LogoutButton from '../components/LogoutButton';
import AddDoctorScreen from '../screens/AddDoctorScreen';
import DoctorListScreen from '../screens/DoctorListScreen';
// login stack
const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Welcome: { screen: WelcomeScreen },
    PWelcome: {screen: PatientWelcomeScreen}
  },
  {
    initialRouteName: "Welcome",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Doctor: {screen: AddDoctorScreen},
    PatientList: {screen: DoctorListScreen}
  },
  {
    initialRouteName: "Home",
    headerMode: "float",
    headerLayoutPreset: "left",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" },
  }
);

// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: { screen: HomeStack }
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         if (routeName === "Home") {
//           iconName = AppIcon.images.home;
//         }

//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//         return (
//           <Image
//             style={{
//               tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey
//             }}
//             source={iconName}
//           />
//         );
//       }
//     }),
//     initialLayout: {
//       height: 300
//     },
//     tabBarOptions: {
//       activeTintColor: AppStyles.color.tint,
//       inactiveTintColor: "gray",
//       style: {
//         height: Configuration.home.tab_bar_height
//       }
//     }
//   }
// );

// drawer stack
const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack
  },
  {
    drawerPosition: "left",
    initialRouteName: "Home",
    drawerWidth: 200,
    contentComponent: DrawerContainer,
    // navigationOptions: navigationOptionsHeader
  }
);

// Manifest of possible screens
const RootNavigator = createSwitchNavigator(
  {
    Startup:StartupScreen,
    LoginStack: LoginStack ,
    DrawerStack: DrawerStack,
  },
  {
    // Default config for all screens
    headerMode: "none",
    // initialRouteName: "LoginStack",
    // transitionConfig: noTransitionConfig,
    // navigationOptions: ({ navigation }) => ({
    //   color: "black"
    // })
  }
);


const mapStateToProps = (state) => {
  return {
    // user: state.user
  };
};

const mapDispatchToProps = (dispatch) => ({});

connect(mapStateToProps, mapDispatchToProps)(RootNavigator);

export default createAppContainer(RootNavigator);


const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
  }
});

