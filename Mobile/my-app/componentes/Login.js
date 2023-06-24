import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useService from './service/useService';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const { login } = useService({ navigation });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const imageUrl = 'https://img.icons8.com/nolan/64/twitter.png';

  const handleLogin = () => {
    login(username, password)
      .catch(error => {
        setError(error.response.data.title);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View>
        {error ? (
          <View style={styles.error}>
            <Text style={styles.errorText}> {error} </Text>
          </View>
        ) : null}
      </View>


      <TextInput style={styles.input} placeholder="Nombre de usuario" value={username} onChangeText={setUsername} />

      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegistrate} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrate!</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1B143B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#4B3F72',
    color: '#FFFFFF',
    width: 200,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#7B5EBF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonRegistrate: {
    marginTop: 10,
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

export default Login;
