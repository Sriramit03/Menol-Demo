import React from 'react';
import {StyleSheet, Image, View, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../utils/theme';
import HomeScreen from '../screens/HomeScreen';
import {icons} from '../utils/icons';
import MarketPlaceScreen from '../screens/MarketPlaceScreen';
import WishList from '../screens/WishList';

import Feather from 'react-native-vector-icons/Feather';
import AiCamera from '../screens/AiCamera';
import Wardrobe from '../screens/Wardrobe';
import Profile from '../screens/Profile';
import Filter from '../components/Filter';
import Temp from '../components/Temp';
import LogInScreen from '../screens/auth/LogInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, icon}) => {
  return (
    <View style={[styles.iconStyles, focused && styles.iconStylesFocused]}>
      <Image
        source={focused ? icon.focused : icon.default}
        style={{
          width: 24,
          height: 24,
        }}
      />
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon focused={focused} icon={icons.wishlist} />
          ),
        }}
      />
      <Tab.Screen
        name="AiCamera"
        component={AiCamera}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.camera} />
          ),
        }}
      />
      <Tab.Screen
        name="Wardrobe"
        component={Wardrobe}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.cart} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.profile} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 76,
    paddingHorizontal: 10,
    position: 'absolute',
    backgroundColor: colors.primaryWhite,
    marginBottom: 10,
    marginHorizontal: '5%',
    elevation: 0,
    borderTopWidth: 1,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.primaryGrey,
  },
  /*   iconContainer: {
    padding: 5,
  }, */
  iconStyles: {
    borderColor: colors.primaryGrey,
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    top: 20,
  },
  iconStylesFocused: {
    borderColor: colors.primaryBlue,
    backgroundColor: colors.primaryBlue,
  },
});

export default TabNavigator;

/* <Feather
              name="home"
              color="#000"
              size={24}
              style={[styles.iconStyles, focused && styles.iconStylesFocused]}
            /> */
