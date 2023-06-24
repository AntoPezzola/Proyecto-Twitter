import React, { useEffect, useState } from "react";
import { View, Text , StyleSheet, Image, TouchableOpacity} from "react-native";
import useService from "./service/useService";
import Tweet from "./Tweet";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const User = ( { route  }) => { 
    
  const { userId } = route.params;
  const [userParam ,setUserParam] = useState("");  
  const { getUserById, follow, getUser } = useService({});
  const [userToken, setUserToken] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
      getUserById(userId).then(usr => {
        setUserParam(usr);
      });
      getUser().then(user => {
        setUserToken(user);
      })

    }, []);

  /*const handleHome = () => {
    navigation.navigate('Tabs');
  }*/

  const handleSeguir = () => {
    follow(userId).then(user => {
      setUserParam(user);
    })
  }

  return (
    <ScrollView> 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(15, 25, 34)' }}>
            <Image style={styles.backgroundImage} source={{ uri: userParam.backgroundImage}} />
            <Image style={styles.imagePerfil} source={{ uri: userParam.image }} />
            
            <Text style={{color:'white', fontSize: 20, fontWeight: 'bold'}}>
              {userParam.username}
            </Text>

            <View style={styles.dates}>
              <View> 
                  <Text style={styles.follow}>
                      {userParam.followers?.length || 0} Followers
                    </Text> 
              </View>
              <View> 
                  <Text style={{color:'white'}}>
                    {userParam.following?.length || 0} Following
                  </Text> 
              </View>
            </View>

            <View>
                <TouchableOpacity onPress={handleSeguir}>
                    <Text style={styles.buttonSeguir}>
                        {userParam.following?.find(userFollowing => userFollowing.id == userToken.id ) ? "Dejar de Seguir" : "Seguir"}
                    </Text> 
                </TouchableOpacity>
            </View>

            {/* <View>
                <TouchableOpacity style={styles.btnHome} onPress={handleHome}>
                <Text style={styles.buttonText}>Ir a Home</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.tweet}>
                {userParam.tweets && userParam.tweets.length > 0 && userParam.tweets.map(tweet => (
                  <Tweet navigation={navigation} key={tweet.id} tw={tweet} />
                ))}
            </View>
        </View> 
    </ScrollView>
    

  );
};
  const styles = StyleSheet.create({
    backgroundImage: {
      width: 500,
      height:200
    },
    imagePerfil: {
      marginTop: - 55,
      borderRadius: 60,
      width: 120,
      height: 120
    },
    container: {
      borderColor: 'gray'
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonSeguir:{
      paddingLeft: 5,
      width: 120,
      borderRadius:20,
      marginTop:5,
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor:"#7B5EBF",
      textAlign: 'center',
    },
    dates:{
      display: 'flex',
      flexDirection: 'row',
      
    },
    tweet: {
      marginLeft: 20,
      marginRight: 26
    },
    follow: {
      color: "white",
      marginRight: 10
    }
  })

export default User; 