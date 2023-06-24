import { Text, TouchableOpacity, View, TextInput , StyleSheet } from "react-native";
import useService from "./service/useService";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


const Box = ( { route }) => { 

  const { replay, agregarTw, retweet } = useService({});
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(''); 
  const navigation = useNavigation();

  const idTweet = route.params.id;
  
  const Actions = {
      retweet: {
          Action: async () => {
               await retweet(idTweet, content)
                .then(tweet => {
                  let rtw = tweet.retweet[tweet.retweet.length - 1]; 
                  navigation.navigate('TweetDisplay', {tweetId: rtw.id, type:'retweet'})
                }).catch(error =>  {
                  setError(error.response.data.title);
                });
              },
          ActionText: "Añadir Retweet",
          ShowImage: false
      },
      replay: { 
          Action: async () => {
                await replay(idTweet, content, image)
                .then(tweet => {
                  let replyRes = tweet.replies[tweet.replies.length -1];
                  navigation.navigate('TweetDisplay', {tweetId: replyRes.id, type:'replay', tw: tweet})
                }).catch(error =>  {
                setError(error.response.data.REQUEST_BODY[0].message);
              });
            },
          ActionText: "Añadir Reply", 
          ShowImage: true 
      },
      tweet: { 
          Action: async () => {
            await agregarTw(content, image)
            .then(tweet => {
            navigation.navigate('TweetDisplay', {tweetId: tweet.id , type: 'tweet'})
            })
            .catch(error => {
                setError(error.response.data.title);
              });
            },
          ActionText: "Añadir Tweet", 
          ShowImage: true },
  };
  
  const { Action, ActionText, ShowImage } = Actions[route.params.type];
  
  return (
    <View style={styles.boxContainer}> 
     <View>
        {error ? (
          <View style={styles.error}>
            <Text style={styles.errorText}> {error} </Text>
          </View>
        ) : null}
      </View>
      <TextInput 
      style={styles.barraComentario} 
      placeholder="Agregar Tweet" 
      value={content} 
      onChangeText={setContent} />

      {ShowImage && <TextInput 
      style={styles.barraImagen} 
      placeholder="Sube una imagen!" 
      onChangeText={setImage} />}

      <TouchableOpacity style={styles.buttomAgregarRt} onPress={Action}>
        <Text style={styles.buttonAction}> {ActionText} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer:{
    justifyContent:"center",
    flex: 1,
    width: '100%',
    height: '100%',
    display:"flex",
    textAlign: "center",
    backgroundColor:'rgb(15, 25, 34)',
    alignItems: 'center',
  },
  barraComentario:{
    color: 'black',
    fontSize:24,
    display: "flex",
    width: 360,
    height: 60,
    justifyContent: 'center',
    backgroundColor:"white",
    paddingHorizontal: 15,
    borderRadius:30,
  },
  buttomAgregarRt:{
    backgroundColor: "#7B5EBF",
    borderRadius:20,
    width: 160,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    paddingBottom: 4
  },
  barraImagen:{
    marginTop: 10,
    color: 'black',
    fontSize:24,
    display: "flex",
    width: 360,
    height: 60,
    justifyContent: 'center',
    backgroundColor:"white",
    paddingHorizontal: 15,
    borderRadius:30,
  },
  buttonAction:{
    color:"white",
    fontSize: 18,
    marginTop: 4,
    textAlign: "center", 
  },
  error: {
    backgroundColor: '#dc143c',
    width: 'auto',
    height: 'auto',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  }, 
  errorText : {
    color: '#FFFFFF'
  }
});

export default Box;
