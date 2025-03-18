import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import { StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {

  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
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