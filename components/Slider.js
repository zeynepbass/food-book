
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
const { width } = Dimensions.get('window');

const data = [
  { id: '1', image: 'https://via.placeholder.com/300x150', title: 'Slide 1' },
  { id: '2', image: 'https://via.placeholder.com/300x150', title: 'Slide 2' },
  { id: '3', image: 'https://via.placeholder.com/300x150', title: 'Slide 3' },
];

const Slider = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  slide: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
