import { Image } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './componentes/Login';
import Register from './componentes/Register';
import Home from './componentes/Home';
import User from './componentes/User';
import UserHome from './componentes/UserHome';
import TrendingTopics from './componentes/TrendingTopics';
import TabScreen from './componentes/TabsScreen';
import Box from './componentes/Box';
import TweetDisplay from './componentes/TweetDisplay';
import Retweet from './componentes/Retweet';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="UserHome" component={UserHome} />
          <Stack.Screen name="TrendingTopics" component={TrendingTopics} />
          <Stack.Screen name="Tabs" component={TabScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name="Box" component={Box} options={{
            headerTitle: () => (
              <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/30/c680ff/twitter--v1.png' }}
                style={{ width: 34, height: 34 }} />
            ),
            headerTitleAlign: 'center',
            headerShown: true,
          }} />
          <Stack.Screen name="TweetDisplay" component={TweetDisplay} />
          <Stack.Screen name="Retweet" component={Retweet} />


        </Stack.Navigator>
      </NavigationContainer>





  );
}


