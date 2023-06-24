import React from "react";
import Tweet from "./Tweet";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Retweet = ({ rtw }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.retweet}>
            {rtw && (
                <Tweet navigation={navigation} key={rtw.id} tw={rtw}></Tweet>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    retweet: {
        marginLeft: -150,
        marginRight: -60
        //marginHorizontal: 110
       
      }
      
  });


export default Retweet;

