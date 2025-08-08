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
import MovieList from "../components/movieList";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";
import { styles, theme } from "../theme";
import Loading from "../components/loading";
import { fetchmovie } from "../api/streamingdb";
import * as Linking from "expo-linking";
import { Rating, AirbnbRating } from "react-native-ratings";
//import Math from 'react-native/Math';
import { useLogin } from "../api/src/context/LoginProvider";
import axiosInstance from "../api/axios";
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

function convertToWholeNumber(number) {
  return Math.floor(number);
}

export default function MovieScreen() {
  const { params: item } = useRoute();
  console.log(item, "item")
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moviestream, setmoviestreaming] = useState([]);
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
  const localImageMap = {
    netflix: require("../assets/icons/netflix.png"),
    prime: require("../assets/icons/prime.png"),
    hotstar: require("../assets/icons/hotstar.png"),
    apple: require("../assets/icons/apple.png"),
    zee5: require("../assets/icons/zee5.png"),
  };

  const [available, setAvailable] = useState(false);
  const { user, setUser } = useLogin();
  const isMovieinWatchList = (data) =>
    user.watchlist.some((movie) => movie.id === data.id);

  const add_to_watchlist = async (data) => {
    const new_watchlist = [...user.watchlist, data];
    setUser({ ...user, watchlist: new_watchlist });
    console.log("added to list", new_watchlist);
    try {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      // console.log(data);
      const res = await axiosInstance.post(
        "/users/add_movies_to_watchlist",
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
        "/users/remove_movie_from_watchlist",
        movietoremove
      );
    } catch (error) {
      console.log(error);
    }
    //setLoading(false)
  };
  useEffect(() => {
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    getMovieStreaming(item.id);
  }, [item]);
  ///////////////////////////////////////////////////////
  console.log("imagelink", link)
  const getMovieStreaming = async (id) => {
    console.log("********************movie**************************");
    const data = await fetchmovie(id).then((res) => {
      console.log(res.streamingOptions, "this is res with streamingOption");
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
    }).catch((error) => {
      console.log("streamingOptions error", error)
    });
    setLoading(false);
    if (data) {
      setmoviestreaming({ ...movie, ...data });
    }
  };
  ///////////////////////////////////////////////////////
  const getMovieDetials = async (id) => {
    const data = await fetchMovieDetails(id);
    console.log("got movie details");
    setRating(Math.ceil(data.vote_average / 2));
    console.log(data.vote_average);
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    //console.log('got movie credits')
    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    //console.log('got similar movies');
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
      try {
        if (supported) {
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
          {isMovieinWatchList(movie) ? (
            <TouchableOpacity onPress={() => remove_from_watchlist(movie)}>
              <HeartIcon size="35" color={theme.background} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => add_to_watchlist(movie)}>
              <HeartIcon size="35" color={"white"} />
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity onPress={() => add_to_watchlist(movie)}>
            <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
          </TouchableOpacity> */}
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require('../assets/images/moviePoster2.png')}
              source={{
                uri: image500(movie.poster_path) || fallbackMoviePoster,
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
          {movie?.title}
        </Text>

        {/* status, release year, runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
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
        {console.log(link["prime"]["streaminglink"])}
        <AirbnbRating
          defaultRating={rating}
          style={{ paddingVertical: 10 }}
          isDisabled={true}
        />
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
        {/* {console.log(link)} */}
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
          {/* <Text style={{ color: "lightgray", fontSize: 16 }}>Available on</Text> */}
          {Object.keys(link).map(
            (key) =>
              link[key]["streaminglink"] !== "" && (
                <TouchableOpacity
                  key={key}
                  onPress={() => Linking.openURL(link[key]["streaminglink"])}
                  style={{ marginRight: 10 }}
                >
                  <View
                    className="items-center"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      overflow: "hidden",
                      backgroundColor: "red",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Image
                      source={{ uri: link[key].img }}
                      style={{
                        flex: 1,
                        width: 70,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )
          )}
        </View>
      </View>
      {/* cast */}
      {movie?.id && cast.length > 0 && (
        <Cast navigation={navigation} cast={cast} />
      )}
      {/* similar movies section */}
      {movie?.id && similarMovies.length > 0 && (
        <MovieList
          title={"Similar Movies"}
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
