import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import axiosInstance from "../api/axios";
import qs from "qs";
import { styles } from "../theme";

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({
    // email: "johnsmith@gmail.com",
    // password: "johnsmith",
    // username: "",
  });
  // const { setIsLoggedIn } = useLogin();
  const handleOnChangeText = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  console.log(credentials);
  const SignUp = async () => {
    const message = {
      email: credentials.email,
      // username: credentials.username,
      password: credentials.password,
    };
    console.log(message);
    try {
      //const res = await axios.post("https://79ba-103-26-57-105.ngrok-free.app/api/v1/users/create", message);
      const res = await axiosInstance.post("/users/create", message);
      console.log(res.data);
      if (res) {
        // eslint-disable-next-line react/prop-types
        navigation.navigate("Login");
      }
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
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" p-2 rounded-xl ml-5"
            style={{ marginTop: 20, backgroundColor: "#9400d3" }}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-neutral-800 px-8 pt-8"
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          justifyContent: "center",
        }}
      >
        <SafeAreaView className="flex">
          <View className="form space-y-2">
            <Text className="text-white ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              //value={credentials.email}
              onChangeText={(value) => handleOnChangeText(value, "email")}
              placeholder="johnsmith@gmail.com"
            />
          </View>
          <View className="form space-y-2">
            <Text className="text-white ml-4">Password</Text>

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry={!showPassword}
              //value={credentials.password}
              onChangeText={(value) => handleOnChangeText(value, "password")}
              placeholder="johnsmith123"
            />
          </View>
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
          <View className="form space-y-2">
            <TouchableOpacity
              className="py-3 rounded-xl"
              onPress={SignUp}
              style={styles.background}
            >
              <Text className="text-xl font-bold text-center text-white">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <Text className="text-xl text-white text-center py-5">OR</Text>
        <View className="flex-row justify-center mt-1">
          <Text className="text-white font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500" style={styles.text}>
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
