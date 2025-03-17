import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {colors} from '../utils/theme';
import {categoryImageArray, imageArray} from '../utils/imageArray';
import ForYou from '../components/ForYou';


const App = () => {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    /* Outer Container for Home Screen */
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menol</Text>
        <View style={styles.headerOption}>
          <TouchableOpacity onPress={undefined}>
            <Image
              source={require('../../assets/icons/wishlist.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={undefined}>
            <Image
              source={require('../../assets/icons/cart.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcomeTitle}>Welcome back,</Text>
      {/* <Text style={styles.userNameTitle}>User Name</Text> */}

      {/* Search Bar with search Icon at the End */}
      <View style={styles.searchContainer}>
        <View>
          <TextInput
            placeholder="Search For casual Tshirt"
            value={searchValue}
            style={styles.searchInput}
            placeholderTextColor={'#666'}
            onChange={e => setSearchValue(e)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={undefined}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal ScrollView for Category */}

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {categoryImageArray.map((item, index) => (
            <TouchableOpacity key={index}>
              <Image
                source={item}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Horizontal ScrollView for Image Slider */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewStyle}>
          {imageArray.map((item, index) => (
            <TouchableOpacity key={index}>
              <Image
                source={item}
                style={{
                  width: 350,
                  height: 200,
                  borderRadius: 10,
                  marginRight: 10,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    
    <Text style={{
      fontSize: 20,
      color: "#00000",
      marginTop: 20,
      fontWeight: 'bold',
    }}>Recommendation</Text>
 
      {/* For You Card */}
      <ForYou />

      <StatusBar backgroundColor={'#f2f1e6'} barStyle={'dark-content'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1e6',
    paddingHorizontal: 15,
    marginBottom:100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primaryGreen,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerOption: {
    flexDirection: 'row',
    gap: 15,
  },
  icon: {
    width: 26,
    height: 26,
  },
  welcomeTitle: {
    fontSize: 20,
    color: '#666',
    marginTop: 10,
  },
  userNameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondaryGreen,
  },
  searchInput: {
    fontSize: 16,
    color: colors.primaryGreen,
  },
  searchContainer: {
    marginTop: 20,
    borderColor: '#b0b0b0',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  scrollViewStyle: {
    top: 0,
  },

  categoryScrollView: {
    marginVertical: 20,
    gap: 55,
  },
});

export default App;
