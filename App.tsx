import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import { StatusBar } from 'react-native';
import LogInScreen from './src/screens/auth/LogInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {

  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Tab">
        <Stack.Screen name='LogInScreen' component={LogInScreen}/>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
      <StatusBar backgroundColor={'#f2f1e6'} barStyle={'dark-content'} />
    </NavigationContainer>
  );
};

export default App;