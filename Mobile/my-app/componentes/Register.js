import React, {useState }from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useService from './service/useService';
import { useNavigation } from '@react-navigation/native';

const Register = () => {

  const imageUrl = 'https://img.icons8.com/nolan/64/twitter.png';
  const { register } = useService({ navigation }); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState("");
  const navigation = useNavigation();


  const handleRegister = () => {
    register(username, email, password, image, backgroundImage)
    .catch(error => {
      setError(error.response.data.title);
    });
};


  return (
    <View style={styles.container}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.title}>Registrate</Text>

        <View>
        {error ? (
          <View style={styles.error}>
            <Text style={styles.errorText}> {error} </Text>
          </View>
        ) : null}
      </View>
        
        <TextInput style={styles.input} placeholder="Nombre de usuario" value={username} onChangeText={setUsername}/>

        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry/>

        <TextInput style={styles.input} placeholder="email" value={email} onChangeText={setEmail}/>

        <TextInput style={styles.input} placeholder="Imagen" value={image} onChangeText={setImage}/>

        <TextInput style={styles.input} placeholder="BackgroundImage" value={backgroundImage} onChangeText={setBackgroundImage}/>
 
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrate</Text>
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
        marginTop: 20,
        width: 360,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      button: {
        backgroundColor: '#7B5EBF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20
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

export default Register;