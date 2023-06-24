import React from 'react' 
import { Image } from 'react-native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import Box from '../Box';
import User from '../User';
import TweetDisplay from '../TweetDisplay';


const HomeStackScreen = () => {
    const HomeStack = createNativeStackNavigator();
    return (
        <HomeStack.Navigator>
        <HomeStack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }}/>
        <HomeStack.Screen name="Box" component={Box} options={{ headerShown: false }}/>
        <HomeStack.Screen name="User" component={User} options={{ headerShown: false }}/>
        <HomeStack.Screen name="TweetDisplay" component={TweetDisplay} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;