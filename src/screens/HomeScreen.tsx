import React, {useEffect, useState} from 'react';
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
import FilterScrollView from '../components/FilterScrollView';

const products = [
  {
    id: 3,
    name: 'Black Leather Jacket',
    brand: 'Allen Solly',
    price: '₹ 800',
    description:
      'A classic staple for colder days, this rich brown woolen jacket combines warmth with refined style. Made from high-quality wool, it provides excellent insulation while maintaining breathability.',
    image: require('../../assets/images/Jacket/Jacket3.jpg'),
  },
  {
    id: 1,
    name: 'Black Leather Jacket',
    brand: 'Puma',
    price: '₹ 600',
    description:
      'Crafted from premium genuine leather, this jacket offers a smooth texture, durability, and a perfect fit. Featuring a zippered front, classic lapel collar, and snug cuffs.',
    image: require('../../assets/images/Jacket/Jacket1.jpg'),
  },
  {
    id: 2,
    name: 'White WoolenJacket',
    brand: 'H & M',
    price: '₹ 1000',
    description:
      'The minimalist design, structured fit, and button-up front make it a perfect blend of sophistication and warmth. Whether paired with jeans or a dress, this jacket exudes effortless charm and winter elegance.',
    image: require('../../assets/images/Jacket/Jacket2.jpg'),
  },
];

const ProductCard = ({product, addItem, isInWishList,deleteItem}) => {
  return (
    <View style={productCardStyles.container}>
      <View style={productCardStyles.heartContainer}>
        {isInWishList(product) ? (
          <TouchableOpacity
            onPress={() => deleteItem(product.id)}
            style={{padding: 5}}>
            <Icon name="heart" size={24} color={'red'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => addItem(product)}
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
  const [searchValue, setSearchValue] = React.useState('');
  const category = ['All', 'Jacket', 'Shirt', 'Trouser', 'Hoodie'];
  const [wishListItems, setWishListItems] = useState<typeof products>([]);

  useEffect(() => {
    console.log(wishListItems);
  }, [wishListItems]);

  const addItem = item => {
    if (!isInWishList(item)) setWishListItems(prev => [...prev, item]);
    Alert.alert('Done', 'Product has been Added!');
  };

  const deleteItem = itemId => {
    setWishListItems(currentItems =>
      currentItems.filter(item => item.id !== itemId),
    );
    Alert.alert("Done","Item Deleted from the wishlist")
  };

  const isInWishList = product => {
    return wishListItems.some(item => item.id === product.id);
  };

  return (
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
        <TouchableOpacity style={styles.filterContainer}>
          <Icon name="filter" size={26} />
        </TouchableOpacity>
      </View>

      {/* Horizontal ScrollView for Category */}

      <View>
        <FilterScrollView title={'Categories'} data={category} />
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
          />
        )}
        scrollEnabled={false}
      />
    </ScrollView>
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
