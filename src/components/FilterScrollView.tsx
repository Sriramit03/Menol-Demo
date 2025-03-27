import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/theme';

const FilterScrollView = ({title, data}) => {
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollView}>
        {data.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.categoryContainer,
              selectedItem === item && styles.selectedCategoryContainer,
            ]}
            key={index}
            onPress={() => setSelectedItem(item)}>
            <Text
              style={[
                styles.categoryText,
                selectedItem === item && styles.selectedCategoryText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterScrollView;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing:3,
  },
  filterScrollView: {
    marginVertical: 15,
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
    fontSize: 16,
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
