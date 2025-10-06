

import React from "react";
import { ScrollView, Platform, View } from "react-native";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
const FavoriScreen = () => {
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
    <View>
      <SearchBar />
      <Card  columns={1} />
    </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriScreen;
