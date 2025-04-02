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
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../utils/theme';
import Icon from 'react-native-vector-icons/Feather';
import {getWishlist, removeFromWishlist} from '../firebase/wishListConfig';
import {products} from '../utils/products';
import {useGlobalContext} from '../context/GlobalProvider';

interface Product {
  id: Number;
  name: String;
  brand: String;
  price: String;
  description: String;
  image: ImageSourcePropType;
}

const WishListProductCard = ({
  product,
  removeFunc,
}: {
  product: Product;
  removeFunc: Function;
}) => {
  return (
    <View style={productStyles.container}>
      <View
        style={{flexDirection: 'row', justifyContent: 'flex-end', width: 200}}>
        <TouchableOpacity
          style={productStyles.cancelContainer}
          onPress={() => removeFunc(product.id)}>
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
  const {user} = useGlobalContext();
  const [wishListProducts, setWishListProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getWishListProducts();
    console.log(wishListProducts);
  }, []);

  const getWishListProducts = async () => {
    setRefreshing(true);
    const wishListIds = await getWishlist(user);
    setWishListProducts(
      products.filter(product => wishListIds.includes(product.id)),
    );
    setRefreshing(false);
  };

  const deleteFromWishList = async (productId: Number) => {
    console.log('Delete Function Called!');
    await removeFromWishlist(productId, user);
    setWishListProducts(prev =>
      prev.filter(product => product.id != productId),
    );
    console.log('after deletion WIshList', wishListProducts);
  };

  return (
    <SafeAreaView>
      <CustomHeader title={'Wishlist'} />
      <Text style={styles.context}>See your favorite products here</Text>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getWishListProducts}
            colors={[colors.primaryBlack]}
          />
        }>
        <FlatList
          data={wishListProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <WishListProductCard
              product={item}
              removeFunc={deleteFromWishList}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>
                No Items Present in WishList !
              </Text>
            </View>
          }
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
    paddingTop:30,
  },
  context: {
    textAlign: 'center',
    letterSpacing: 3,
  },
  emptyListContainer:{
    marginHorizontal:'5%',
    justifyContent:'center',
    alignItems:'center',
    height:Dimensions.get('window').height/2,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 3,
    marginVertical: 10,
    fontWeight: '700',
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
