import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import SeriesScreen from "../screens/SeriesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerNavigator from "./DrawerNavigator";
import About from "../screens/About";
import Forget from "../screens/Forget";
import WatchList from "../screens/WatchList";
import ResetPasswordConfirm from "../screens/ResetPasswordConfirm";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  //const { setIsLoggedIn } = useLogin();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
        onPress={() => {
          // setIsLoggedIn(false);
          // resetSession();
        }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={DrawerNavigator}
        />
        {/* <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} /> */}
        <Stack.Screen
          name="Movie"
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Series"
          options={{ headerShown: false }}
          component={SeriesScreen}
        />
        <Stack.Screen
          name="Person"
          options={{ headerShown: false }}
          component={PersonScreen}
        />
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={SearchScreen}
        />
        <Stack.Screen
          name="AboutUs"
          options={{ headerShown: false }}
          component={About}
        />
        <Stack.Screen
          name="Forget"
          options={{ headerShown: false }}
          component={Forget}
        />
        <Stack.Screen
          name="WatchList"
          options={{ headerShown: false }}
          component={WatchList}
        />
        <Stack.Screen name="ResetPasswordConfirm" options={{ headerShown: false }} component={ResetPasswordConfirm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
