import React, { useEffect, useState } from "react";
import useService from "../services/useService";
import Tweet from "./Tweet";
import 'bootstrap/dist/css/bootstrap.css';
import './TrendingTopics.css'; 
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom'


const TrendingTopics = () => {

    const { trendingTopics , getUser} = useService()
    const [tweets, setTweets] = useState([]);
    const [userTk , setUserTk] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        getUser()
        .then((user) => {
          setUserTk(user.data);
        })
        trendingTopics()
            .then((tweets) => {
                setTweets(tweets.data.result);
            })
     
    }, [])
const handlerUser = (e) => {
    e.preventDefault();
    navigate('/user/');
}
const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
}
const handlerHome = (e) => {
    e.preventDefault();
    navigate('/home/');
}
    return (
        <div className="trending">
            <div className="imagen">
                <img src={logo} alt='imagenLogo'></img>
            </div>

            <div className="buttons-Trending">
                <button className="button-Home" type="submit" onClick={handlerHome}> 
                    <img src="https://img.icons8.com/sf-black-filled/64/a467c1/home.png"/> 
                    Home 
                </button>
                <button className="button-Perfil" type="submit" onClick={handlerUser}> 
                <div className="imagenUser"> 
                    <img className="imagenHome" src={userTk.image} alt="User Profile"/>
                    <div className="username">{userTk.username}</div> 
                </div> 
                </button>
                <button className="button-Logout" type="submit" onClick={logout}> 
                    <img src="https://img.icons8.com/fluency-systems-filled/48/a87ed3/exit.png"/>
                    Cerrar sesión
                </button>
            </div>

            <div className="titulo-trending">
                <h2>Trending Topics</h2>
            </div>
            
            <div>
                {tweets.map((tweet) => {
                    return  (
                            <div className="boxTweet">
                                <Tweet key={tweet.id} data={tweet} ></Tweet>
                            </div>
                        )           
                })}        
            </div>
       

        </div>
    )
}

export default TrendingTopics;