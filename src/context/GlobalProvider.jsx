import React, { createContext, useState, useContext } from "react";

// Create the context
const GlobalContext = createContext();

// Custom hook for using context
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalContext provider component
const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Export the provider component
export default GlobalProvider;
