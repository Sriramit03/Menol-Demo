import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const signUp = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const logIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return auth().signOut();
};


export async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();

  // Try the new style of google-sign in result, from v13+ of that module
  idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);
  console.log('Google Credential',googleCredential);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
