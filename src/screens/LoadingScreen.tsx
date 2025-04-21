import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../utils/fonts';
import {colors} from '../utils/theme';
import {useGlobalContext} from '../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/LoadingModal';

const LoadingScreen = ({navigation}) => {
  const {loading} = useGlobalContext();

  const getUserDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      const userDetails = jsonValue != null ? JSON.parse(jsonValue) : null;
      return userDetails;
    } catch (e) {
      console.error('Error retrieving user details', e);
    }
  };

  useEffect(() => {
    if (!loading) {
      getUserDetails().then(res => {
        if (res != null) navigation.replace('Tab');
        else navigation.replace('LogInScreen');
      });
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>MENOL</Text>
      <ActivityIndicator size="small" color={colors.primaryWhite} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBlack,
  },
  mainText: {
    fontFamily: fonts.gameOfSquids,
    fontSize: 30,
    color: colors.primaryWhite,
    letterSpacing: 6,
    marginBottom: 10,
  },
});
