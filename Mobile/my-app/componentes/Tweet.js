import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import useService from "./service/useService";
import Retweet from "./Retweet";
import { useNavigation } from "@react-navigation/native";

const Tweet = ({ tw }) => {

  const [tweet, setTweet] = useState(tw);
  const [userTw, setUserTw] = useState("");
  const { getUserById, likeTweet, getUser } = useService({});
  const [userToken, setUserToken] = useState({});
  const navigation = useNavigation()

  const handlerNavigate = () => {
    navigation.navigate('User', { userId: userTw.id })
  };

  useEffect(() => {
    getUserById(tweet.user.id).then(usr => {
      setUserTw(usr);
    });

    getUser().then(user => {
      setUserToken(user);
    })

  }, [tweet]);


  const imageUrlRtw = "https://img.icons8.com/ios-filled/50/7950F2/retweet.png";
  const heartEmpty = 'https://img.icons8.com/sf-black/64/a467c1/like.png';
  const heartFilled = 'https://img.icons8.com/sf-ultralight-filled/25/a467c1/like.png';
  const imagenTw = tweet ? tweet.type.image : "";
  const conditionLike = tweet && tweet.likes.find(likes => likes.id == userToken.id)


  const handleLike = () => {
    likeTweet(tweet.id).then((twt) => {
      const { retweet, replies, ...twDto } = twt;
      twDto.retweetAmount = retweet.length;
      twDto.repliesAmount = replies.length;
      setTweet(twDto);
    });
  }

  const handleReply = () => {
    navigation.navigate('Box', { type: 'replay', id: tweet.id })
  }
  const handleRetweet = () => {
    navigation.navigate('Box', { type: 'retweet', id: tweet.id })
  }

  const abrirTweet = () => {
    navigation.navigate('TweetDisplay', {type: 'tweet', tweetId: tweet.id})
  }

  return (
    <View style={styles.container}>
        <View style={styles.logoRtw}>
            {tweet.retweetAmount > 0 ? 
                (<Image style={styles.buttonImage} source={{ uri: imageUrlRtw}} />) : null} 
            {tweet.retweetAmount > 0 ? 
                <Text style={styles.retweeteado}>Retweeteado</Text> : null} 
        </View>
        <View style={styles.content}>
            <View>
              <TouchableOpacity onPress={handlerNavigate} style={styles.buttonContainer}>
                <Image style={styles.buttonImage} source={{ uri: userTw.image }} />
                <Text style={styles.buttonText}>{userTw.username}</Text>
              </TouchableOpacity>

              <Text style={styles.tweetText}>{tweet && tweet.content}</Text>
              <TouchableOpacity onPress={abrirTweet}><Text>Abrir Tweet</Text></TouchableOpacity>
              {imagenTw && <Image style={styles.image} source={{ uri: imagenTw }} />}

                {(tweet.type.tweet && tweet.type.tweet.retweetAmount > 0 &&
                          (<View>
                              { <Retweet rtw={tweet.type.tweet}></Retweet>}
                          </View>)     
                )}

              <View style={styles.infoRt}>
                <TouchableOpacity onPress={handleLike} style={styles.button}>
                  {conditionLike ? <Image style={styles.emptyHeart} source={{ uri: heartFilled }} /> : <Image style={styles.emptyHeart} source={{ uri: heartEmpty }} />}
                  <Text style={styles.infoText}>{tweet && tweet.likes.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleReply} style={styles.button}>
                  <Image style={styles.iconReplay} source={{ uri: 'https://img.icons8.com/ios-glyphs/30/a467c1/speech-bubble--v1.png' }} />
                  <Text style={styles.infoText}>{tweet && tweet.repliesAmount}</Text>
                  <Text style={styles.infoText}>{tweet && tweet.replies && tweet.replies.length}</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={handleRetweet} style={styles.button}>
                  <Image style={styles.iconRt} source={{ uri: 'https://img.icons8.com/sf-black-filled/64/a467c1/retweet.png' }} />
                  <Text style={styles.infoText}>{ tweet && tweet.retweetAmount}</Text>
                  <Text style={styles.infoText}>{ tweet && tweet.retweet && tweet.retweet.length}</Text>

                </TouchableOpacity>
              </View>

              <Text style={styles.infoData}>{tweet && tweet.date}</Text>
            </View>
        </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 40,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#15202B',
    borderRadius: 5,
  },
  logoRtw: {
    position: 'absolute',
    top: 0,
    left: "80%",
    alignSelf: 'center',
  },
  retweeteado: {
    color: '#7950f2',
  },
  content: {
    //flex: 1,
    //borderWidth: 1, // line del medio 
    //borderColor: 'gray',
    //backgroundColor: '#FFFFFF',
  },
  tweetText: {
    marginTop: 5,
    marginLeft: 10,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: -40,
    marginTop: -20,
    backgroundColor: '#15202B',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 100,
  },
  buttonImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 260,
    height: 260,
    marginLeft: 8,
    marginTop: 6,
    resizeMode: "cover",
    borderRadius: 20,
  },
  infoRt: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  infoText: {
    marginRight: 10,
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
  infoData: {
    color: 'white',
    fontSize: 10,
    marginLeft: 8,
  },
  emptyHeart: {
    width: 30,
    height: 30,
  },
  iconReplay: {
    width: 24,
    height: 24,
  },
  iconRt: {
    width: 30,
    height: 30,
  }
});
export default Tweet; 
