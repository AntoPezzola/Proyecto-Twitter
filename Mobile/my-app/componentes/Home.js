import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Tweet from './Tweet';
import useService from './service/useService';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';



const Home = () => {

  const [tweets, setTweets] = useState([]);
  const { getTws } = useService({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    getTws().then(tws => {
      setTweets(tws);
      setLoading(false);
    })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleTw = () => {
    navigation.navigate('Box', { type: 'tweet' })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
          <Spinner visible={loading} textContent={'Cargando...'} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(15, 25, 34)' }}>
              <View>
                  {tweets.length === 0 ? (
                    <View>
                      <Text> Agrega tu primer Tweet!</Text>
                    </View>
                  ) : null}
              </View>

              <View>
                <TouchableOpacity style={styles.buttomAgregarTw} onPress={handleTw}>
                  <Text style={styles.buttonText}> Agregar Tweet </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tweets}>

                {tweets.map(tweet => (
                  <Tweet navigation={navigation} key={tweet.id} tw={tweet} />
                ))}
              </View>
          </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(15, 25, 34)',
},
  buttonText: {
    color: "white",
    fontSize: 18,
    marginTop: 4,
    textAlign: "center",
  },
  buttomAgregarTw: {
    backgroundColor: "#7B5EBF",
    borderRadius: 20,
    width: 160,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    paddingBottom: 4
  },
  tweets: {
    marginLeft: 20,
    marginRight: 26
  }
});

export default Home;