
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      margin: 20
  
    },  
    card: {
      backgroundColor: 'rgb(151,10,18)',
      borderRadius: 16,
      overflow: 'hidden',
      
    },
    iconContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'row',
      zIndex: 10,
    },
    iconButton: {
      marginLeft: 10,
    },
    image: {
      width: '100%',
      height: 150
    },
    content: {
      padding: 12,
      backgroundColor: '#fff',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    description: {
      fontSize: 14,
      color: '#555',
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'end',
    },
    score: {
      fontWeight: 'bold',
      color: '#333',
    },
    fav: {
      color: 'rgb(151,10,18)',
      fontWeight: 'bold',
    },
  });
  const navigation=useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("Detay")}>
    <View style={styles.container} >
    <View style={styles.card}>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="heart-o" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrPHq7um_b7tNpwVrv4qMpnQL9TWFXhWNPA&s' }}
        style={styles.image}
        resizeMode="cover"
      />


      <View style={styles.content}>
        <Text style={styles.title}>Başlık</Text>
        <Text style={styles.description}>Burada açıklama yer alacak. Detaylı bilgi verilebilir.</Text>
        <View style={styles.footer}>
          <Text style={styles.score}>⭐ 4.5</Text>
       
        </View>
      </View>
    </View>
    </View>
    </TouchableOpacity>

  );
};
export default HomeScreen


