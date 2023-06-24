import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet} from "react-native"
import useService from "./service/useService";
import { ScrollView } from "react-native-gesture-handler";
import Tweet from "./Tweet";
import { useNavigation } from "@react-navigation/native";

const TweetDisplay  = ( { route  }) => { 

    const { getTwById } = useService({});  
    const [ tweet, setTweet] = useState(""); 
    const navigation = useNavigation();
    
    const tweetId = route.params.tweetId;
    const type = route.params.type;
    const tw = route.params.tw;

    useEffect(() => {
    getTwById(tweetId).then(tw => {
        setTweet(tw); 
    })
    }, []);

    return(
        <View style={styles.container}>
        <ScrollView>
            <View style={styles.reply}>
                {type && type === 'replay' && (
                    <View style={styles.reply}>
                        <Tweet key={tw.id} tw={tw}></Tweet>
                        {tw.replies.map(tuit => <Tweet navigation={navigation} key={tuit.id} tw={tuit}></Tweet>)}
                    </View>
                )}
            </View>
            <View>
                {type && (type === 'retweet' || type === 'tweet') && (
                    <View style={styles.tweet}>
                        {tweet ? <Tweet navigation={navigation} key={tweet.id} tw={tweet}></Tweet>
                               : <Text>cargando..</Text> 
                        }
                    </View>               
                )}
            </View>
        </ScrollView>
        </View>
    ); 

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15202B',
      },
    reply: {
        marginLeft: -50,
        marginRight: -50,
    },
    tweet: {
        marginLeft: -90,
        marginRight: -90
    }
      
  });

export default TweetDisplay; 