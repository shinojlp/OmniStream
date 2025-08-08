import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About OmniStream</Text>
      <Text style={styles.description}>
        OmniStream is a streaming service that offers a wide variety of award-winning TV shows,
        movies, anime, documentaries, and more on thousands of internet-connected devices.
      </Text>
      <Text style={styles.description}>
        You can watch as much as you want, whenever you want, without a single commercial –
        all for one low monthly price. There's always something new to discover, and new TV
        shows and movies are added every week!
      </Text>
      <Text style={styles.description}>
        OmniStream is the world's leading streaming entertainment service with over 200 million
        paid memberships in over 190 countries enjoying TV series, documentaries, and feature
        films across a wide variety of genres and languages. Members can watch as much as
        they want, anytime, anywhere, on any internet-connected screen. Members can play,
        pause, and resume watching, all without commercials or commitments.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

export default AboutUs;