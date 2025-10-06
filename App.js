import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";
import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import DetayScreen from "./screens/DetayScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: 'rgba(59, 10, 10, 0.5)',
        headerTitleAlign: "center",
        headerTransparent: true,
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent", // burası transparent
          backgroundColor: "rgb(151,10,18)",
          height: 70,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5
        }
      }}
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detay"
          component={DetayScreen}
          options={{ title: "Detay" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
