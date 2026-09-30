import { View, FlatList, Image, StyleSheet, useWindowDimensions } from "react-native";

const Slider = ({ data = [] }) => {
  const { width } = useWindowDimensions();

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={[styles.slide, { width }]}>
          <Image source={{ uri: item.photo }} style={styles.image} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  slide: { paddingHorizontal: 16 },
  image: { width: "100%", height: 170, borderRadius: 16 },
});

export default Slider;
