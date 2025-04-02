import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {icons} from '../utils/icons';
import {colors} from '../utils/theme';
import Icon from 'react-native-vector-icons/Feather'

const CustomHeader = ({title,backFunc}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.imageContainer} onPress={()=>backFunc()}>
        <Icon name='arrow-left' size={24}/>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    width: 22,
    height: 22,
  },
  imageContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.primaryGrey,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing:2.5,
  },
});
