import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
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
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather'


interface Product {
  id: Number;
  name: string;
  brand: string;
  price: Number;
  category: string;
  type: string;
  sizeAvailable:Array<string>;
  colorAvailable:Array<string>;
  description: string;
  image: ImageSourcePropType;
}


const ProductDetailsScreen = ({route,navigation}) => {
  const {product} = route.params;

  useEffect(()=>{
   console.log(product);
  },)

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Product Details'} backFunc={()=> navigation.goBack()}/>
      <ScrollView>
        <View>
          <Image
            source={product.image}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 2.5,
            }}
            resizeMode="contain"
          />
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
        <View style={styles.colorSizeContainer}>
          <View>
            <Text style={styles.header}> Color</Text>
            <FlatList
              horizontal
              data={product.colorAvailable}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    {
                      borderColor: item,
                      backgroundColor: item,
                    },
                    styles.colorBox,
                  ]} onPress={()=>setSelectedColor(item)}>{selectedColor == item && <Icon name='check' color={colors.primaryGrey} size={30}/>}</TouchableOpacity>
              )}
            />
          </View>
          <View>
            <Text style={styles.header}>Size</Text>
            <FlatList
              horizontal
              data={product.sizeAvailable}
              contentContainerStyle={{flexWrap:'wrap'}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.sizeBox,
                    selectedSize == item && styles.selectedSizeContainer,
                  ]}
                  onPress={() => setSelectedSize(item)}>
                  <Text style={selectedSize == item && styles.selectedSizeText}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <CustomButton
          buttonName={'Add to Cart'}
          handleFunc={undefined}
          containerStyles={{
            backgroundColor: 'black',
            marginVertical: 20,
            width: '70%',
          }}
          textStyles={{color: 'white'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 16,
    letterSpacing: 3,
    marginVertical: 20,
    textAlign: 'center',
  },
  container: {
    marginBottom: 0,
  },
  header: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: '600',
    letterSpacing: 3,
  },
  colorSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorBox: {
    borderWidth: 1,
    height: 40,
    width: 40,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    height: 40,
    width: 40,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSizeContainer: {
    backgroundColor: 'black',
  },
  selectedSizeText: {
    color: 'white',
  },
});
