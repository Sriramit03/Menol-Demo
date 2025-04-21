import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create the context
const GlobalContext = createContext();

// Custom hook for using context
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalContext provider component
const GlobalProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      return user;
    } catch (e) {
      console.error('Error retrieving user details', e);
    } finally {
    }
  };

  useEffect(() => {
    getUserDetails().then(res => {
      setUser(res);
      setLoading(false);
    });
  }, []);

  return (
    <GlobalContext.Provider value={{user, setUser,loading}}>
      {children}
    </GlobalContext.Provider>
  );
};

// Export the provider component
export default GlobalProvider;
