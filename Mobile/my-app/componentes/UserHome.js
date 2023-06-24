import { Text, View, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import useService from "./service/useService";
import { ScrollView } from "react-native-gesture-handler";
import Tweet from "./Tweet";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";



const UserHome = () => {

    const { getUser } = useService({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getUser()
          .then((usr) => {
            setUser(usr);
            setLoading(false); 
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);


    return (
        <ScrollView>
                  <Spinner visible={loading} textContent={<Text>Cargando...</Text>} />
            <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(15, 25, 34)' }}>
                <Image style={styles.backgroundImage} source={{ uri: user.backgroundImage }} />

                <Image style={styles.imagePerfil} source={{ uri: user.image }} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    {user.username}
                </Text>

                <View style={styles.dates}>
                    <View style={styles.followers}>
                        <Text style={{ color: 'white' }}>
                            {user.followers?.length || 0} Followers
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}>
                            {user.following?.length || 0} Following
                        </Text>
                    </View>
                </View>
                <View style={styles.tweet}>
                {user.tweets && user.tweets.length > 0 && user.tweets.map(tweet => (
                  <Tweet navigation={navigation} key={tweet.id} tw={tweet} />
                ))}
            </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: 500,
        height: 200
    },
    imagePerfil: {
        marginTop: - 55,
        borderRadius: 60,
        width: 120,
        height: 120
    },
    dates:{
        display: 'flex',
        flexDirection: 'row',
        
    },
    tweet: {
        marginLeft: 20,
        marginRight: 26
    },
    followers: {
        marginRight:10
    }
})

export default UserHome;