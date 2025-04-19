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
import {googleLogin, signUp} from '../../firebase/authConfig';
import {icons} from '../../utils/icons';
import Icon from 'react-native-vector-icons/Feather';
import {useGlobalContext} from '../../context/GlobalProvider';
import LoadingModal from '../../components/LoadingModal';

const SignUpScreen = ({navigation}) => {
  const {setUser} = useGlobalContext();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = async () => {
    if (
      formValues.name != '' ||
      formValues.email != '' ||
      formValues.password != '' ||
      formValues.password == formValues.confirmPassword ||
      formValues.password.length >= 6
    ) {
      try {
        setIsModalVisible(true);
        const res = await signUp(formValues.email, formValues.password);
        setIsModalVisible(false);
        setUser(res);
        Alert.alert('Success', 'New Account Created Successful!');
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
    setIsModalVisible(true);
    const res = await googleLogin();
    setIsModalVisible(false);
    if (!res) {
      Alert.alert('Failure', 'Google Sign-Un Failed!');
    } else {
      setUser(res);
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
    }
  };

  const oldAccountFunc = () => {
    navigation.replace('LogInScreen');
  };
  return (
    <SafeAreaView>
      <LoadingModal visible={isModalVisible} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>New Account</Text>
          <FormField
            value={formValues.name}
            placeholder={'Username'}
            handleChangeText={e => setFormValues({...formValues, name: e})}
            otherStyles={{paddingHorizontal: '5%'}}
          />
          <FormField
            value={formValues.email}
            placeholder={'Email'}
            handleChangeText={e => setFormValues({...formValues, email: e})}
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
          <FormField
            value={formValues.confirmPassword}
            placeholder={'Re-Enter Password'}
            handleChangeText={e =>
              setFormValues({...formValues, confirmPassword: e})
            }
            otherStyles={{paddingHorizontal: '5%'}}
            keyboardType="visible-password"
          />

          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}>
            <View style={styles.rememberBox}>
              {rememberMe && <Icon name="check" size={18} />}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <CustomButton
            buttonName={'Create Account'}
            handleFunc={handleSignUp}
            containerStyles={{
              backgroundColor: '#000',
              height: 60,
              width: '90%',
            }}
            textStyles={{color: colors.primaryWhite}}
          />
        </View>

        <Text style={styles.otherLogInText}>Or Continue with others</Text>
        <View style={styles.otherLogInContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleSignUp}>
            <Image source={icons.google} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={undefined}>
            <Image source={icons.facebook} style={styles.Icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={undefined}>
            <Image source={icons.twitter} style={styles.Icon} />
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 3,
    marginVertical: 10,
  },
  container: {
    marginTop: '15%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },

  rememberContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberBox: {
    borderWidth: 1,
    borderColor: colors.primaryGrey,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    letterSpacing: 3,
    fontSize: 12,
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
  socialButton: {
    padding: 10,
  },
  Icon: {
    width: 40,
    height: 40,
  },

  oldAccountContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  oldAccountText: {
    fontSize: 14,
    letterSpacing: 3,
  },
  logInText: {
    fontSize: 14,
    color: colors.primaryBlue,
    letterSpacing: 3,
  },
});
export default SignUpScreen;
