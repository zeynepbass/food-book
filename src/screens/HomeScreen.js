import Toast from "react-native-toast-message";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import ScreenContainer from "../components/ScreenContainer";
import EmptyState from "../components/EmptyState";
import { usePosts } from "../hooks/usePosts";
import { addFavorite } from "../services/favorites";

const HomeScreen = () => {
  const { posts, loading, error } = usePosts();

  const handleFavorite = async (item) => {
    const added = await addFavorite(item);
    Toast.show({
      type: added ? "success" : "info",
      text1: added ? "Favorilere eklendi ❤️" : "Zaten favorilerde",
      text2: item.title,
      visibilityTime: 1500,
    });
  };

  return (
    <ScreenContainer>
      <SearchBar data={posts} />
      {error ? (
        <EmptyState message="Tarifler yüklenemedi. Bağlantını kontrol edip tekrar dene." />
      ) : !loading && posts.length === 0 ? (
        <EmptyState message="Henüz tarif yok. Profil sekmesinden ilk tarifini ekle." />
      ) : (
        <>
          <Slider data={posts.slice(0, 5)} />
          <Card columns={2} data={posts} onFavorite={handleFavorite} />
        </>
      )}
    </ScreenContainer>
  );
};

export default HomeScreen;
