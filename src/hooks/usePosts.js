import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getPosts } from "../services/posts";

// Ekran her odaklandığında listeyi yeniler; başka sekmede yapılan değişiklikler de görünür.
export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setPosts(await getPosts());
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return { posts, loading, error, refresh };
};
