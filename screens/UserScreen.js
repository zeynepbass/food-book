
import React from "react";
import { View, Platform,ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const UserScreen = () => {
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
        <View style={{ flex: 1 }}>
          <SearchBar />
          <Card />
        </View>
        
        </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;
