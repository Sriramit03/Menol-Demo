import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {icons} from '../utils/icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/theme';
import Slider from '@react-native-community/slider';
import CustomHeader from './CustomHeader';

const Brand = ['All', 'Nike', 'Adidas', 'H&M', 'Raymond', 'Allen Solly'];

const Category = [
  'All',
  'Shirt',
  'T-Shirt',
  'Trousers',
  'Shorts',
  'Sneakers',
  'Sunglasses',
  'Track Pants',
];

const sortBy = [
  'Recent',
  'Popular',
  'Price (highest first)',
  'Price (lowest price)',
  'Ratings',
];


export const FilterScrollView = ({title, data, value, setValue}) => {
  useEffect(()=>{
    console.log(setValue);
  },[])
  return (
    <View style={filterScrollView.container}>
      <Text style={filterScrollView.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={filterScrollView.filterScrollView}>
        {data.map((item, index) => (
          <TouchableOpacity
            style={[
              filterScrollView.categoryContainer,
              value === item && filterScrollView.selectedCategoryContainer,
            ]}
            key={index}
            onPress={() => setValue({type:"SET_FILTER",payload:{'brand':item}})}>
            <Text
              style={[
                filterScrollView.categoryText,
                value === item && filterScrollView.selectedCategoryText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Filter = ({filterVisibleFunc, state,dispatch}) => {
  const [price, setPrice] = useState(0);

  const backButton = () => {
    filterVisibleFunc(false);
  };

  return (
    <SafeAreaView style={{height: 'auto'}}>
      <CustomHeader title={'Filter'} backFunc={backButton} />
      <ScrollView style={styles.filterContainer}>
        <FilterScrollView
          title={'Brands'}
          data={Brand}
          value={state.brand}
          setValue={dispatch} key={"brand"}        />
        <FilterScrollView
          title={'Categories'}
          data={Category}
          value={state.category}
          setValue={dispatch} key={"category"}        />
        <FilterScrollView
          title={'Sort by'}
          data={sortBy}
          value={state.sortBy}
          setValue={dispatch} key={"sortBy"}        />
        <View>
          <Text style={styles.Label}>Price Range</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.price}>{price}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000}
              step={100}
              value={state.price}
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
              <Text style={styles.buttonText}>Above 4.5</Text>
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
            <Text
              style={[styles.bottomButtonText, {color: colors.primaryBlack}]}>
              Reset Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomButtons, styles.applyButton]}>
            <Text style={[styles.bottomButtonText]}>Apply</Text>
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
  buttonText: {
    fontSize: 16,
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
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.primaryGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  bottomButtons: {
    alignItems: 'center',
    minWidth: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    borderRadius: 25,
  },
  bottomButtonText: {
    letterSpacing: 3,
    color: colors.primaryWhite,
  },
  applyButton: {
    backgroundColor: colors.primaryBlack,
  },
});


const filterScrollView = StyleSheet.create({
  container: {
    marginVertical: 10,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing:3,
  },
  filterScrollView: {
    marginVertical: 10,
    gap: 20,
  },
  categoryContainer: {
    borderColor: colors.primaryGrey,
    minWidth: 86,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'medium',
    letterSpacing:3,
  },

  selectedCategoryContainer: {
    backgroundColor:colors.primaryBlack,
    borderColor:colors.primaryBlack
  },

  selectedCategoryText: {
    color: colors.primaryWhite,
  },
});
