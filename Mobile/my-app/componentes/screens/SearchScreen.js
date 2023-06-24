import React from 'react' 
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from '../User';
import Search from '../Search';



const SearchScreen = () => {
    const SearchStack = createNativeStackNavigator();
    return (
        <SearchStack.Navigator>
        <SearchStack.Screen name="SearchScreen" component={Search} options={{ headerShown: false }}/>
        <SearchStack.Screen name="User" component={User} options={{ headerShown: false }}/>
        </SearchStack.Navigator>
    )
}

export default SearchScreen;