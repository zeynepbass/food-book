import { useState } from "react";
import { TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import ScreenContainer from "../components/ScreenContainer";
import EmptyState from "../components/EmptyState";
import PostFormModal from "../components/PostFormModal";
import { usePosts } from "../hooks/usePosts";
import { deletePost } from "../services/posts";
import { removeFavorite } from "../services/favorites";
import { colors } from "../theme/colors";

const confirm = (message) => {
  if (Platform.OS === "web") return Promise.resolve(window.confirm(message));
  return new Promise((resolve) =>
    Alert.alert("Emin misin?", message, [
      { text: "Vazgeç", style: "cancel", onPress: () => resolve(false) },
      { text: "Sil", style: "destructive", onPress: () => resolve(true) },
    ])
  );
};

const UserScreen = () => {
  const { posts, loading, error, refresh } = usePosts();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openCreate = () => {
    setSelectedId(null);
    setModalOpen(true);
  };

  const openEdit = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    if (!(await confirm("Bu tarif kalıcı olarak silinecek."))) return;
    try {
      await deletePost(id);
      await removeFavorite(id);
      await refresh();
      Toast.show({ type: "success", text1: "Silindi 🗑️", visibilityTime: 1500 });
    } catch (err) {
      console.error(err);
      Toast.show({ type: "error", text1: "Hata ❌", text2: "Silme başarısız oldu" });
    }
  };

  return (
    <ScreenContainer>
      <SearchBar data={posts} />
      <TouchableOpacity style={styles.addButton} onPress={openCreate}>
        <Feather name="plus" size={22} color={colors.white} />
      </TouchableOpacity>

      {error ? (
        <EmptyState message="Tarifler yüklenemedi. Bağlantını kontrol edip tekrar dene." />
      ) : !loading && posts.length === 0 ? (
        <EmptyState message="Henüz tarif eklemedin. + ile başla." />
      ) : (
        <Card columns={2} data={posts} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <PostFormModal open={modalOpen} onClose={closeModal} onSaved={refresh} selectedId={selectedId} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginRight: 16,
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserScreen;
