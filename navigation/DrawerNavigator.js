import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import AboutUs from "../screens/About";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles, theme } from "../theme";
import WatchList from "../screens/WatchList";

const CustomDrawer = (props) => {
  const navigation = useNavigation()
  // const { setIsLoggedIn } = useLogin();
  return (
    <View className="flex-1 bg-neutral-800">
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          padding: 20,
        }}
        onPress={() => {
          // setIsLoggedIn(false);
          // resetSession();  
            navigation.navigate("Login")
        }}
      >
        
        <View style={{ flexDirection: "row", alignItems: "center", padding: "5px" }}>
          <View style={{ marginRight: "18px", size: "20" }}>
            <AntDesign name="logout" style={{color:"white"}} size={25}/>
          </View>
          <Text className="text-white" >  Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {/* <Drawer.Screen
        component={MyTabs}
        name="Home"
        options={{
          drawerIcon: ({ focused, size, color }) => {
            return <FontAwesome5 name="home" size={14} color={focused ? "#007fff" : "black"} />;
          },
          title: "Home",
        }}
      /> */}
      <Drawer.Screen
        component={HomeScreen}
        name="Homee"
        options={{
          title: "Home",
          drawerIcon: ({ focused, size, color }) => <FontAwesome5 name="home" size={20} color={focused ? "#9400d3" : "white"} />,
        }}
      />

      <Drawer.Screen
        component={AboutUs}
        name="About"
        options={{
          title: "About Us",
          drawerIcon: ({ focused, size, color }) => <AntDesign name="infocirlce" size={20} color={focused ? "#9400d3" : "white"} />,
        }}
      />
      <Drawer.Screen
        component={WatchList}
        name="WatchList"
        options={{
          title: "Watch list",
          drawerIcon: ({ focused, size, color }) => <Feather name="list" size={20} color={focused ? "#9400d3" : "white"} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
