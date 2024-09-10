import { createContext, useContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component to provide the auth state to its children
export const AuthContextProvider = ({ children }) => {
  // Initialize authUser state with the value from localStorage or null if not available
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // Provide the authUser state and setAuthUser function to the children
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
