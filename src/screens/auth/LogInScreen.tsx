import {
  View,
  Text,
  Alert,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../utils/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logIn} from '../../backend/fireBaseConfig';

const LogInScreen = ({navigation}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
  });

  const handleLogIn = async () => {
    if (formValues.name == '' || formValues.password == '') {
      Alert.alert('Error', "Email or Password can't be Empty !");
    } else {
      try {
        await logIn(formValues.name, formValues.password);
        Alert.alert('Success', `LogIn Successfully!`);
        setFormValues({
          name: '',
          password: '',
        });
        navigation.replace('Tab');
      } catch (err) {
        Alert.alert('Error', 'Invalid Credentials');
        console.log(err);
      }
    }
  };

  const newAccountFunc = () =>{
    navigation.navigate('SignUpScreen')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back !</Text>
        <FormField
          title={'Username'}
          value={formValues.name}
          placeholder={'Enter Username or Email '}
          handleChangeText={e => setFormValues({...formValues, name: e})}
          otherStyles={{paddingHorizontal: '5%'}}
        />
        <FormField
          title={'Password'}
          value={formValues.password}
          placeholder={'Enter Password'}
          handleChangeText={e => setFormValues({...formValues, password: e})}
          otherStyles={{paddingHorizontal: '5%'}}
        />
        <CustomButton
          buttonName={'Log In'}
          handleFunc={handleLogIn}
          containerStyles={{
            backgroundColor: '#2E8BF2',
            borderRadius: 12,
            width: '90%',
          }}
          textStyles={{color: colors.primaryWhite}}
        />
        <View style={styles.newAccountContainer}>
          <Text style={styles.newAccountText}>Create a new Account</Text>
          <TouchableOpacity onPress={newAccountFunc}>
            <Text style={styles.signUpText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  newAccountContainer:{
    flexDirection:'row',
    gap:10,
    justifyContent:'center',
  },
  newAccountText:{
    fontSize:16,
  },
  signUpText:{
    fontSize:16,
    color:colors.primaryBlue,
  }
});
export default LogInScreen;
