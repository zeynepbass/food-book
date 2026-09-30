import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
      <Toast />
    </>
  );
}
