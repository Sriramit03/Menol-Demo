import {
  Alert,
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
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../utils/theme';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Feather';
import {useGlobalContext} from '../context/GlobalProvider';
import {addToCart} from '../firebase/cartConfig';

interface Product {
  id: Number;
  name: string;
  brand: string;
  price: Number;
  category: string;
  type: string;
  sizeAvailable: Array<string>;
  colorAvailable: Array<string>;
  description: string;
  image: ImageSourcePropType;
}

const ProductDetailsScreen = ({route, navigation}) => {
  const {product} = route.params;
  const screenWidth = Dimensions.get('window').width;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const {user} = useGlobalContext();

  const handleCartAddition = async productId => {
    const res = await addToCart(productId, user);
    if (res) {
      Alert.alert('Done', 'Item Successfully Added to Cart !');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={'Product Details'}
        backFunc={() => navigation.goBack()}
      />
      <ScrollView style={{marginBottom: 100}}>
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
          <View style={{width: screenWidth / 2.5}}>
            <Text style={styles.header}> Color</Text>
            <View style={[styles.insideContainer]}>
              {product.colorAvailable.map((item, index) => (
                <TouchableOpacity
                  style={[
                    {
                      borderColor: item,
                      backgroundColor: item,
                    },
                    styles.colorBox,
                  ]}
                  key={item}
                  onPress={() => setSelectedColor(item)}>
                  {selectedColor == item && (
                    <Icon name="check" color={colors.primaryGrey} size={30} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{width: screenWidth / 2.5}}>
            <Text style={styles.header}>Size</Text>
            <View style={[styles.insideContainer]}>
              {product.sizeAvailable.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeBox,
                    selectedSize === item && styles.selectedSizeContainer,
                  ]}
                  onPress={() => setSelectedSize(item)}>
                  <Text
                    style={selectedSize === item && styles.selectedSizeText}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.buttonOuterContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleCartAddition(product.id)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  insideContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorBox: {
    borderWidth: 1,
    height: 40,
    width: 40,
    marginHorizontal: 4,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    height: 40,
    width: 40,
    marginHorizontal: 4,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSizeContainer: {
    backgroundColor: 'black',
  },
  selectedSizeText: {
    color: 'white',
  },
  buttonContainer: {
    width: '70%',
    padding: 15,
    marginVertical: 20,
    backgroundColor: colors.primaryBlack,
  },
  buttonOuterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primaryWhite,
    textAlign: 'center',
  },
});
