import { Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import UserScreen from "../screens/UserScreen";
import DetailScreen from "../screens/DetailScreen";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const logo = require("../../assets/logo.png");

const tabIcon = (name) => ({ color, focused }) => (
  <Feather name={name} size={focused ? 30 : 24} color={color} />
);

const BottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Anasayfa"
    screenOptions={({ navigation }) => ({
      headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Anasayfa")}>
          <Image source={logo} style={{ width: 44, height: 44 }} resizeMode="contain" />
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: colors.white },
      headerShadowVisible: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
      tabBarStyle: {
        backgroundColor: colors.primary,
        height: 70,
        paddingTop: 10,
        borderTopWidth: 0,
      },
    })}
  >
    <Tab.Screen name="Anasayfa" component={HomeScreen} options={{ tabBarIcon: tabIcon("home") }} />
    <Tab.Screen name="Favori" component={FavoritesScreen} options={{ tabBarIcon: tabIcon("heart") }} />
    <Tab.Screen name="Profil" component={UserScreen} options={{ tabBarIcon: tabIcon("user") }} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="Detay"
        component={DetailScreen}
        options={{
          title: "Detay",
          headerTransparent: true,
          headerTintColor: colors.white,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
