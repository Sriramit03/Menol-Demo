import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/theme';
import {icons} from '../utils/icons';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import { product } from '../utils/SampleData';

const MarketPlaceScreen = () => {
  const categories = ['Brand', 'Category'];
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={{marginRight: 10}}>
            <TouchableOpacity>
              <Image source={icons.leftArrow} style={styles.headerIcons} />
            </TouchableOpacity>
          </View>
          <SearchBar />
        </View>
        <View>
          <Image source={icons.cart} style={styles.headerIcons} />
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Categories filter Scroll View */}

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollView}>
            {categories.map((item, index) => (
              <View style={styles.categoryContainer} key={index}>
                <TouchableOpacity style={styles.category}>
                  <Text style={styles.categoryText}>{item}</Text>
                  <Image
                    source={icons.downArrow}
                    style={styles.categoryIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Product List */}
        
        <FlatList
          data={product}
          renderItem={({item}) => <ItemCard item={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // To create a grid
          contentContainerStyle={styles.productContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </>
  );
};

export default MarketPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.primaryWhite,
    marginHorizontal: 10,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: colors.primaryWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcons: {
    width: 26,
    height: 26,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterScrollView: {
    gap: 20,
  },
  categoryContainer: {
    borderColor: '#888888',
    borderWidth: 1,
    borderRadius: 30,
    padding: 8,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
  categoryIcon: {
    width: 22,
    height: 22,
  },
  productContainer:{
    marginTop:20,
    marginBottom:100,
  }
});
