import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserDetails = async user => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('userDetails', jsonValue);
    console.log('User details saved!');
  } catch (e) {
    console.error('Error saving user details', e);
  }
};

const clearUserDetails = async () => {
  try {
    await AsyncStorage.removeItem('userDetails');
    console.log('User details cleared.');
  } catch (e) {
    console.error('Error clearing user details', e);
  }
};

export const signUp = async (email, password) => {
  const result = auth().createUserWithEmailAndPassword(email, password);
  const user = {
    name: result?.user.displayName,
    email: result?.user.email,
    uid: result?.user.uid,
  }
  await saveUserDetails(user);
  return user;
};

export const logIn = async (email, password) => {
  const result = auth().signInWithEmailAndPassword(email, password);
  const user = {
    name: result?.user.displayName,
    email: result?.user.email,
    uid: result?.user.uid,
  }
  await saveUserDetails(user);
  return user;
};

export const signOut = async () => {
  await clearUserDetails();
  return auth().signOut();
};

export const googleLogin = async () => {
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '347113254469-hm6asjqrj3bu721gnkfd61c06gh86ngi.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    await GoogleSignin.hasPlayServices(); // Ensure Google Play Services is available
    const signInResult = await GoogleSignin.signIn();
    idToken = signInResult.data.idToken; // Fix: Access idToken directly

    if (!idToken) {
      throw new Error('No ID Token received from Google');
    }

    // Get Firebase credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in with Firebase
    const result = await auth().signInWithCredential(googleCredential);
    const user = {
      name: result?.user.displayName,
      email: result?.user.email,
      uid: result?.user.uid,
    }
    await saveUserDetails(user);
    return user;
  } catch (error) {
    console.error('Google Sign-In Error: ', error);
    Alert.alert('Error', `Google Sign-In Failed! ${error.message || error}`);
  }
};
