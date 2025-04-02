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
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {products} from '../utils/products';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../firebase/wishListConfig';
import {useGlobalContext} from '../context/GlobalProvider';
import Filter from '../components/Filter';



const ProductCard = ({
  product,
  addItem,
  isInWishList,
  deleteItem,
}: {
  product: any;
  addItem: Function;
  isInWishList: Function;
  deleteItem: Function;
}) => {
  return (
    <View style={productCardStyles.container}>
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
    </View>
  );
};

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const category = ['All', 'Jacket', 'Shirt', 'Trouser', 'Hoodie'];
  const [wishListItems, setWishListItems] = useState<Number[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_FILTER':
        console.log("Entered Into Dispatch Function! ");
        return{
          ... state,
          brand:'Nike'
        }
  
      case 'RESET_FILTERS':
  
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    brand: 'All',
    category: 'All',
    sortBy: '',
    price: 0,
  });
  const {user} = useGlobalContext();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    getWishListItems();
  }, []);




  const getWishListItems = async () => {
    setWishListItems(await getWishlist(user));
  };

  const addItem = async (productId: Number) => {
    if (!isInWishList(productId)) {
      const res = await addToWishlist(productId, user);
      if (res) {
        setWishListItems(prev => [...prev, productId]);
        Alert.alert('Done', 'Product has been Added!');
      }
    }
  };

  const deleteItem = async (itemId: Number) => {
    console.log('In delete!');
    await removeFromWishlist(itemId, user);
    console.log('After Calling removeFromWIshlist');
    setWishListItems(currentItems =>
      currentItems.filter(item => item !== itemId),
    );
    Alert.alert('Done', 'Item Deleted from the wishlist');
  };
  ``;

  const isInWishList = (productId: Number) => {
    return wishListItems.some(item => item === productId);
  };

  return !filterVisible ? (
    /* Outer Container for Home Screen */
    <ScrollView style={styles.container}>
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

      {/*       <View>
        <FilterScrollView title={'Categories'} data={category} />
      </View> */}

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            addItem={addItem}
            isInWishList={isInWishList}
            deleteItem={deleteItem}
          />
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  ) : (
    <Filter
        filterVisibleFunc={setFilterVisible} state={state} dispatch={dispatch}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 100,
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
