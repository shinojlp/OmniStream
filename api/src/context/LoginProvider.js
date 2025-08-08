import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSession } from "../../../utils/session";
import axiosInstance from "../../axios";

const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [reloadFlag, setReloadFlag] = useState(false);
  // const [reloadHomeFlag, setReloadHomeFlag] = useState(false);
  const [user, setUser] = useState({
    watchlist: []
  });

  // const toggleEffect = () => {
  //   setReloadFlag(!reloadFlag);
  // };
  // const toggleHomeEffect = () => {
  //   setReloadHomeFlag(!reloadFlag);
  // };
  const fetchUser = async () => {
    console.log("hello from fetchuser");
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("access token", accessToken)
      if (accessToken != null) {
        console.log("accessToken");
        setSession(accessToken);
        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.get("/users/me");
        console.log("response 015649846546546", response.data);
        const { watchlist, series_watchlist } = response.data
        let combinedWatchlist = []
        if (watchlist) {
          combinedWatchlist = [...watchlist]
        }
        if (series_watchlist) {
          combinedWatchlist = [...combinedWatchlist, ...series_watchlist]
        }
        // const combinedWatchlist = [...watchlist,  , ...series_watchlist];
        console.log('====================================');
        console.log(combinedWatchlist);
        console.log('====================================');
        setUser({ ...user, watchlist: combinedWatchlist })
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    //console.log("helloooooo");
    fetchUser();
    //readSampleData()
  }, []);
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        fetchUser
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
