import { useState, useEffect } from 'react';

import { ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import { getPosts } from '../utils/api';
const HomeScreen = () => {
    const [data,setData]=useState([])
      const fetchData=async()=>{
        try {
       const res= await getPosts()
       setData(res)
        } catch (error) {
           console.log(error)
        }
      }
      useEffect(() => {
        fetchData()
    
      }, []);
  return (
    <SafeAreaView
      style={{
   
        paddingTop: Platform.OS === "android" ? 90 : 60, 
      }}
    >
      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
       <SearchBar data={data} />
        <Slider style={{ height: 200, marginBottom: 16 }}  data={data}/>
        <Card columns={2} data={data} setIcons={false} /> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
