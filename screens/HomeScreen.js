
import React from "react";
import { View, Platform } from "react-native";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
  return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? 10 : 0 }}>
    <View>
      <SearchBar />
      <Slider />
      <Card />
    </View></SafeAreaView>
  );
};

export default HomeScreen;
