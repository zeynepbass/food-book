

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get("window");

const Card = ({ columns = 2, data, onDelete,UpdateHandler ,setIcons}) => {
  const navigation = useNavigation();

  const handleAddFavourite = async (item) => {
    try {

      const currentFavs = await AsyncStorage.getItem("favori");
      const favArray = currentFavs ? JSON.parse(currentFavs) : [];

      if (favArray.some(fav => fav.id === item.id)) return;

      const updatedFavs = [...favArray, item];
  
 
      await AsyncStorage.setItem("favori", JSON.stringify(updatedFavs));
      setFavourites(updatedFavs);
    } catch (e) {
      console.log("Favori eklenemedi:", e);
    }
  };
  
    
  
  return (
    <View
      style={[styles.container, columns === 1 && { flexDirection: "column" }]}
    >
      {data &&
        [...data].reverse().map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate("Detay", { id: item.id })}
            style={[
              styles.card,
              columns === 2 ? { width: width * 0.45 } : { width: "100%" },
            ]}
          >
            <View style={styles.iconContainer}>
              { setIcons &&            <TouchableOpacity style={styles.iconButton}   
                    onPress={() => handleAddFavourite(item)}>
                <FontAwesome name="heart" size={22} color="rgb(151,10,18)" />
              </TouchableOpacity> }
    
              <TouchableOpacity
                style={styles.iconButton}
                onPress={()=>onDelete(item.id)}
              >
                <Feather name="x" size={22} color="black" />
              </TouchableOpacity>
 {setIcons &&  <TouchableOpacity
                style={styles.iconButton}
                onPress={() => UpdateHandler(item.id)}
              >
                <FontAwesome name="pencil" size={22} color="rgb(15, 15, 15)" />
              </TouchableOpacity>}
             
            </View>

            <Image source={{ uri: item.photo }} style={styles.image} />

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.footer}>
                <Text style={styles.score}>⭐ {item.score}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 16,
  },
  card: {
    backgroundColor: "rgb(151,10,18)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "rgb(240, 237, 237,0.3)",
    position: "absolute",
    right: 0,
    flexDirection: "row",
    padding: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  score: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default Card;
