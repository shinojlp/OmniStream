import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3CenterLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";
import { StatusBar } from "expo-status-bar";

// subscribe for more videos like this :)
export default function About() {
  const navigation = useNavigation();
  const abstyles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#FFFFFF",
      textAlign: "center",
    },
    description: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 10,
      color: "#FFFFFF",
      lineHeight: 24,
    },
    made: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
      color: "#FFFFFF",
      lineHeight: 24,
    },
  });

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="flex">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <StatusBar style="light" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-neutral-800" style={{ padding: 20 }}>
        <Text style={abstyles.title}>
          Omni<Text style={styles.text}>Stream</Text>
        </Text>
        <Text style={abstyles.description}>
          OmniStream is a revolutionary platform designed to redefine the way
          users discover and engage with their favorite movies and TV shows. At
          OmniStream, we believe that entertainment should be accessible and
          immersive.
        </Text>
        <Text style={abstyles.description}>
          Our mission at OmniStream is to empower users to explore the vast
          landscape of entertainment effortlessly. We strive to create a
          centralized hub where users can access comprehensive information about
          their favourie streaming content.
        </Text>
        <Text style={abstyles.description}>
          We envision OmniStream as the ultimate destination for entertainment
          enthusiasts worldwide. Our vision is to continuously innovate and
          evolve our platform, expanding its capabilities and reach to cater to
          the diverse needs of our global user base.
        </Text>
      </View>
    </View>
  );
}
