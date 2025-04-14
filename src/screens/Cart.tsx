import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../components/CustomHeader';
import {Products} from '../utils/products';
import {colors} from '../utils/theme';
import {getCartItems, removeFromCart} from '../firebase/cartConfig';
import {useGlobalContext} from '../context/GlobalProvider';

interface Product {
  id: Number;
  name: string;
  brand: string;
  price: Number;
  category: string;
  type: string;
  description: string;
  image: ImageSourcePropType;
}

const CartProductCard = ({product, navigateFunc, deleteFunc}) => {
  return (
    <View>
      <TouchableOpacity
        style={cardStyles.container}
        onPress={() => navigateFunc(product)}>
        <View style={cardStyles.imageTextContainer}>
          <Image source={product.image} style={cardStyles.image} />
          <View>
            <Text style={cardStyles.normalText}>{product.name}</Text>
            <Text style={cardStyles.priceText}>₹ {product.price}</Text>
            {product.price >= 500 && (
              <Text style={cardStyles.text}>Eligible for FREE Shipping</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={cardStyles.buttonContainer}>
        <TouchableOpacity
          style={cardStyles.button}
          onPress={() => deleteFunc(product.id)}>
          <Text style={cardStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={cardStyles.button}>
          <Text style={cardStyles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = ({navigation}) => {
  const {user} = useGlobalContext();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, []);

  const getCartProducts = async () => {
    setRefreshing(true);
    const cartIds = await getCartItems(user);
    setCartProducts(Products.filter(product => cartIds.includes(product.id)));
    setRefreshing(false);
  };

  const deleteCartProduct = async productId => {
    await removeFromCart(productId, user);
    setCartProducts(prev => prev.filter(product => product.id != productId));
  };

  const navigateToProductDetails = (product: any) => {
    navigation.navigate('ProductDetails', {
      product: product,
    });
  };

  return (
    <>
      <CustomHeader title={'My Cart'} backFunc={() => navigation.goBack()} />
      <Text style={styles.context}>See your cart products here</Text>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getCartProducts}
            colors={[colors.primaryBlack]}
          />
        }>
        <FlatList
          data={cartProducts}
          renderItem={({item}) => (
            <CartProductCard
              product={item}
              navigateFunc={navigateToProductDetails}
              deleteFunc={deleteCartProduct}
            />
          )}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>
                No Items Present in Cart !
              </Text>
            </View>
          }
        />
      </ScrollView>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginBottom: 80,
  },
  context: {
    textAlign: 'center',
    letterSpacing: 3,
  },
  emptyListContainer: {
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 2,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 3,
    marginVertical: 10,
    fontWeight: '700',
  },
});

const cardStyles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  image: {
    width: 120,
    height: 150,
  },
  normalText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 3,
    color: colors.primaryBlack,
  },
  text: {},
  priceText: {
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: colors.primaryBlack,
    minWidth: 100,
  },
  buttonText: {
    color: colors.primaryWhite,
    textAlign: 'center',
    letterSpacing: 3,
  },
});
