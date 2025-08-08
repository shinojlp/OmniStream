import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { StatusBar } from "expo-status-bar";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedSeries,
  fetchPopularSeries,
} from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { styles } from "../theme";
import SeriesList from "../components/seriesList";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [trendingMovies, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getTopRatedSeries();
    getPopularSeries();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log("got trending", data.results.length);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log("got upcoming", data.results.length);
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log("got top rated", data.results.length);
    if (data && data.results) setTopRated(data.results);
  };
  const getTopRatedSeries = async () => {
    const data = await fetchTopRatedSeries();
    console.log("got top rated series", data.results.length);
    if (data && data.results) setTopRatedSeries(data.results);
    setLoading(false);
  };
  const getPopularSeries = async () => {
    const data = await fetchPopularSeries();
    console.log("got popular series", data.results.length);
    if (data && data.results) setPopularSeries(data.results);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <StatusBar style="light" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            Omni<Text style={styles.text}>Stream</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies Carousel */}
          {trendingMovies.length > 0 && (
            <TrendingMovies data={trendingMovies} />
          )}

          {/* top rated movies row */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated Movies" data={topRated} />
          )}

          {/* top rated series row */}
          {topRatedSeries.length > 0 && (
            <SeriesList name="Top Rated Series" data={topRatedSeries} />
          )}

          {/* popular series row */}
          {popularSeries.length > 0 && (
            <SeriesList name="Popular Series" data={popularSeries} />
          )}

          {/* upcoming content */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
