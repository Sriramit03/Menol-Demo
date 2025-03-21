import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from '../utils/theme';
import {icons} from '../utils/icons';
import ProductCard from '../components/ProductCard';

const Wardrobe = () => {
  const products = [
    {
      id: 1,
      outfitType: 'Everyday Outfit',
      image: require('../../assets/images/wardrobeproduct/Media1.png'),
    },
    {
      id: 2,
      outfitType: 'Party Outfit',
      image: require('../../assets/images/wardrobeproduct/Media2.png'),
    },
    {
      id: 3,
      outfitType: 'Weekend Outfit',
      image: require('../../assets/images/wardrobeproduct/Media3.png'),
    },
    {
      id: 4,
      outfitType: 'Office Output',
      image: require('../../assets/images/wardrobeproduct/Media4.png'),
    },
  ];
  const perfumes = [
    {
      id: 1,
      name: 'Armani',
      image: require('../../assets/images/Perfumes/Media1.jpeg'),
    },
    {
      id: 2,
      name: 'Duoma',
      image: require('../../assets/images/Perfumes/Media2.jpeg'),
    },
    {
      id: 3,
      name: 'Dolce',
      image: require('../../assets/images/Perfumes/Media3.jpeg'),
    },
    {
      id: 4,
      name: 'Mandarava',
      image: require('../../assets/images/Perfumes/Media4.jpeg'),
    },
    {
      id: 5,
      name: 'Armani',
      image: require('../../assets/images/Perfumes/Media1.jpeg'),
    },
    {
      id: 6,
      name: 'Duoma',
      image: require('../../assets/images/Perfumes/Media2.jpeg'),
    },
    {
      id: 7,
      name: 'Dolce',
      image: require('../../assets/images/Perfumes/Media3.jpeg'),
    },
    {
      id: 8,
      name: 'Mandarava',
      image: require('../../assets/images/Perfumes/Media4.jpeg'),
    },
    {
      id: 9,
      name: 'Duoma',
      image: require('../../assets/images/Perfumes/Media2.jpeg'),
    },
    {
      id: 10,
      name: 'Dolce',
      image: require('../../assets/images/Perfumes/Media3.jpeg'),
    },
    {
      id: 11,
      name: 'Mandarava',
      image: require('../../assets/images/Perfumes/Media4.jpeg'),
    },
    {
      id: 12,
      name: 'Duoma',
      image: require('../../assets/images/Perfumes/Media2.jpeg'),
    },
    {
      id: 13,
      name: 'Dolce',
      image: require('../../assets/images/Perfumes/Media3.jpeg'),
    },
    {
      id: 14,
      name: 'Mandarava',
      image: require('../../assets/images/Perfumes/Media4.jpeg'),
    },
  ];

  return (
    <SafeAreaProvider>
      <View style={[styles.headerContainer]}>
        <TouchableOpacity style={styles.headerIconContainer}>
          <Image source={icons.leftArrow} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={[styles.textContainer]}>
          <Text style={styles.headerText}>Wardrobe</Text>
        </View>
      </View>

      <ScrollView style={{marginBottom:100}}>
        <View style={styles.bodyContainer}>
          <View style={styles.plusButtonContainer}>
            <TouchableOpacity style={styles.plusButton}>
              <Image
                source={icons.plus}
                style={styles.headerIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productsContainer}>
            <FlatList
              data={products}
              renderItem={({item}) => <ProductCard item={item} />}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomHeader}>Perfume</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {perfumes.map(item => (
              <TouchableOpacity key={item.id.toString()} style={styles.perfumeContainer}>
                <Image source={item.image} style={styles.perfumeImage} resizeMode='stretch' />
                <Text style={styles.perfumeText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Wardrobe;

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

  bodyContainer: {
    flex: 1,
    padding: 15,
  },
  productsContainer: {

  },
  plusButtonContainer: {
    left: '48%',
    position: 'absolute',
    zIndex: 20,
    top: '47.2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    padding: 10,
    borderRadius: 25,
    backgroundColor: colors.primaryBlue,
  },

  bottomContainer: {
  },
  bottomHeader: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  perfumeImage:{
    width: 170,
    height:200,
    borderRadius:25

  },
  perfumeContainer:{
    marginLeft:20,
    borderRadius:30,
    alignItems:'center',
    marginVertical:20,
  },
  perfumeText:{
     paddingVertical:10,
     fontSize:16,
     fontWeight:'600'
  }
});
