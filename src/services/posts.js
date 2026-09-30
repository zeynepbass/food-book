import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const POSTS = "posts";
const postsRef = collection(db, POSTS);

export const addPost = (post) => addDoc(postsRef, post);

// Eski kayıtlarda createdAt olmayabilir; Firestore orderBy bunları dışarıda bırakacağı için sıralama istemcide yapılıyor.
const createdAtOf = (post) => post.createdAt?.seconds ?? 0;

export const getPosts = async () => {
  const snapshot = await getDocs(postsRef);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => createdAtOf(b) - createdAtOf(a));
};

export const getPostDetail = async (id) => {
  const snapshot = await getDoc(doc(db, POSTS, id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const updatePost = (id, data) => updateDoc(doc(db, POSTS, id), data);

export const deletePost = (id) => deleteDoc(doc(db, POSTS, id));
