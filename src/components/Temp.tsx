import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const outfits = [
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

const Temp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {outfits.map((outfit) => (
          <TouchableOpacity key={outfit.id} style={styles.card}>
            <Image source={outfit.image} style={styles.image} />
            <Text style={styles.label}>{outfit.outfitType}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Centered using Flex */}
      <View style={styles.plusContainer}>
        <TouchableOpacity style={styles.plusButton}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '75%',
    borderRadius: 12,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  plusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Temp;
