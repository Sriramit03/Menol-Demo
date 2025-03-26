import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';

const WishList = () => {
  return (
    <SafeAreaView>
      <CustomHeader title={'Wishlist'} />
      <ScrollView>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishList;

const styles = StyleSheet.create({});
