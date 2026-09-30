import { Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const EmptyState = ({ message }) => <Text style={styles.text}>{message}</Text>;

const styles = StyleSheet.create({
  text: { textAlign: "center", color: colors.muted, marginTop: 40, fontSize: 15 },
});

export default EmptyState;
