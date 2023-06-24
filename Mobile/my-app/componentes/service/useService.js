import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const useService = () => {

  const navigation = useNavigation();


  const api_login = 'http://192.168.1.44:8080/login';
  const api_register = 'http://192.168.1.44:8080/register';
  const api_user = 'http://192.168.1.44:8080/user';
  const api_tweet = 'http://192.168.1.44:8080/tweet';
  const api_search = 'http://192.168.1.44:8080/search';
  const api_trendingTopics = 'http://192.168.1.44:8080/trendingTopics';

  const register = (username, email, password, image, backgroundImage) => {
    const body = {
      username: username,
      email: email,
      password: password,
      image: image,
      backgroundImage: backgroundImage
    }
    return axios.post(`${api_register}`, body)
      .then(async (response) => {
        try {
          await AsyncStorage.setItem('token', response.headers['authorization']);
          console.log('Token guardado correctamente');
        } catch (error) {
          console.error('Error al guardar el token:', error);
        }
        navigation.navigate('Tabs');
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const login = (username, password) => {
    const lowercaseUsername = username.toLowerCase();
    return axios.post(api_login, { username: lowercaseUsername, password: password })
      .then(async (response) => {
        try {
          await AsyncStorage.setItem('token', response.headers['authorization']);
          console.log('Token guardado correctamente');
          navigation.navigate('Tabs');
        } catch (error) {
          console.error('Error al guardar el token:', error);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const getTws = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${api_user}/followingTweets`, config);
      return response.data.result;
    } catch (error) {
      throw error;
    }
  };

  const getUserById = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${api_user}/${id}`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getTwById = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${api_tweet}/${id}`, config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const follow = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      return axios.put(`${api_user}/${id}/follow`, {}, config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return error
        });

    } catch (err) {
      console.error(err);
      return;
    }
  }

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      return axios.get(`${api_user}`, config)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          if (error.response.status === 401 || error.response.status === 403) {
            console.log("Usted no está autorizado")
            return error;
          }
        });

    } catch (err) {
      console.error(err);
      return;
    }
  }

  const likeTweet = async (idTweet) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      return axios.put(`${api_tweet}/${idTweet}/like`, {}, config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
      return;
    }
  }

  const retweet = async (idTweet, content) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.post(`${api_tweet}/${idTweet}/retweet`, { content: content }, config);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const agregarTw = async (content, image) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      return axios.post(`${api_tweet}`, { content: content, image: image }, config)
        .then((response) => {
          return response.data;
        })
    } catch (error) {
      return Promise.reject(error);;
    }
  }


  const replay = async (idTweet, content, image) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const body = {
        content: content,
        image: image
      }
      return axios.post(`${api_tweet}/${idTweet}/replay`, body, config)
        .then((response) => {
          return response.data;
        })
    } catch (error) {
      return Promise.reject(error.data);;
    }
  }

  const trendingTopics = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };

      return new Promise((resolve, reject) => {
        axios
          .get(api_trendingTopics, config)
          .then((response) => {
            resolve(response.data.result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };



  const search = async (texto) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      return axios.get(`${api_search}?text=${texto}`, config)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return Promise.reject(error);
        })
    } catch (err) {
      console.error(err);
      return;
    }
  }


  return {
    login,
    register,
    getTws,
    getUserById,
    getTwById,
    follow,
    getUser,
    likeTweet,
    retweet,
    replay,
    agregarTw,
    trendingTopics,
    search
  }
}
export default useService; 