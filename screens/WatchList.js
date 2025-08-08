import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
import { debounce } from "lodash";
import Loading from "../components/loading";
import { useLogin } from "../api/src/context/LoginProvider";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon } from "react-native-heroicons/solid";

const { width, height } = Dimensions.get("window");

const WatchList = () => {
  const navigation = useNavigation();
  const { user, setUser } = useLogin();
  const { watchlist } = user;
  console.log("****************************************************", watchlist)
  return (
    <ScrollView className="bg-neutral-800 flex-1">
      <SafeAreaView className="flex">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <StatusBar style="light" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        style={styles.container} 
        className="flex-row justify-between flex-wrap"
      >
        {watchlist.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                item.title
                  ? navigation.push("Movie", item)
                  : navigation.push("Series", item)
              }
            >
              <View className="space-y-2 mb-4">
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  // source={require('../assets/images/moviePoster2.png')}
                  className="rounded-3xl"
                  style={{ width: width * 0.44, height: height * 0.3 }}
                />
                {/* {console.log("titlle anme", item.title)} */}
                {console.log(item, item.title)}
                {item.title ? (
                  <Text className="text-gray-300 ml-1">
                    {item.title && item.title.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item.title}
                  </Text>
                ) : (
                  <Text className="text-gray-300 ml-1">
                    {item.name && item.name.length > 22
                      ? item.name.slice(0, 22) + "..."
                      : item.name}
                  </Text>
                )}

                {/* {console.log("item: ",item,"item title: ",item.title)} */}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  watchlistContainer: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 20,
  },
  posterImage: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 20,
  },
  title: {
    color: "gray",
    marginLeft: 10,
  },
});

export default WatchList;
