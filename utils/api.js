import { db } from "../firebase"; 
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const postsRef = collection(db, "posts");


export const addPost = async (post) => {
  try {
    await addDoc(postsRef, post);
    console.log("✅ Post başarıyla eklendi");
  } catch (error) {
    console.error("Ekleme hatası:", error);
  }
};


export const getPosts = async () => {
  const querySnapshot = await getDocs(postsRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const updatePost = async (id, updatedData) => {
  const postRef = doc(db, "posts", id);
  await updateDoc(postRef, updatedData);
};


export const deletePost = async (id) => {
  const postRef = doc(db, "posts", id);
  await deleteDoc(postRef);
};
export const getPostDetail = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
};