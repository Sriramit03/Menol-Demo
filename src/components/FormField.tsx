import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import { colors } from '../utils/theme';

const FormField = ({ value, placeholder, handleChangeText,otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[otherStyles,styles.container]}>
      <View style={styles.textFieldContainer}>
        <TextInput
        style={styles.textField}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
    container:{
     marginVertical:10,
     
    }, 
  textFieldContainer: {
    minHeight:70,
    borderColor:colors.primaryGrey,
    borderWidth:1,
    paddingHorizontal:20,
    borderRadius:0,
    justifyContent:'center'
  },
  textField:{
    color:'#6d6d6d',
    fontSize:14,
    letterSpacing:3,
  }
});
