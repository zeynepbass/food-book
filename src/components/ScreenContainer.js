import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const ScreenContainer = ({ children }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    keyboardShouldPersistTaps="handled"
  >
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingTop: 8, paddingBottom: 24 },
});

export default ScreenContainer;
