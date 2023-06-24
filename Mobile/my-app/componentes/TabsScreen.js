import React, { useState } from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Search from "./Search";
import UserHome from "./UserHome";
import HomeScreen from "./screens/HomeScreen";
import TrendingTopicsScreen from "./screens/TrendingTopicsScreen";
import SearchScreen from "./screens/SearchScreen";

import Modal from "./ModalCerrarSesion";
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  const navigation = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

    return(
    <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor: '#c680ff',
      tabBarInactiveTintColor: 'white',
    }}>
      <Tab.Screen 
       name="Home"
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ size }) => (
          <Image
              source={{uri:'https://img.icons8.com/material/24/c680ff/home--v5.png'}}
              style={{ width: size, height: size}}
            />
          ),
          tabBarStyle: { backgroundColor: 'rgb(15, 25, 34)' },
          headerStyle: { backgroundColor: 'rgb(15, 25, 34)' },

          headerTitle: () => (
            <Image
              source={{ uri: 'https://img.icons8.com/ios-glyphs/30/c680ff/twitter--v1.png' }}
              style={styles.headerTitle}
            />
          ),
          headerTitleAlign: 'center',

          headerLeft: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/menu-2.png' }}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
              <Modal isOpen={isModalOpen} toggleModal={toggleModal} navigation={navigation} />
            </View>
          ),
        }}
      />

      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ size }) => (
            <Image
                source={{uri:'https://img.icons8.com/sf-black/128/c680ff/search.png'}}
                style={{ width: size, height: size }}
              />
            ),
            tabBarStyle: { backgroundColor: 'rgb(15, 25, 34)' },
            headerStyle: { backgroundColor: 'rgb(15, 25, 34)' },

            headerTitle: () => (
              <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/30/c680ff/twitter--v1.png' }}
                style={styles.headerTitle}
              />
            ),
            headerTitleAlign: 'center',
  
            headerLeft: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/menu-2.png' }}
                    style={styles.headerIcon}
                  />
                </TouchableOpacity>
                <Modal isOpen={isModalOpen} toggleModal={toggleModal} navigation={navigation} />
              </View>
            ),
          }}
          />

      <Tab.Screen 
        name="TrendingTopics" 
        component={TrendingTopicsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
                source={{uri:'https://img.icons8.com/glyph-neue/64/c680ff/hashtag.png'}}
                style={{ width: size, height: size }}
              />
            ),
            tabBarStyle: { backgroundColor: 'rgb(15, 25, 34)' },
            headerStyle: { backgroundColor: 'rgb(15, 25, 34)' },

            headerTitle: () => (
              <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/30/c680ff/twitter--v1.png' }}
                style={styles.headerTitle}
              />
            ),
            headerTitleAlign: 'center',
  
            headerLeft: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/menu-2.png' }}
                    style={styles.headerIcon}
                  />
                </TouchableOpacity>
                <Modal isOpen={isModalOpen} toggleModal={toggleModal} navigation={navigation} />
              </View>
            ),
          }}
          /> 

      <Tab.Screen 
        name="Perfil" 
        component={UserHome} 
        options={{
          tabBarIcon: ({ size }) => (
            <Image
                source={{uri:'https://img.icons8.com/material-rounded/24/c680ff/user.png'}}
                style={{ width: size, height: size }}
              />
            ),
            tabBarStyle: { backgroundColor: 'rgb(15, 25, 34)' },
            headerStyle: { backgroundColor: 'rgb(15, 25, 34)' },

            headerTitle: () => (
              <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/30/c680ff/twitter--v1.png' }}
                style={styles.headerTitle}
              />
            ),
            headerTitleAlign: 'center',
  
            headerLeft: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/ios-glyphs/30/ffffff/menu-2.png' }}
                    style={styles.headerIcon}
                  />
                </TouchableOpacity>
                <Modal isOpen={isModalOpen} toggleModal={toggleModal} navigation={navigation} />
              </View>
            ),
          }}
          />

    </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  headerTitle: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
});

export default TabScreen;