import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc
} from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {db} from './fireBaseConfig'; // Ensure correct path

/* const db = getFirestore();*/
/* const auth = getAuth();  */

export const addToWishlist = async (productId, user) => {
/*   console.log('In addToWishlist');
  console.log(auth);
  if (!auth.currentUser) {
    Alert.alert('Error', 'No User Authenticated');
  } */
  const userRef = doc(db, 'users', user.uid);

  try {
    const docSnap = await getDoc(userRef); // Check if document exists

    if (docSnap.exists()) {
      // Document exists, update the wishlist
      await updateDoc(userRef, {
        wishlist: arrayUnion(productId),
      });
      return true;
    } else {
      // Document doesn't exist, create a new one
      await setDoc(userRef, {
        email: user.email,
        wishlist: [productId],
      });
      return true;
    }
  } catch (error) {
    Alert.alert('Error', `Error while adding items to wishlist ${error.toString()}`);
  }
};

export const removeFromWishlist = async ( productId,user) => {
    const userRef = doc(db, "users", user.uid);
    try {
        await updateDoc(userRef, {
            wishlist: arrayRemove(productId) // Removes only the specified productId
        });

        console.log("Product removed from wishlist!");
    } catch (error) {
        Alert.alert("Error", "Error while removing item from wishlist");
    }
};

export const getWishlist = async (user) => {
    const userRef = doc(db, "users", user.uid);

    try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data.wishlist || []; // Return wishlist if exists, else return empty array
        } else {
            console.log("No wishlist found.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return [];
    }
};

