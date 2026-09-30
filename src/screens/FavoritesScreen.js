import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import ScreenContainer from "../components/ScreenContainer";
import EmptyState from "../components/EmptyState";
import { getFavorites, removeFavorite } from "../services/favorites";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites).catch(console.error);
    }, [])
  );

  const handleRemove = async (id) => {
    setFavorites(await removeFavorite(id));
  };

  return (
    <ScreenContainer>
      <SearchBar data={favorites} />
      {favorites.length === 0 ? (
        <EmptyState message="Favori listen boş. Ana sayfadaki ❤️ ile ekleyebilirsin." />
      ) : (
        <Card columns={1} data={favorites} onDelete={handleRemove} />
      )}
    </ScreenContainer>
  );
};

export default FavoritesScreen;
