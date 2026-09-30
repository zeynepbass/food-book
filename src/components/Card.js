import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

const IconButton = ({ onPress, children }) => (
  <TouchableOpacity style={styles.iconButton} onPress={onPress} hitSlop={8}>
    {children}
  </TouchableOpacity>
);

const Card = ({ columns = 2, data = [], onFavorite, onEdit, onDelete }) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const hasActions = onFavorite || onEdit || onDelete;

  return (
    <View style={[styles.container, columns === 1 && styles.column]}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate("Detay", { id: item.id })}
          style={[styles.card, { width: columns === 2 ? (width - 48) / 2 : "100%" }]}
        >
          {hasActions && (
            <View style={styles.iconContainer}>
              {onFavorite && (
                <IconButton onPress={() => onFavorite(item)}>
                  <FontAwesome name="heart" size={20} color={colors.primary} />
                </IconButton>
              )}
              {onEdit && (
                <IconButton onPress={() => onEdit(item.id)}>
                  <FontAwesome name="pencil" size={20} color={colors.text} />
                </IconButton>
              )}
              {onDelete && (
                <IconButton onPress={() => onDelete(item.id)}>
                  <Feather name="x" size={20} color={colors.text} />
                </IconButton>
              )}
            </View>
          )}

          <Image source={{ uri: item.photo }} style={styles.image} />

          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.score}>⭐ {item.score}</Text>
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
  column: { flexDirection: "column" },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.85)",
    position: "absolute",
    top: 6,
    right: 6,
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    zIndex: 10,
  },
  iconButton: { marginHorizontal: 5 },
  image: { width: "100%", height: 120 },
  content: { padding: 10, backgroundColor: colors.white },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 13, color: colors.muted, marginBottom: 6 },
  score: { fontWeight: "bold", color: colors.text, textAlign: "right" },
});

export default Card;
