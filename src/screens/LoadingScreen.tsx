import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../utils/fonts';
import {colors} from '../utils/theme';
import {useGlobalContext} from '../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/LoadingModal';

const LoadingScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const getUserDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('UserDetails in Conrtext', user);
      return user;
    } catch (e) {
      console.error('Error retrieving user details', e);
    }
  };

  useEffect(() => {
    setModalVisible(true);
    getUserDetails().then(res => {
      console.log('Result in LoadingScreen', res);
      setModalVisible(false);
      if (res != null) navigation.replace('Tab');
      else navigation.replace('LogInScreen');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>MENOL</Text>
      <ActivityIndicator
        size="small"
        color={colors.primaryWhite}
      />
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
    marginBottom:10,
  },
});
