
import React from "react";
import { ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
   
        paddingTop: Platform.OS === "android" ? 90 : 60, 
      }}
    >
      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <SearchBar />
        <Slider style={{ height: 200, marginBottom: 16 }} />
        <Card columns={2} /> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
