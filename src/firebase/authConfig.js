import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

export const signUp = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const logIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
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
    return await auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Google Sign-In Error: ', error);
    Alert.alert('Error', `Google Sign-In Failed! ${error.message || error}`);
  }
};
