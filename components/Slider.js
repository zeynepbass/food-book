
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
const { width } = Dimensions.get('window');


const Slider = ({data}) => {
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
            <Image source={{ uri: item.photo }} style={styles.image} />

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
