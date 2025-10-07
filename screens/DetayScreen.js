import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useEffect,useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {getPostDetail} from "../utils/api"
const { width, height } = Dimensions.get("window");

const DetayScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    topBar: {
      height: height * 0.4,
      backgroundColor: "rgb(151,10,18)",
      borderBottomLeftRadius: width / 2, 
      borderBottomRightRadius: width / 2,
    },
    imageContainer: {
      position: "absolute",
      top: height * 0.15, 
      width: "100%",
      alignItems: "center",
    },
    image: {
      width: 300,
      height: 300,
      borderRadius:10
    },
    content: {
      marginTop: height*0.10, 
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: "#555",
      marginBottom: 15,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    score: {
      fontWeight: "bold",
      fontSize: 16,
    },
    fav: {
      fontWeight: "bold",
      color: "rgb(151,10,18)",
    },
  });
  const router=useRoute();
  const {id}=router.params;
  const [detailData,setDetailData]=useState(null)
  const fetchData=async(id)=>{
    try {
      const res=await getPostDetail(id)
      setDetailData(res)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchData(id)},[id])
  return (
    <ScrollView style={styles.container}>

      <View style={styles.topBar}></View>


      <View style={styles.imageContainer}>
        <Image
   source={{ uri: detailData?.photo }}
   style={styles.image}
   resizeMode="cover"
        />
      </View>


      <View style={styles.content}>
        <Text style={styles.title}>{detailData?.title}</Text>
        <Text style={styles.description}>
        {detailData?.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.score}>⭐{detailData?.score}</Text>
          <Text style={styles.fav}>Favorilere Ekle</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetayScreen;


