import { useState, useEffect } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { addPost, getPostDetail, updatePost } from "../services/posts";
import { colors } from "../theme/colors";

// Firestore doküman limiti 1 MB; base64 fotoğraf için pay bırakılıyor.
const MAX_PHOTO_LENGTH = 900 * 1024;

const emptyForm = { title: "", description: "", photo: null, score: "" };

const toDataUri = (asset) => {
  if (asset.base64) return `data:${asset.mimeType ?? "image/jpeg"};base64,${asset.base64}`;
  return asset.uri;
};

const showToast = (type, text1, text2) =>
  Toast.show({ type, text1, text2, position: "top", visibilityTime: 2000 });

export default function PostFormModal({ open, onClose, onSaved, selectedId }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(selectedId);

  const setField = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!open) return;
    if (!selectedId) {
      setForm(emptyForm);
      return;
    }
    getPostDetail(selectedId)
      .then((post) => {
        if (!post) return;
        setForm({
          title: post.title ?? "",
          description: post.description ?? "",
          photo: post.photo ?? null,
          score: post.score != null ? String(post.score) : "",
        });
      })
      .catch(() => showToast("error", "Hata ❌", "Tarif yüklenemedi"));
  }, [open, selectedId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (result.canceled) return;

    const photo = toDataUri(result.assets[0]);
    if (photo.length > MAX_PHOTO_LENGTH) {
      showToast("error", "Fotoğraf çok büyük", "Daha küçük bir fotoğraf seç");
      return;
    }
    setField("photo")(photo);
  };

  const handleSave = async () => {
    const { title, description, photo } = form;
    const score = Number(form.score);

    if (!title.trim() || !description.trim() || !photo || !form.score) {
      showToast("error", "Eksik bilgi", "Lütfen tüm alanları doldur");
      return;
    }
    if (!Number.isFinite(score) || score < 1 || score > 5) {
      showToast("error", "Geçersiz puan", "Puan 1 ile 5 arasında olmalı");
      return;
    }

    const payload = { title: title.trim(), description: description.trim(), photo, score };

    setSaving(true);
    try {
      if (isEdit) {
        await updatePost(selectedId, payload);
        showToast("success", "Güncellendi ✅", `${payload.title} başarıyla güncellendi`);
      } else {
        await addPost({ ...payload, createdAt: new Date() });
        showToast("success", "Başarılı ✅", `${payload.title} başarıyla eklendi`);
      }
      onSaved?.();
      onClose();
    } catch (error) {
      console.error(error);
      showToast("error", "Hata ❌", "İşlem başarısız oldu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={open} onRequestClose={onClose} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>{isEdit ? "📤 Yemek Güncelle" : "📤 Yeni Yemek Ekle"}</Text>

          <TextInput
            style={styles.input}
            placeholder="Başlık"
            value={form.title}
            onChangeText={setField("title")}
          />
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Açıklama"
            value={form.description}
            onChangeText={setField("description")}
            multiline
          />

          {form.photo ? (
            <Image source={{ uri: form.photo }} style={styles.preview} />
          ) : (
            <Text style={styles.hint}>Fotoğraf seçilmedi</Text>
          )}
          <TouchableOpacity onPress={pickImage} style={styles.photoBtn}>
            <Text style={styles.photoBtnText}>{form.photo ? "Fotoğrafı Değiştir" : "Fotoğraf Seç"}</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Puan (1-5)"
            value={form.score}
            onChangeText={setField("score")}
            keyboardType="numeric"
            maxLength={1}
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={handleSave} style={styles.save} disabled={saving}>
              <Text style={styles.buttonText}>{saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Kaydet"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.buttonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modal: { backgroundColor: colors.white, padding: 20, borderRadius: 15, width: "85%", maxWidth: 420 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: colors.border, padding: 10, borderRadius: 8, marginBottom: 10 },
  multiline: { minHeight: 60, textAlignVertical: "top" },
  preview: { width: 200, height: 150, margin: 10, alignSelf: "center", borderRadius: 10 },
  hint: { color: "gray", textAlign: "center", padding: 5 },
  photoBtn: {
    borderColor: "rgb(234,232,233)",
    borderWidth: 1,
    padding: 10,
    width: 170,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  photoBtnText: { color: "gray", textAlign: "center" },
  actions: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  save: { backgroundColor: colors.primary, borderRadius: 10, margin: 5, paddingVertical: 10, paddingHorizontal: 16 },
  closeBtn: { backgroundColor: colors.dark, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  buttonText: { color: colors.white, textAlign: "center" },
});
