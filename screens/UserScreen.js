
import React from "react";
import { View, Platform } from "react-native";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from 'react-native-safe-area-context';
const UserScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? 25 : 0 }}>
    <View>
      <SearchBar />
      <Card />
    </View></SafeAreaView>
  );
};

export default UserScreen;
