import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#rgba(59, 10, 10, 0.5)',
          tabBarStyle: { backgroundColor: 'pink' },
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
            shadowRadius: 5
          }
        }}
        
          >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Ana Sayfa",
            tabBarIcon: ({ color, focused }) => (
              <Feather name="home" size={focused ? 30 : 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favori"
          component={FavoriteScreen}
          options={{
            title: "Favoriler",
            tabBarIcon: ({ color, focused }) => (
              <Feather name="heart" size={focused ? 30 : 24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            title: "Hoş Geldin",

            tabBarIcon: ({ color, focused }) => (
              <Feather name="user" size={focused ? 30 : 24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
