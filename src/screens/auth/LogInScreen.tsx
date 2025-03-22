import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../utils/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logIn, onGoogleButtonPress} from '../../backend/fireBaseConfig';
import {icons} from '../../utils/icons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LogInScreen = ({navigation}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '347113254469-hm6asjqrj3bu721gnkfd61c06gh86ngi.apps.googleusercontent.com',
    });
  }, []);

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

  const googleLogin = async() =>{
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Success', 'Google Sign-In Successful!');
    } catch (error) {
      Alert.alert('Error', `Google Sign-In Failed! ${error}`);
    }
  }

  const newAccountFunc = () => {
    navigation.navigate('SignUpScreen');
  };
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
        <View style={styles.googleButtonContainer}>
          <TouchableOpacity style={styles.googleButton} onPress={googleLogin}>
            <Text style={styles.newAccountText}>Log In with Google</Text>
            <Image source={icons.google} style={styles.googleIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.newAccountContainer}>
          <Text style={styles.newAccountText}>Don't have an Account ?</Text>
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
  newAccountContainer: {
    marginVertical: '2%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  newAccountText: {
    fontSize: 16,
  },
  signUpText: {
    fontSize: 16,
    color: colors.primaryBlue,
  },
  googleButtonContainer: {
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButton: {
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 15,
  },
});
export default LogInScreen;
