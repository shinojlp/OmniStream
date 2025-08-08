import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import qs from "qs";
import axiosInstance from "../api/axios";
import { setSession } from "../utils/session";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../theme";
import { useLogin } from "../api/src/context/LoginProvider";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: "sam@gmail.com",
    password: "iamsam",
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { fetchUser } = useLogin();
  // const { setIsLoggedIn } = useLogin();
  const handleOnChangeText = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };
  const Login = async () => {
    const requestBody = qs.stringify({
      grant_type: "password",
      scope: "",
      client_id: "",
      client_secret: "",
    });
    console.log(requestBody);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const response = await axiosInstance.post(
        "/auth/login",
        requestBody,
        config
      );
      console.log("************************************")
      console.log(response, "login response");
      console.log("************************************")

      setSession(response.data.access_token, response.data.refresh_token);
      fetchUser();
      //navigation.dispatch(StackActions.replace("Home"));
      // eslint-disable-next-line react/prop-types
      navigation.navigate("Home");
      console.log("home");
    } catch (error) {
      Alert.alert(
        "Warning!",
        "You have entered incorrect login details, please check.",
        [{
          text: "OK", onPress: () => console.log("OK Pressed")
        }],
        { cancelable: false } // Optional: Make alert non-cancelable
      );
    }
  };
  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-neutral-800"
      style={{ justifyContent: "center" }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start"></View>
        <View className="flex-row justify-center">
          {/* <Image source={require("../assets/images/login.png")} style={{ width: 200, height: 200 }} /> */}
        </View>
      </SafeAreaView>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          justifyContent: "center",
        }}
        className="flex-1 bg-neutral-800 px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-white ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="johnsmith@gmail.com"
            value={credentials.email}
            onChangeText={(value) => handleOnChangeText(value, "email")}
          />
          <Text className="text-white ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
            secureTextEntry={!showPassword}
            placeholder="johnsmith123"
            value={credentials.password}
            onChangeText={(value) => handleOnChangeText(value, "password")}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                marginBottom: 4,
                marginRight: 5,
              }}
            >
              Show Password
            </Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={
                  showPassword
                    ? "toggle-switch-outline"
                    : "toggle-switch-off-outline"
                }
                size={35}
                color="#9400d3"
                onPress={toggleShowPassword}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="py-3 rounded-xl"
            onPress={Login}
            style={styles.background}
          >
            <Text className="text-xl font-bold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
          <Text className="text-xl text-center text-white">OR</Text>
          <TouchableOpacity
            className="py-3 bg-yellow-400  rounded-xl"
            style={styles.background}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text className="text-xl font-bold text-center text-white">
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-white font-bold">Forgot password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
            <Text className="font-bold" style={styles.text}>
              {"  "}
              Click here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
