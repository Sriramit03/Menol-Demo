import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomButton = ({
  buttonName,
  handleFunc,
  containerStyles,
  textStyles,
}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[styles.buttonContainer, containerStyles]}
        onPress={handleFunc}>
        <Text style={[styles.buttonText, textStyles]}>{buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    minWidth: 100,
    padding: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
