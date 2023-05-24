import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logout: () => {},
  login: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const login = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
