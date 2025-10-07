
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {TouchableOpacity} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import DetayScreen from "./screens/DetayScreen";
import Toast from 'react-native-toast-message';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTab = () => {
  const navigation=useNavigation()
  return (
    <Tab.Navigator
      initialRouteName="Home"

      screenOptions={({ navigation }) => ({
        headerTitle: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={{ uri: "https://png.pngtree.com/png-clipart/20250111/original/pngtree-a-chef-holding-hamburger-and-fries-png-image_20111871.png" }}
              style={{ width: 70, height: 100, resizeMode: "contain" }}
            />

        
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "rgba(59, 10, 10, 0.5)",
        headerTitleAlign: "center",
        headerTransparent: true,
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgb(151,10,18)",
          height: 70,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{

          tabBarIcon: ({ color, focused }) => (
            <Feather name="home" size={focused ? 30 : 24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favori"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather name="heart" size={focused ? 30 : 24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" size={focused ? 30 : 24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {

  return (
    <>    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          
          component={BottomTab}
          options={{ headerShown: false,title:"" }}
        />
        <Stack.Screen
          name="Detay"
          component={DetayScreen}
          options={{
            title: "Detay",
            headerStyle: { backgroundColor: "transparent" },
            headerTransparent: true,
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
              <Toast />
    </>

  );
}
