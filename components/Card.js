
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Card = ({ columns = 2 }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, columns === 1 && { flexDirection: "column" }]}>
      {[1, 2, 3, 4].map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => navigation.navigate("Detay")}
          style={[
            styles.card,
            columns === 2 ? { width: width * 0.45 } : { width: "100%" },
          ]}
        >
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="heart-o" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="x" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrPHq7um_b7tNpwVrv4qMpnQL9TWFXhWNPA&s",
            }}
            style={styles.image}
          />

          <View style={styles.content}>
            <Text style={styles.title}>Başlık {item}</Text>
            <Text style={styles.description}>Açıklama metni burada yer alacak.</Text>
            <View style={styles.footer}>
              <Text style={styles.score}>⭐ 4.{item}</Text>
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
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
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
