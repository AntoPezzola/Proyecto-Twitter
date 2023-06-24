import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const ModalCerrarSesion = ({ isOpen, toggleModal }) => {
  const navigation = useNavigation();

  if (!isOpen) {
    return null;
  }

  const handleCerrarSesion = () => {
    navigation.navigate('Login')
    AsyncStorage.clear();
    toggleModal(); 
  };

  const handleCancelar = () => {
    toggleModal(); 
  };


  return (
    <Modal transparent={true} visible={true} onRequestClose={toggleModal}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPressOut={toggleModal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.question}>¿Seguro que deseas cerrar sesión?</Text>
          <View style={styles.buttonsModal}>
          <TouchableOpacity style={styles.buttonCancelar} onPress={handleCancelar}>
            <Text style={styles.buttonTextCancelar}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCerrarSesion} onPress={handleCerrarSesion}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 12
  },
  question: {
    color: '#7B5EBF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonsModal: {
    flexDirection: 'row',
  },
  buttonCerrarSesion: {
    backgroundColor: "#7B5EBF",
    borderRadius: 20,
    width: 120,
    height: 40,
    marginTop: 20,
    marginLeft: 14,
    justifyContent: "center",
    paddingBottom: 4
  },
  buttonText: {
    color: '#FFFFFF', 
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonCancelar: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 120,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    paddingBottom: 4,
    borderColor: '#7B5EBF', 
    borderWidth: 2 
  },
  buttonTextCancelar: {
    color: '#7B5EBF', 
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default ModalCerrarSesion;
