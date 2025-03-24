import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../utils/theme';
import {googleLogin, signUp} from './fireBaseConfig';
import {icons} from '../../utils/icons';

const SignUpScreen = ({navigation}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
    if (
      formValues.name != '' ||
      formValues.email != '' ||
      formValues.password != '' ||
      formValues.password == formValues.confirmPassword ||
      formValues.password.length >= 6
    ) {
      try {
        await signUp(formValues.email, formValues.password);
        Alert.alert('New Account Created Successful!');
        setFormValues({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigation.replace('Tab');
      } catch (err) {
        Alert.alert('Error Occurred');
        console.log(err);
      }
    } else {
      Alert.alert(
        'Invalid Form Values',
        '1.Email Should be Unique \n2. Password must be greater than or equal to length of 6',
      );
    }
  };

  const handleGoogleSignUp = async () => {
    const res = await googleLogin();
    if (!res) Alert.alert('Failure', 'Google Sign-Un Failed!');
    Alert.alert(
      'Success',
      `Successfully Signed In as ${res?.user.displayName}`,
      [
        {
          text: 'Ok',
          onPress: () => navigation.replace('Tab'),
        },
      ],
      {cancelable: false},
    );
  };

  const oldAccountFunc = () => {
    navigation.replace('LogInScreen');
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>New Account</Text>
          <FormField
            title={'Username'}
            value={formValues.name}
            placeholder={'Enter Username'}
            handleChangeText={e => setFormValues({...formValues, name: e})}
            otherStyles={{paddingHorizontal: '5%'}}
          />
          <FormField
            title={'Email'}
            value={formValues.email}
            placeholder={'Enter Email'}
            handleChangeText={e => setFormValues({...formValues, email: e})}
            otherStyles={{paddingHorizontal: '5%'}}
          />
          <FormField
            title={'Password'}
            value={formValues.password}
            placeholder={'Enter Password'}
            handleChangeText={e => setFormValues({...formValues, password: e})}
            otherStyles={{paddingHorizontal: '5%'}}
          />
          <FormField
            title={'Confirm Password'}
            value={formValues.confirmPassword}
            placeholder={'Re-Enter Your Password'}
            handleChangeText={e =>
              setFormValues({...formValues, confirmPassword: e})
            }
            otherStyles={{paddingHorizontal: '5%'}}
          />
          <CustomButton
            buttonName={'Create New Account'}
            handleFunc={handleSignUp}
            containerStyles={{
              backgroundColor: '#2E8BF2',
              borderRadius: 12,
              width: '90%',
            }}
            textStyles={{color: colors.primaryWhite}}
          />
        </View>
        <View style={styles.googleButtonContainer}>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
            <Text style={styles.oldAccountText}>Sign up with Google</Text>
            <Image source={icons.google} style={styles.googleIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.oldAccountContainer}>
          <Text style={styles.oldAccountText}>Already have an account?</Text>
          <TouchableOpacity onPress={oldAccountFunc}>
            <Text style={styles.logInText}>LogIn</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: '25%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  oldAccountContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  oldAccountText: {
    fontSize: 16,
  },
  logInText: {
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
export default SignUpScreen;
