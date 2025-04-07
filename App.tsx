import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import {StatusBar} from 'react-native';
import LogInScreen from './src/screens/auth/LogInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import GlobalProvider from './src/context/GlobalProvider';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {}, []);
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="LogInScreen">
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />

          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        </Stack.Navigator>
        <StatusBar barStyle={'light-content'} />
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
