


import {useState,useEffect} from "react";
import { View, Platform, ScrollView, TouchableOpacity, StyleSheet,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import AddModal from "../components/Modal"
import {getPosts,deletePost} from "../utils/api"
const UserScreen = () => {
  const styles = StyleSheet.create({
    button: {
      marginLeft:"auto",
      margin:10,
      backgroundColor: "rgb(151,10,18)",
      borderRadius:50,
      padding: 10,
    },
  });
  const [open,setOpen]=useState(false)
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
  const DeleteHandler = async (id) => {
    try {
      await deletePost(id);
   
    } catch (error) {
      console.log(error);
    }
  };
  const [selected,setSelectedId]=useState(null)
    const UpdateHandler = (id) => {
      if (id) {
        setOpen(true);
        setSelectedId(id);
      }
    };
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
        <View style={{ flex: 1 }}>
        


          <SearchBar data={data} />
          <TouchableOpacity style={styles.button} onPress={()=>setOpen(true)}>
            <Text style={{color:"white"}}>+</Text>
          </TouchableOpacity>
          {open && <AddModal open={open} setOpen={setOpen}   onSave={fetchData} selected={selected} />}

          <Card data={data} onDelete={DeleteHandler} setIcons={true} UpdateHandler={UpdateHandler} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;
