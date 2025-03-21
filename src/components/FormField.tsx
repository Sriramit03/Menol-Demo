import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import { colors } from '../utils/theme';

const FormField = ({title, value, placeholder, handleChangeText,otherStyles}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[otherStyles,styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textFieldContainer}>
        <TextInput
        style={styles.textField}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          
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
  title:{
    fontSize:16,
    fontWeight:'500',
    paddingBottom:8,
  },  
  textFieldContainer: {
    borderColor:colors.primaryGrey,
    borderWidth:2,
    padding:5,
    borderRadius:8,
  },
  textField:{
    color:colors.primaryGreen,
    fontSize:16,
  }
});
