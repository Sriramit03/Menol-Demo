import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {colors} from '../utils/theme';
import {fonts} from '../utils/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Products} from '../utils/products';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../firebase/wishListConfig';
import {useGlobalContext} from '../context/GlobalProvider';
import Filter, {FilterScrollView} from '../components/Filter';

const ProductCard = ({
  product,
  addItem,
  isInWishList,
  deleteItem,
  navigationFunc,
}: {
  product: any;
  addItem: Function;
  isInWishList: Function;
  deleteItem: Function;
  navigationFunc: Function;
}) => {
  return (
    <TouchableOpacity
      style={productCardStyles.container}
      onPress={() => navigationFunc(product)}>
      <View style={productCardStyles.heartContainer}>
        {isInWishList(product.id) ? (
          <TouchableOpacity
            onPress={() => deleteItem(product.id)}
            style={{padding: 5}}>
            <Icon2 name="heart" size={24} color={'red'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => addItem(product.id)}
            style={{padding: 5}}>
            <Icon name="heart" color={colors.primaryGrey} size={24} />
          </TouchableOpacity>
        )}
      </View>
      <Image
        source={product.image}
        style={productCardStyles.image}
        resizeMode="cover"
      />
      <Text style={productCardStyles.name}>{product.name}</Text>
      <Text style={productCardStyles.description}>{product.description}</Text>
    </TouchableOpacity>
  );
};

const App = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState(Products);
  const category = ['All', 'Jacket', 'Shirt', 'Trouser', 'Hoodie'];
  const [wishListItems, setWishListItems] = useState<Number[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const {user} = useGlobalContext();
  const insets = useSafeAreaInsets();
  const intialState = {
    brand: 'All',
    category: 'All',
    type: '',
    sortBy: '',
    price: 0,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_FILTER':
        if (state[action.payload.type] === action.payload.value) {
          return {...state, [action.payload.type]: ''};
        }
        return {
          ...state,
          [action.payload.type]: action.payload.value,
        };
      case 'RESET_FILTERS':
        setProducts(Products);
        return intialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    const filters = state;
    let filteredProducts = Products;
    if (filters.category && filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(
        item => item.category === filters.category,
      );
    }
    console.log('After Category Update ! ', filteredProducts);
    setProducts(filteredProducts);
  }, [state.category]);

  useEffect(() => {
    getWishListItems();
  }, []);

  /* Navigation function to Product Details Screen */
  const navigateToProductDetails = (product: any) => {
    navigation.navigate('ProductDetails', {
      product: product,
    });
  };

  /* To Get WishList Items and assign it to setWishListItems state */

  const getWishListItems = async () => {
    setWishListItems(await getWishlist(user));
  };

  /* Add Items to wishlist both in local state and firebase */
  const addItem = async (productId: Number) => {
    if (!isInWishList(productId)) {
      const res = await addToWishlist(productId, user);
      if (res) {
        setWishListItems(prev => [...prev, productId]);
        Alert.alert('Done', 'Product has been Added!');
      }
    }
  };

  /* Delete Items from the Wishlist both in local state and firebase */
  const deleteItem = async (itemId: Number) => {
    console.log('In delete!');
    await removeFromWishlist(itemId, user);
    console.log('After Calling removeFromWishlist');
    setWishListItems(currentItems =>
      currentItems.filter(item => item !== itemId),
    );
    Alert.alert('Done', 'Item Deleted from the wishlist');
  };
  ``;

  /* Check If the element present in the wishlist or not */
  const isInWishList = (productId: Number) => {
    return wishListItems.some(item => item === productId);
  };

  /* Filtering function to filter Products based on various criteria */
  /*   const filterProducts = () => {
    const filters = state;
    let filteredProducts = Products;

    if (filters.brand && filters.brand !== 'All') {
      filteredProducts = filteredProducts.filter(
        item => item.brand === filters.brand,
      );
    }

    // Filter by Category
    if (filters.category && filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(
        item => item.category === filters.category,
      );
    }

    // Filter by Type
    if (filters.type && filters.type !== 'All') {
      filteredProducts = filteredProducts.filter(
        item => item.type === filters.type,
      );
    }
    console.log('Filtered Products', filteredProducts);
    setProducts(filteredProducts);
    setFilterVisible(false);
  }; */

  const filterProducts = () => {
    const filters = state;
    let filteredProducts = Products;

    // Iterate through the filters dynamically
    Object.entries(filters).forEach(([key, value]) => {
      // Skip filters with a value of "All" or if the value is undefined
      if (value && value !== 'All') {
        filteredProducts = filteredProducts.filter(item => {
          if (key !== 'price') {
            return item[key] === value;
          } else {
            console.log(key);
            return item['price'] >= value;
          }
        });
      }
    });
    console.log(filteredProducts);
    setProducts(filteredProducts);
    setFilterVisible(false);
  };

  return !filterVisible ? (
    /* Outer Container for Home Screen */
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: insets.bottom + 80}}>
        {/* Hedaer Text with mail icon */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle]}>MENOL</Text>
          <View style={styles.headerOption}>
            <TouchableOpacity onPress={undefined} style={styles.mailContainer}>
              <Icon name="mail" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar with Filter at the End */}

        <View style={styles.searchWithFilter}>
          <View style={styles.searchGrid}>
            <TouchableOpacity onPress={undefined}>
              <Icon name="search" size={26} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              value={searchValue}
              style={styles.searchInput}
              placeholderTextColor={colors.primaryGrey}
              onChange={e => setSearchValue(e)}
            />
          </View>
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => setFilterVisible(true)}>
            <Icon name="filter" size={26} />
          </TouchableOpacity>
        </View>

        {/* Horizontal ScrollView for Category */}

        <View>
          <FilterScrollView
            title={'Categories'}
            data={category}
            value={state.category}
            setValue={dispatch}
            keyValue={'category'}
          />
        </View>

        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              addItem={addItem}
              isInWishList={isInWishList}
              deleteItem={deleteItem}
              navigationFunc={navigateToProductDetails}
            />
          )}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No Products Found !</Text>
            </View>
          }
        />
      </ScrollView>
    </>
  ) : (
    <Filter
      filterVisibleFunc={setFilterVisible}
      state={state}
      dispatch={dispatch}
      filterFunc={filterProducts}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 24,
    letterSpacing: 3,
    color: colors.primaryBlack,
    fontFamily: fonts.gameOfSquids,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerOption: {
    flexDirection: 'row',
    gap: 15,
  },
  mailContainer: {
    padding: 7,
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    borderRadius: 25,
  },

  searchWithFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchGrid: {
    marginVertical: 10,
    borderColor: colors.primaryGrey,
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    gap: 15,
    width: '80%',
  },

  searchInput: {
    fontSize: 16,
    letterSpacing: 3,
    color: colors.primaryGreen,
  },

  filterContainer: {
    padding: 7,
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    borderRadius: 25,
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

const productCardStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  heartContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    top: 40,
    zIndex: 999,
    right: 10,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
  name: {
    textAlign: 'center',
    marginVertical: 8,
    backgroundColor: colors.primaryBlack,
    color: colors.primaryWhite,
    padding: 10,
    letterSpacing: 3,
    fontSize: 20,
    fontWeight: '200',
  },
  description: {
    fontSize: 16,
    letterSpacing: 3,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default App;
