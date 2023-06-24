import React from 'react' 
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from '../User';
import TrendingTopics from '../TrendingTopics';



const TrendingTopicsStackScreen = () => {
    const TrendingStack = createNativeStackNavigator();
    return (
        <TrendingStack.Navigator>
        <TrendingStack.Screen name="TrendingTopicsStack" component={TrendingTopics} options={{ headerShown: false }}/>
        <TrendingStack.Screen name="User" component={User} options={{ headerShown: false }}/>
        </TrendingStack.Navigator>
    )
}

export default TrendingTopicsStackScreen;