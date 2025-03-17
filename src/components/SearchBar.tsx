import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/theme';
import {icons} from '../utils/icons';

const SearchBar = () => {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <View style={styles.searchContainer}>
      <View>
        <TextInput
          placeholder="Search Tshirt, Trousers etc"
          value={searchValue}
          style={styles.searchInput}
          placeholderTextColor={'#666'}
          onChange={e => setSearchValue(e)}
        />
      </View>
      <View>
        <TouchableOpacity onPress={undefined}>
          <Image source={icons.search} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 16,
    color: colors.primaryGreen,
  },
  searchContainer: {
    width:270,
    borderColor: '#b0b0b0',
    borderWidth: 2,
    borderRadius: 30,
    flexDirection: 'row',
    gap:20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
});
