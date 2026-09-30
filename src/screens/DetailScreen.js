import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, useWindowDimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { getPostDetail } from "../services/posts";
import { addFavorite } from "../services/favorites";
import { colors } from "../theme/colors";

const DetailScreen = () => {
  const { id } = useRoute().params;
  const { width, height } = useWindowDimensions();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPostDetail(id)
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavorite = async () => {
    const added = await addFavorite(post);
    Toast.show({
      type: added ? "success" : "info",
      text1: added ? "Favorilere eklendi ❤️" : "Zaten favorilerde",
      visibilityTime: 1500,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.center}>
        <Text style={styles.description}>Tarif bulunamadı.</Text>
      </View>
    );
  }

  const imageSize = Math.min(width - 60, 300);

  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.topBar,
          { height: height * 0.4, borderBottomLeftRadius: width / 2, borderBottomRightRadius: width / 2 },
        ]}
      />
      <View style={[styles.imageContainer, { top: height * 0.15 }]}>
        <Image source={{ uri: post.photo }} style={{ width: imageSize, height: imageSize, borderRadius: 10 }} />
      </View>

      <View style={[styles.content, { marginTop: imageSize - height * 0.25 + 24 }]}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.score}>⭐ {post.score}</Text>
          <TouchableOpacity style={styles.favButton} onPress={handleFavorite}>
            <FontAwesome name="heart" size={16} color={colors.primary} />
            <Text style={styles.fav}>Favorilere Ekle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  topBar: { backgroundColor: colors.primary },
  imageContainer: { position: "absolute", width: "100%", alignItems: "center" },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, color: colors.muted, marginBottom: 15 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  score: { fontWeight: "bold", fontSize: 16 },
  favButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  fav: { fontWeight: "bold", color: colors.primary },
});

export default DetailScreen;
