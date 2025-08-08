import {
  View,
  Text,
  Alert,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import Cast from "../components/cast";
import SeriesList from "../components/seriesList";
import {
  fallbackMoviePoster,
  fetchSeriesCredits,
  fetchSeriesDetails,
  fetchSimilarSeries,
  image500,
} from "../api/moviedb";
import { styles, theme } from "../theme";
import Loading from "../components/loading";
import { fetchtv } from "../api/streamingdb";
import * as Linking from "expo-linking";
import { AirbnbRating } from "react-native-ratings";
import { useLogin } from "../api/src/context/LoginProvider";
import axiosInstance from "../api/axios";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [series, setSeries] = useState({});
  const [rating, setRating] = useState(0);
  const [cast, setCast] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useLogin();
  const isMovieinWatchList = (data) =>
    user.watchlist.some((movie) => movie.id === data.id);

  // const []
  const [link, setLink] = useState({
    prime: {
      streaminglink: "",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Amazon_Prime_Video_blue_logo_1.svg/1024px-Amazon_Prime_Video_blue_logo_1.svg.png",
    },
    netflix: {
      streaminglink: "",
      img: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png",
    },
    hotstar: {
      streaminglink: "",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDrUPSR1FGXq5thrFS8ygilM09ARao8dlaEA&usqp=CAU",
    },
    apple: {
      streaminglink: "",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/TV_%28iOS%29.png",
    },
    zee5: {
      streaminglink: "",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Zee5-official-logo.jpeg",
    },
  });
  // console.log("====================================");
  // console.log(item);
  // console.log("====================================");
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    setLoading(true);
    getSeriesDetials(item.id);
    getSeriesCredits(item.id);
    getSimilarSeries(item.id);
    getSeriesStreaming(item.id);
  }, [item]);

  const getSeriesDetials = async (id) => {
    console.log(id);
    const data = await fetchSeriesDetails(id);
    console.log("got series details");
    setRating(Math.ceil(data.vote_average / 2));
    console.log(data.vote_average);
    setLoading(false);
    if (data) {
      setSeries({ ...series, ...data });
    }
  };
  const getSeriesCredits = async (id) => {
    const data = await fetchSeriesCredits(id);
    console.log("got series credits");
    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilarSeries = async (id) => {
    const data = await fetchSimilarSeries(id);
    console.log("got similar series");
    if (data && data.results) {
      setSimilarSeries(data.results);
    }
  };
  const getSeriesStreaming = async (id) => {
    console.log("********************series**************************");
    console.log(id);
    const data = await fetchtv(id).then((res) => {
      // console.log(res);
      //console.log(res.result.streamingInfo.in[0].service);
      if (res.streamingOptions.in.map) {
        res.streamingOptions.in.map((item) => {
          if (item.type == "subscription") {
            console.log("Service: ", item.service);
            console.log("Link: ", item.link);
            setAvailable(true);
            setLink((prevLink) => ({
              ...prevLink, // Maintain the previous state of link
              [item.service]: {
                ...prevLink[item.service],
                streaminglink: item.link,
              }, // Update the value of the "netflix" key with newValue
            }));
          }
        });
      }
    });
    setLoading(false);
    if (data) {
      setmoviestreaming({ ...movie, ...data });
    }
  };
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
      try {
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      } catch (error) {
        console.log(console.error);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };
  const add_to_watchlist = async (data) => {
    const new_watchlist = [...user.watchlist, data];
    setUser({ ...user, watchlist: new_watchlist });
    console.log("added to list");
    try {
      console.log("================to be added====================");
      console.log(data);
      console.log("=================to be adddded===================");
      // console.log(data);
      const res = await axiosInstance.post(
        "/users/add_series_to_watchlist",
        data
      );
    } catch (error) {
      console.log(error);
    }
  };
  const remove_from_watchlist = async (movietoremove) => {
    //setLoading(true)
    console.log("movie remove function");
    console.log(movietoremove);
    //  console.log(user.grocery_list, "old grocery list");

    // Filter out the item to be removed from the grocery list
    const newwatchlist = user.watchlist.filter(
      (item) => item.id !== movietoremove.id
    );
    console.log(newwatchlist, "movie to bre moved from");
    setUser({ ...user, watchlist: newwatchlist });
    console.log("removed from list");
    try {
      const res = await axiosInstance.post(
        "/users/remove_series_from_watchlist",
        movietoremove
      );
    } catch (error) {
      console.log(error);
    }
    //setLoading(false)
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          {isMovieinWatchList(series) ? (
            <TouchableOpacity onPress={() => remove_from_watchlist(item)}>
              <HeartIcon size="35" color={theme.background} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => add_to_watchlist(item)}>
              <HeartIcon size="35" color={"white"} />
            </TouchableOpacity>
          )}
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require('../assets/images/moviePoster2.png')}
              source={{
                uri: image500(series.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
          {series?.name}
        </Text>

        {/* status, release year, runtime */}
        {series?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {series?.status} • {series?.release_date?.split("-")[0] || "N/A"} •{" "}
            {series?.runtime} min
          </Text>
        ) : null}

        {/* genres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {series?.genres?.map((genre, index) => {
            let showDot = index + 1 != series.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? "•" : null}
              </Text>
            );
          })}
        </View>
        <AirbnbRating
          defaultRating={rating}
          style={{ paddingVertical: 10 }}
          isDisabled={true}
        />
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {series?.overview}
        </Text>
        {available ? (
          <Text
            style={{ color: "lightgray", fontSize: 16, marginHorizontal: 20 }}
          >
            Streaming on
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            alignItems: "left",
            paddingHorizontal: 20,
          }}
        >
          {Object.keys(link).map(
            (key) =>
              link[key]["streaminglink"] !== "" && (
                <TouchableOpacity
                  key={key}
                  onPress={() => Linking.openURL(link[key]["streaminglink"])}
                >
                  <View
                    className="items-center"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      overflow: "hidden",
                      backgroundColor: "black",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Image
                      source={{ uri: link[key].img }}
                      style={{ flex: 1, width: 70, resizeMode: "contain" }}
                    />
                  </View>
                </TouchableOpacity>
              )
          )}
        </View>
      </View>

      {/* cast */}
      {series?.id && cast.length > 0 && (
        <Cast navigation={navigation} cast={cast} />
      )}

      {/* similar series section */}
      {series?.id && similarSeries.length > 0 && (
        <SeriesList
          name={"Similar Series"}
          hideSeeAll={true}
          data={similarSeries}
        />
      )}
    </ScrollView>
  );
}
