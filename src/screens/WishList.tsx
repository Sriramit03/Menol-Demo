import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../utils/theme';
import Icon from 'react-native-vector-icons/Feather';

const products = [
  {
    id: 3,
    name: 'Long Jacket',
    brand: 'Allen Solly',
    price: '₹ 800',
    description:
      'Stay stylish and cozy with this long jacket, designed for maximum warmth and elegance. Its tailored fit and high-quality material make it a perfect companion for chilly days.',
    image: require('../../assets/images/wishList/long-jacket.jpg'),
  },
  {
    id: 1,
    name: 'Linen Shirt',
    brand: 'Puma',
    price: '₹ 600',
    description:
      'Made from breathable and lightweight linen, this shirt is perfect for warm weather. Its relaxed fit and classic button-down style make it a versatile choice for any occasion.',
    image: require('../../assets/images/wishList/shirt.jpg'),
  },
  {
    id: 2,
    name: 'Winter Polo',
    brand: 'H & M',
    price: '₹ 1000',
    description:
      'A refined polo shirt designed for the winter season, featuring soft wool-blend fabric for extra warmth. Its sleek and minimalistic design pairs effortlessly with both casual and formal outfits.',
    image: require('../../assets/images/wishList/polo1.jpg'),
  },
  {
    id: 4,
    name: 'Casual Polo',
    brand: 'Nike',
    price: '₹ 750',
    description:
      'A must-have for every wardrobe, this casual polo shirt offers comfort and style in equal measure. Made from premium cotton, it ensures breathability and a relaxed fit for all-day wear.',
    image: require('../../assets/images/wishList/polo2.jpg'),
  },
];

const WishListProductCard = ({product}) => {
  return (
    <View style={productStyles.container}>
      <View
        style={{flexDirection: 'row', justifyContent: 'flex-end', width: 200}}>
        <TouchableOpacity style={productStyles.cancelContainer}>
          <Icon name="x" size={24} />
        </TouchableOpacity>
      </View>
      <Image
        source={product.image}
        style={productStyles.image}
        resizeMode="cover"
      />
      <TouchableOpacity style={productStyles.textContainer}>
        <Text style={productStyles.text}>{product.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const WishList = () => {
  return (
    <SafeAreaView>
      <CustomHeader title={'Wishlist'} />
      <Text style={styles.context}>See your favorite products here</Text>
      <ScrollView style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <WishListProductCard product={item} />}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
  },
  context: {
    textAlign: 'center',
    letterSpacing: 3,
  },
});

const productStyles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  cancelContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    borderRadius: 25,
    backgroundColor: colors.primaryWhite,
    top: 20,
    left: 10,
    zIndex: 999,
  },
  image: {
    width: 200,
    height: 300,
  },
  textContainer: {
    backgroundColor: colors.primaryBlack,
    width: 200,
    padding: 10,
    marginVertical: 5,
  },
  text: {
    color: colors.primaryWhite,
    textAlign: 'center',
    letterSpacing: 3,
    fontSize: 20,
  },
});
