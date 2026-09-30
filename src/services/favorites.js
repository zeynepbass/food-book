import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "favori";

export const getFavorites = async () => {
  const raw = await AsyncStorage.getItem(KEY);
  const parsed = raw ? JSON.parse(raw) : [];
  return Array.isArray(parsed) ? parsed : [];
};

const saveFavorites = (list) => AsyncStorage.setItem(KEY, JSON.stringify(list));

export const addFavorite = async (item) => {
  const list = await getFavorites();
  if (list.some((fav) => fav.id === item.id)) return false;
  await saveFavorites([...list, item]);
  return true;
};

export const removeFavorite = async (id) => {
  const list = (await getFavorites()).filter((fav) => fav.id !== id);
  await saveFavorites(list);
  return list;
};
