import { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

const MAX_RESULTS = 5;

const SearchBar = ({ data = [] }) => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const term = search.trim().toLocaleLowerCase("tr");
  const results = term
    ? data.filter((item) => item.title?.toLocaleLowerCase("tr").includes(term)).slice(0, MAX_RESULTS)
    : [];

  const openDetail = (id) => {
    setSearch("");
    navigation.navigate("Detay", { id });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          placeholder="Ara"
          value={search}
          onChangeText={setSearch}
          style={styles.textInput}
        />
        <EvilIcons name="search" size={24} color="black" style={styles.icon} />
      </View>
      {results.length > 0 && (
        <View style={styles.dropdown}>
          {results.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => openDetail(item.id)} style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.input,
    borderRadius: 25,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  icon: { marginRight: 12 },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemText: { fontSize: 16, color: colors.text },
});

export default SearchBar;
