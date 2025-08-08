import axiosInstance from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setSession = (accessToken, refreshToken = null) => {
  if (accessToken) {
    AsyncStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    AsyncStorage.removeItem("accessToken", accessToken);
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
  if (refreshToken) {
    AsyncStorage.setItem("refreshToken", refreshToken);
  }
};

export const setHeader = (accessToken, refreshToken = null) => {
  if (accessToken) {
    //AsyncStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    //AsyncStorage.removeItem("accessToken", accessToken);
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
  if (refreshToken) {
    AsyncStorage.setItem("refreshToken", refreshToken);
  }
};
export const resetSession = () => {
  AsyncStorage.removeItem("accessToken");
  AsyncStorage.removeItem("refreshToken");
  delete axiosInstance.defaults.headers.common["Authorization"];
};
