import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { EvilIcons } from "@expo/vector-icons";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      padding: 5,
      backgroundColor: "#F5F5F5"
    },

    textInput: {
      flex: 1,
      padding: 10,
      borderRadius: 20,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, 
      backgroundColor: "#fff", 
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ara"
        value={search}
        onChangeText={setSearch}
        style={styles.textInput}
      />
      <EvilIcons name="search" size={24} color="black" style={{position:"absolute",right:20}}/>
    </View>
  );
};

export default SearchBar;
