import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../utils/theme';
import WishList from '../screens/WishList';

import AiCamera from '../screens/AiCamera';
import Wardrobe from '../screens/Wardrobe';
import Profile from '../screens/Profile';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import Icon from 'react-native-vector-icons/Feather';
import LogInScreen from '../screens/auth/LogInScreen';
import HomeScreen from '../screens/HomeScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, iconName, screenName}) => {
  return (
    <View style={styles.tabContainer}>
      <View
        style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
        <Icon name={iconName} size={30} color={focused ? '#fff' : '#000'} />
      </View>
      <Text style={styles.tabBarText}>{screenName}</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <TabIcon
                focused={focused}
                iconName={'home'}
                screenName={'Home'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WishList"
          component={WishList}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <TabIcon
                focused={focused}
                iconName={'heart'}
                screenName={'Favorite'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AiCamera"
          component={AiCamera}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon
                focused={focused}
                iconName={'camera'}
                screenName={'AICam'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Wardrobe"
          component={Wardrobe}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon
                focused={focused}
                iconName={'shopping-cart'}
                screenName={'Cart'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon
                focused={focused}
                iconName={'user'}
                screenName={'Profile'}
              />
            ),
          }}
        />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 0,
    /* paddingHorizontal: 10,
    borderTopWidth: 1,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.primaryGrey,
    marginBottom: 10,
    marginHorizontal: '5%', */
  },
  tabContainer: {marginTop: 27, alignItems: 'center'},
  iconContainer: {
    width: 55,
    height: 55,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: colors.primaryGrey,
  },
  iconContainerFocused: {backgroundColor: '#000', borderColor: '#000'},
  tabBarText: {fontSize: 12, width: '100%', fontWeight: '500'},
});

export default TabNavigator;
