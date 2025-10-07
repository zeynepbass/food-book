import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({ data }) => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const filteredData = data
    ? data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 10,

      backgroundColor: "#F5F5F5",
      borderRadius: 25,
    },
    textInput: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: "#fff",
      fontSize: 16,
    },
    icon: {
      position: "absolute",
      right: 20,
    },
    dropdown: {
      backgroundColor: "transparent",
      borderRadius: 5,
      marginHorizontal: 10,
      maxHeight: 200,
      shadowColor: "#000",

      marginBottom: 5,
      elevation: 4,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderColor: "#eee",
    },
    itemText: {
      fontSize: 16,
      color: "#333",
    },
  });
  const [open, setOpen] = useState("");
  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="Ara"
          value={search}
          onChangeText={setSearch}
          style={styles.textInput}
          onPress={() => setOpen(!open)}
        />
        <EvilIcons name="search" size={24} color="black" style={styles.icon} />
      </View>
      {open ? (
        <>
          {" "}
          {filteredData.length > 0 && (
            <View style={styles.dropdown}>
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Detay", { id: item.id })
                    }
                    style={styles.item}
                  >
                    <Text style={styles.itemText}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}{" "}
        </>
      ) : null}
    </>
  );
};

export default SearchBar;
