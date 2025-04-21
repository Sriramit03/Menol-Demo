import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import {StatusBar} from 'react-native';
import LogInScreen from './src/screens/auth/LogInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import GlobalProvider, {useGlobalContext} from './src/context/GlobalProvider';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import Profile from './src/screens/profile/Profile';
import YourProfile from './src/screens/profile/YourProfile';
import Settings from './src/screens/profile/Settings';
import AddAddress from './src/screens/profile/AddAddress';
import HelpCenter from './src/screens/profile/HelpCenter';
import Wardrobe from './src/screens/Wardrobe';
import LoadingScreen from './src/screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="YourProfile" component={YourProfile} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="AddAddress" component={AddAddress} />
    <Stack.Screen name="HelpCenter" component={HelpCenter} />
  </Stack.Navigator>
);

const App = () => {
/*   const [intialScreen, setIntialScreen] = useState('');
  const getUserDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      return user;
    } catch (e) {
      console.error('Error retrieving user details', e);
    }
  };
  useEffect(() => {
    getUserDetails().then((res) => {
      console.log('UserDetails in App.tsx ', res);
      setIntialScreen(res === null ? 'LogInScreen' : 'Tab');
    });
  }, []); */
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'LoadingScreen'}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="Wardrobe" component={Wardrobe} />
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            /* options={{animation: 'slide_from_bottom'}} */></Stack.Screen>
        </Stack.Navigator>
        <StatusBar barStyle={'light-content'} />
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
