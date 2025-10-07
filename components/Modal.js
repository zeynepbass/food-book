

import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { addPost, getPostDetail, updatePost } from "../utils/api";
import Toast from "react-native-toast-message";

export default function AddPostModal({ open, setOpen, onSave, selected }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [score, setScore] = useState("");

  const [detail, setDetail] = useState(null);
  const fetchDetail = async (id) => {
    if (!id) return;
    try {
      const res = await getPostDetail(id);
      if (res) {
        setDetail(res);
        setTitle(res.title);
        setDescription(res.description);
        setPhoto(res.photo);
        setScore(res.score.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selected) fetchDetail(selected);
  }, [selected]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!title || !description || !photo || !score) {
      alert("Lütfen tüm alanları doldur!");
      return;
    }
    

    try {
      if (selected) {
        await updatePost(selected, {
          title,
          description,
          photo,
          score: Number(score),
        });
        Toast.show({
          type: "success",
          text1: "Güncellendi ✅",
          text2: `${title} başarıyla güncellendi`,
          position: "top",
          visibilityTime: 2000,
        });
      } else {
      
        await addPost({
          title,
          description,
          photo,
          score: Number(score),
          createdAt: new Date(),
        });
        Toast.show({
          type: "success",
          text1: "Başarılı ✅",
          text2: `${title} başarıyla eklendi`,
          position: "top",
          visibilityTime: 2000,
        });
      }
 
      setTitle("");
      setDescription("");
      setPhoto(null);
      setScore("");
      setDetail(null);
      setOpen(false);
      onSave(); 
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Hata ❌",
        text2: "İşlem başarısız oldu",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <Modal visible={open} onRequestClose={() => setOpen(false)} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>{selected ? "📤 Yemek Güncelle" : "📤 Yeni Yemek Ekle"}</Text>

          <TextInput
            style={styles.input}
            placeholder="Başlık"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Açıklama"
            value={description}
            onChangeText={setDescription}
          />

          {photo ? (
            <Image source={{ uri: photo }} style={{ width: 200, height: 200, margin: 10, alignSelf: "center", borderRadius: 10 }} />
          ) : (
            <Text style={{ color: "gray", textAlign: "center", padding: 5 }}>Fotoğraf seçilmedi</Text>
          )}
          <TouchableOpacity onPress={pickImage} style={styles.photoBtn}>
            <Text style={{ color: "gray", textAlign: "center" }}>{photo ? "Fotoğraf Seçildi" : "Fotoğraf Seç"}</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Puan (1-5)"
            value={score}
            onChangeText={setScore}
            keyboardType="numeric"
          />

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={handleSave} style={styles.save}>
              <Text style={{ color: "white", textAlign: "center" }}>{selected ? "Güncelle" : "Kaydet"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.closeBtn}>
              <Text style={{ color: "white", textAlign: "center" }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modal: { backgroundColor: "white", padding: 20, borderRadius: 15, width: "85%" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
  save: { backgroundColor: "rgb(151,10,18)", borderRadius: 10, margin: 5, padding: 10 },
  closeBtn: { backgroundColor: "#333", padding: 10, borderRadius: 10 },
  photoBtn: { borderColor: "rgb(234,232,233)", borderWidth: 1, padding: 10, width: 150, margin: "auto", borderRadius: 20, marginBottom: 10 },
});
