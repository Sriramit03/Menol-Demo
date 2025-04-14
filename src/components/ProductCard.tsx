import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../utils/theme';

const ProductCard = ({item}) => {
  return (
    <View style={cardStyles.productContainer}>
      <Image source={item.image} style={cardStyles.productImage} resizeMode='cover'/>
      <View style={cardStyles.textContainer}>
        <Text style={cardStyles.outfitType}>{item.outfitType}</Text>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  productContainer: {
    flex:1,
    marginHorizontal:'2%',
    borderWidth: 1,
    borderColor:colors.primaryGrey,
    borderRadius: 16,
    padding: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  productImage: {
    width:'100%',
    height:160,
    borderRadius:25,
  },
  textContainer: {
    minWidth:140,
    marginVertical: 15,
    padding: 10,
    backgroundColor: colors.primaryBlue,
    borderRadius: 25,
  },
  outfitType: {
    textAlign:'center',
    fontSize: 16,
    color: colors.primaryWhite,
  },
});

export default ProductCard;
