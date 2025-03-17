import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { colors } from '../utils/theme'

const ItemCard = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={item.imageUrl} style={styles.image} resizeMode='cover'/>
      <Text style={styles.brandText}>{item.brand}</Text>
      <Text style={styles.priceText}>{item.price}</Text>
    </View>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  cardContainer:{
    marginRight:6,
    marginBottom:10
  },
  image:{
    height:300,
    width:180,
    borderRadius:5,
  },
  brandText:{
   padding:4,
   color:colors.primaryGreen,
   fontWeight:'heavy',
  },
  priceText:{
    paddingLeft:4,
  }
})