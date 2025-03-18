import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {icons} from '../utils/icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/theme';
import FilterScrollView from './FilterScrollView';
import Slider from '@react-native-community/slider';

const Filter = () => {
  const [price, setPrice] = useState(0);

  const Brand = ['All', 'Nike', 'Adidas', 'H&M', 'Raymond', 'Allen Solly'];

  const Product = [
    'Shirt',
    'T-Shirt',
    'Trousers',
    'Shorts',
    'Sneakers',
    'Sunglasses',
    'Track Pants',
  ];

  const Type = ['Casual', 'Oversized', 'Party', 'Formal'];

  const sortBy = [
    'Recent',
    'Popular',
    'Price (highest first)',
    'Price (lowest price)',
    'Ratings',
  ];
  return (
    <SafeAreaView style={{height: 'auto'}}>
      <View style={[styles.headerContainer]}>
        <TouchableOpacity style={styles.headerIconContainer}>
          <Image source={icons.leftArrow} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={[styles.textContainer]}>
          <Text style={styles.headerText}>Filter</Text>
        </View>
      </View>
      <ScrollView style={styles.filterContainer}>
        <FilterScrollView title={'Brands'} data={Brand} />
        <FilterScrollView title={'Products'} data={Product} />
        <FilterScrollView title={'Sort by'} data={sortBy} />
        <View>
          <Text style={styles.Label}>Price Range</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.price}>{price}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={10}
              value={price}
              minimumTrackTintColor={colors.primaryBlue}
              maximumTrackTintColor="#676767"
              thumbTintColor="#007AFF"
              onValueChange={value => setPrice(value)}
            />
          </View>
        </View>

        <View style={{paddingBottom: 15}}>
          <Text style={styles.Label}>Reviews</Text>
          <View style={styles.reviewContainer}>
            <TouchableOpacity style={styles.review}>
              <Text style ={styles.buttonText}>Above 4.5</Text>
              <Image source={icons.star} style={styles.reviewIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.review}>
              <Text>Above 3.5</Text>
              <Image source={icons.star} style={styles.reviewIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.bottomButtons}>
            <Text>Reset Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomButtons,styles.applyButton]}>
            <Text style={{color:colors.primaryWhite}}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.primaryGrey,
  },
  textContainer: {
    marginLeft: 100,
  },
  headerIcon: {
    height: 24,
    width: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingHorizontal: 15,
  },
  Label: {
    fontSize: 20,
    fontWeight: '600',
  },
  sliderContainer: {
    gap: 10,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 15,
  },
  slider: {
    width: 320,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 15,
  },
  buttonText:{
   fontSize:16,
  },
  reviewContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  review: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    borderRadius: 30,
  },
  reviewIcon: {
    width: 20,
    height: 20,
  },
  bottomButtonsContainer: {
    paddingVertical:15,
    borderTopWidth: 1,
    borderColor: colors.primaryGrey,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    paddingBottom:200
  },
  bottomButtons: {
    alignItems:'center',
    width:100,
    padding:10,
    borderWidth:1,
    borderColor:colors.primaryGrey,
    borderRadius:25,
  },
  applyButton:{
    backgroundColor:colors.primaryBlue,
  }
});
