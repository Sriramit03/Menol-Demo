import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc
} from 'firebase/firestore';
import {Alert} from 'react-native';
import {db} from './fireBaseConfig'; // Ensure correct path

export const addToCart = async (productId, user) => {
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
        cart: arrayUnion(productId),
      });
      console.log("Item Added");
      return true;
    } else {
      // Document doesn't exist, create a new one
      await setDoc(userRef, {
        email: user.email,
        cart: [productId],
      });
      return true;
    }
  } catch (error) {
    Alert.alert('Error', `Error while adding items to Cart ${error.toString()}`);
  }
};

export const removeFromWishlist = async ( productId,user) => {
    const userRef = doc(db, "users", user.uid);
    try {
        await updateDoc(userRef, {
            cart: arrayRemove(productId) // Removes only the specified productId
        });

        console.log("Product removed from Cart!");
    } catch (error) {
        Alert.alert("Error", "Error while removing item from Cart");
    }
};

export const getWishlist = async (user) => {
    const userRef = doc(db, "users", user.uid);

    try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data.cart || []; // Return wishlist if exists, else return empty array
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching Cart:", error);
        return [];
    }
};

