import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export const useService = () => {

    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    const config = {
        headers: {'Authorization': localStorage.getItem('token')}
    }

    const api_user = 'http://localhost:8080/user'; 
    const api_login = 'http://localhost:8080/login';    
    const api_register = 'http://localhost:8080/register';
    const api_tweet = 'http://localhost:8080/tweet';
    const api_search = 'http://localhost:8080/search';
    const api_trendingTopics = 'http://localhost:8080/trendingTopics';

    const login = (username, password) => {
        setLoading(true);

        return axios.post(`${api_login}`, {username: username, password: password})
            .then(response => {
                localStorage.setItem('token', response.headers['authorization']); 
                navigate('/home');
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const getUser = () => {
        setLoading(true);

        return axios.get(`${api_user}`, config)
            .then(response => {
                return response;
            })
            .catch(error => {
                if(error.response.status === 401 || error.response.status === 403) {
                    console.log("Usted no está autorizado")
                    navigate("/login");
                    return error;
                }
            }).finally(() => {
                setLoading(false);
            });
    }

    const getTws = () => {
  
        return axios.get(`${api_user}/followingTweets`, config)
            .then((response) => {
                return response.data.result;
            })
            .catch((error) => {
                if(error.response.status === 401 || error.response.status === 403) {
                    console.log("Usted no está autorizado")
                    navigate("/login");
                    return error;
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const register = (username, email, password, image, backgroundImage) => {

        const body = {
            username: username,
            email: email,
            password: password,
            image: image,
            backgroundImage: backgroundImage
        }

        return axios.post(`${api_register}`, body)
            .then((response) => {
                localStorage.setItem('token', response.headers['authorization']); 
                navigate('/home');
            })
            .catch((error) => {
               return Promise.reject(error);
            })
    }

    const getUserById = (id) => {
        return axios.get(`${api_user}`+ '/' + id  , config)
            .then((response) => {
                return response;
   
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const getTwById = (id) => {
        return axios.get(`${api_tweet}`+ '/' + id  , config)
          .then((response) => {
             return response
          })
           .catch((error) => {
            console.error(error)
           })
    }

    const likeTweet = (idTweet) => {
        return axios.put(`${api_tweet}` + '/' + idTweet + '/like', {}, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error(error);
            })
    }


    const retweet = (idTweet, content) => {
        return axios.post(`${api_tweet}` + '/' + idTweet + '/retweet' , {content:content} , config )
        .then(response => {
            return response; 
        })
        .catch((error) => {
           return Promise.reject(error);
        })
    }  

    const agregarTw = (content, image) => {
        return axios.post(`${api_tweet}` , {content: content, image: image }, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return Promise.reject(error.response.data);
        })
    }

    const reply = (idTweet, content, image) => {
        const body = {
            content: content,
            image: image
        }
        return axios.post(`${api_tweet}/${idTweet}/replay`, body, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);
            })
    }

    const search = (texto) => {
        return axios.get(`${api_search}?text=${texto}`, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const trendingTopics = () => {
        return axios.get(`${api_trendingTopics}`, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error(error);
                if(error.response.status === 401 || error.response.status === 403) {
                    console.log("Usted no está autorizado")
                    navigate("/login");
                    return error;
                }
            })
    }

    const follow = (id) => {
        return axios.put(`${api_user}/${id}/follow`, {}, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error
            })
    }


    return {
        login,
        getUser,
        getTws,
        register,
        getUserById,
        getTwById, 
        likeTweet,
        retweet,
        agregarTw,
        reply,
        search,
        trendingTopics,
        follow
    }

}

export default useService