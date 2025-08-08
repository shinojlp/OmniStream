import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../theme";
import axios from "axios";
import { baseURL } from "../api/axios";

const ResetPasswordConfirm = () => {
  const { params: email } = useRoute();
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleVerificationCodeChange = (value) => {
    setVerificationCode(value);
  };

  const handleSubmit = () => {
    // Handle password submission logic here
    console.log(email);
    console.log("Password submitted:", password);
    console.log("Verification code submitted:", verificationCode);
    const res = axios
      .post(`${baseURL}users/resetPasswordConfirm`, {
        email: email,
        resettoken: verificationCode,
        password: password,
      })
      .then((response) => {
        if (!response.data.success) {
          // Handle successful response
          console.log("Invalid verfication code or passowrd");
        }
        if (response.data.success) {
          navigation.navigate("Login");
        }

        // console.log(res);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    // You can perform further actions like sending the password and verification code to a server, etc.
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
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          justifyContent: "center",
        }}
        className="flex-1 bg-neutral-800 px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-white ml-4">New password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                marginBottom: 4,
                marginRight: 5,
                marginTop: 2,
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
        </View>
        <View className="form space-y-2">
          <Text className="text-white ml-4" style={{ marginTop: 15 }}>
            Verification code
          </Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mt-2 mb-3"
            placeholder="Code"
            onChangeText={handleVerificationCodeChange}
            value={verificationCode}
          />

          <TouchableOpacity
            className="py-3 rounded-xl"
            onPress={handleSubmit}
            style={styles.background}
          >
            <Text className="text-xl font-bold text-center text-white">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
    //   <Text>Enter New Password</Text>
    //   <TextInput secureTextEntry placeholder="Enter password" onChangeText={handlePasswordChange} value={password} />
    //   <Text>Enter Verification Code</Text>
    //   <TextInput placeholder="Enter verification code" onChangeText={handleVerificationCodeChange} value={verificationCode} />
    //   <Button title="Submit" onPress={handleSubmit} />
    // </View>
  );
};

export default ResetPasswordConfirm;
