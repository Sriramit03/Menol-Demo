import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../utils/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {googleLogin, logIn} from '../../firebase/authConfig';
import {icons} from '../../utils/icons';
import Icon from 'react-native-vector-icons/Feather';
import {useGlobalContext} from '../../context/GlobalProvider';
import LoadingModal from '../../components/LoadingModal';

const LogInScreen = ({navigation}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
  });
  const {setUser} = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const handleLogIn = async () => {
    if (formValues.name == '' || formValues.password == '') {
      Alert.alert('Error', "Email or Password can't be Empty !");
    } else {
      try {
        setIsModalVisible(true);
        const result = await logIn(formValues.name, formValues.password);
        setIsModalVisible(false);
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
        });
        Alert.alert('Success', `LogIn Successfully!`);
        setFormValues({
          name: '',
          password: '',
        });
        navigation.replace('Tab');
      } catch (err) {
        setIsModalVisible(false);
        Alert.alert('Error', 'Invalid Credentials');
        console.log(err);
      } 
    }
  };

  const handleGoogleLogin = async () => {
    setIsModalVisible(true);
    const res = await googleLogin();
    setIsModalVisible(false);
    if (!res) {
      Alert.alert('Failure', 'Google Sign-In Failed!');
    } else {
      setUser({
        name: res?.user.displayName,
        email: res?.user.email,
        uid: res?.user.uid,
      });
      Alert.alert(
        'Success',
        `Successfully Logged In as ${res?.user.displayName}`,
        [
          {
            text: 'Ok',
            onPress: () => {
              navigation.replace('Tab');
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const newAccountFunc = () => {
    navigation.navigate('SignUpScreen');
  };
  return (
    <SafeAreaView>
      <LoadingModal visible={isModalVisible} />
      <View style={styles.container}>
        <Text style={styles.signUpHeader}>Sign In</Text>
        <Text style={styles.normalText}>
          Please sign in to access your account
        </Text>

        {/* Form */}

        <FormField
          value={formValues.name}
          placeholder={'Phone / Email'}
          handleChangeText={e => setFormValues({...formValues, name: e})}
          otherStyles={{paddingHorizontal: '5%'}}
          keyboardType="email-address"
        />
        <FormField
          value={formValues.password}
          placeholder={'Password'}
          handleChangeText={e => setFormValues({...formValues, password: e})}
          otherStyles={{paddingHorizontal: '5%'}}
          keyboardType="visible-password"
        />

        <View style={styles.rememberAndForgotContainer}>
          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}>
            <View style={styles.rememberBox}>
              {rememberMe && <Icon name="check" size={18} />}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          buttonName={'Log In'}
          handleFunc={handleLogIn}
          containerStyles={{
            backgroundColor: '#000',
            height: 60,
            width: '90%',
          }}
          textStyles={{color: colors.primaryWhite, letterSpacing: 3}}
        />

        {/* Other Social Login's */}

        <Text style={styles.otherLogInText}>Or Continue with others</Text>
        <View style={styles.otherLogInContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}>
            <Image source={icons.google} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={undefined}>
            <Image source={icons.facebook} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton} onPress={undefined}>
            <Image source={icons.twitter} style={styles.Icon} />
          </TouchableOpacity>
        </View>

        {/* Sign Up page text */}
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
  signUpHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 3,
  },
  normalText: {
    fontSize: 12,
    marginVertical: 10,
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: '500',
  },
  container: {
    height: '100%',
    justifyContent: 'center',
  },

  rememberAndForgotContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  rememberBox: {
    borderWidth: 1,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    letterSpacing: 3,
    fontSize: 12,
  },

  forgotPasswordText: {
    letterSpacing: 3,
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  otherLogInText: {
    marginVertical: 10,
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  otherLogInContainer: {
    marginHorizontal: '5%',
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  Icon: {
    width: 40,
    height: 40,
  },
  googleButton: {
    padding: 10,
    justifyContent: 'center',
  },
  newAccountContainer: {
    marginVertical: '2%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  newAccountText: {
    fontSize: 14,
    letterSpacing: 3,
  },
  signUpText: {
    fontSize: 14,
    color: colors.primaryBlue,
    letterSpacing: 3,
  },
});
export default LogInScreen;
