
import { useState, useEffect } from 'react';
import { ScrollView, Platform, View } from "react-native";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriScreen = () => {
  const [favourites, setFavourites] = useState([]);

  
  const getFavouriteData = async () => {
    try {
      const currentFavs = await AsyncStorage.getItem("favori");
      const favArray = currentFavs ? JSON.parse(currentFavs) : [];
      setFavourites(Array.isArray(favArray) ? favArray : [favArray]); 
    } catch (e) {
      console.log("Favori okunamadı:", e);
    }
  };


  useEffect(() => {
    getFavouriteData();
  }, [favourites]);
  const handleDeleteFavourite = async (id) => {
    const newFavs = favourites.filter(item => item.id !== id);
    setFavourites(newFavs);
    await AsyncStorage.setItem("favori", JSON.stringify(newFavs));
  };
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 90 : 60
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View>
          <SearchBar data={favourites} />

          <Card
            columns={1}
            data={favourites}  
            onDelete={handleDeleteFavourite}
            setIcons={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriScreen;
