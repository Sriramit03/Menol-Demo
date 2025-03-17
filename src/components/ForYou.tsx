import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const image1 = require('../../assets/images/ForYou/Image1.jpg');
const image2 = require('../../assets/images/ForYou/Image2.jpg');
const image3 = require('../../assets/images/ForYou/Image3.jpg');
const image4 = require('../../assets/images/ForYou/Image4.jpg');

const ForYou = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>For You</Text>
      <View style={styles.rowContainer}>
        <View>
          <Image source={image1} style={styles.imageStyle} resizeMode="cover" />
          <Text style={styles.textLight}>Top rated</Text>
          <Text style={styles.textDark}>Upto 90% Off</Text>
        </View>
        <View>
          <Image source={image2} style={styles.imageStyle} resizeMode="cover" />
          <Text style={styles.textLight}>Grab Now</Text>
          <Text style={styles.textDark}>Only ₹ 299</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View>
          <Image source={image3} style={styles.imageStyle} resizeMode="cover" />
          <Text style={styles.textLight}>Today only</Text>
          <Text style={styles.textDark}>Only ₹ 599</Text>
        </View>
        <View>
          <Image source={image4} style={styles.imageStyle} resizeMode="cover" />
          <Text style={styles.textLight}>Top Rated</Text>
          <Text style={styles.textDark}>Upto 40% Off</Text>
        </View>
      </View>
    </View>
  );
};

export default ForYou;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding:20,
    backgroundColor: '#005859',
    borderRadius: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dcdcdc',
  },
  imageStyle: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  textLight: {
    color: '#989898',
    paddingVertical: 5,
  },
  textDark: {
    color: '#efefef',
    fontWeight: 'bold',
  },
  rowContainer: {
    marginTop:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
