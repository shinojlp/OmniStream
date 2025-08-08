import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";
import axios from "axios";
import { baseURL } from "../api/axios";
import qs from "qs";
const Forget = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleNext = () => {
    // Handle next button logic here, such as navigation to the next screen
    // console.log("Email submitted:", email);
    // navigation.push("ResetPasswordConfirm", email);
    // const requestBody = qs.stringify({
    //   email: email,
    // });
    // // console.log(requestBody);
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const res = axios.post(`https://e0ca-103-195-79-54.ngrok-free.app/api/v1/users/resetPassword`, requestBody, config);

    // const requestBody = { email: email };
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const res = axios
      .post(
        `${baseURL}users/resetPassword?email=${encodeURIComponent(
          email
        )}`,
        {},
        config
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        navigation.push("ResetPasswordConfirm", email);
        // console.log(res);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    // console.log(response);
    // navigation.push("ResetPasswordConfirm", email);
    // console.log(res);
    // Handle response data her

    // You can perform further actions like validating the email, sending it to a server, etc.
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
          <Text className="text-white ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email"
            onChangeText={handleEmailChange}
            value={email}
            keyboardType="email-address"
          />

          <TouchableOpacity
            className="py-3 rounded-xl"
            style={styles.background}
            onPress={handleNext}
          >
            <Text className="text-xl font-bold text-center text-white">
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
    //   <Text>Enter Email</Text>
    //   <TextInput placeholder="Enter email" onChangeText={handleEmailChange} value={email} keyboardType="email-address" />
    //   <Button title="Next" onPress={handleNext} />
    // </View>
  );
};

export default Forget;
