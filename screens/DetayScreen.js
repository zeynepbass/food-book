import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import React from "react";

const { width, height } = Dimensions.get("window");

const DetayScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Üst bordo alan */}
      <View style={styles.topBar}></View>

      {/* Görsel */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/11006672.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* İçerik */}
      <View style={styles.content}>
        <Text style={styles.title}>Başlık</Text>
        <Text style={styles.description}>
          Burada detaylı açıklama yer alacak. Ürün veya içerik hakkında geniş
          bilgi verilebilir. Kullanıcıya tüm bilgiyi rahatça sunacak şekilde
          tasarlandı.
        </Text>
        <View style={styles.footer}>
          <Text style={styles.score}>⭐ 4.5</Text>
          <Text style={styles.fav}>Favorilere Ekle</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: height * 0.4,
    backgroundColor: "rgb(151,10,18)",
    borderBottomLeftRadius: width / 2, 
    borderBottomRightRadius: width / 2,
  },
  imageContainer: {
    position: "absolute",
    top: height * 0.15, 
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300
  },
  content: {
    marginTop: height*0.10, 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    fontWeight: "bold",
    fontSize: 16,
  },
  fav: {
    fontWeight: "bold",
    color: "rgb(151,10,18)",
  },
});
