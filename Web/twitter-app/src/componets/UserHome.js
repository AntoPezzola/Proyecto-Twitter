import React, { useEffect, useState } from "react";
import useService from '../services/useService';
import Tweet from './Tweet'; 
import './UserHome.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom'
import Retweet from "./Retweet";

const UserHome = () => {

const { getUser} = useService()
const navigate = useNavigate();
const [user, setUser] = useState({data:{tweets:[]} });
const {tweets , username, backgroundImage, image, followers, following} = user.data;

const logout = (e) => {
  e.preventDefault();
  localStorage.clear();
  navigate('/login');
}

    useEffect(() => {
         getUser()
            .then((response) => {
                setUser(response);
            })

  }, [])

  const handlerHome = (e) => {
    e.preventDefault();
    navigate('/home/');
}

const handleSearch = (e) => {
  e.preventDefault();
  navigate('/search/');
}

const abrirTrendings = (e) => {
  e.preventDefault();
  navigate('/trendingTopics/');
}


return (

  <div className="user">

    <div className="img-user">
      <img src={backgroundImage}></img>
      </div>

      <div className="box-busqueda">
      <div className="containter-busqueda">
        <button className="busqueda" type="submit" onClick={handleSearch}>Search</button>
        <img src="https://img.icons8.com/sf-regular/48/a87ed3/search.png"/>
      </div>
    </div>

    
    <div className="buttons-userHome">
      <button className="button-Home" type="submit" onClick={handlerHome}> 
        <img src="https://img.icons8.com/sf-black-filled/64/a467c1/home.png"/> 
        Home 
      </button>
      <button className="button-Logout" type="submit" onClick={logout}> 
        <img src="https://img.icons8.com/fluency-systems-filled/48/a87ed3/exit.png"/>
        Cerrar sesión
      </button>
      <button className="button-Trending" type="submit" onClick={abrirTrendings}>
        <img src="https://img.icons8.com/sf-regular/48/a87ed3/topic.png"/>
        Trending Topics
      </button>
    </div>
      
      <div className="info-Perfil">
      <div className="img-perfil"> 
      <img src={image}></img>
      </div>

     
      <div className="username-perfil">
      <h3>{username}</h3>
      </div>

      <div className="follow-container">
      <div className="followers" >
      <div className="followers-length">{followers?.length || 0} </div> Followers
      </div>

      <div className="following">
      <div className="following-length">  {following?.length || 0} </div> Followings
      </div>
      </div>
      
      </div>

      <hr className="horizontal-line" />

      <div className="tweetsUsuario">
              {tweets.map((tweet) =>
                  {return <Tweet key={tweet.id} data={tweet}> </Tweet> })
              }
      </div>
      

      {/* <div className="tweetsUsuario">
                {tweets.map((tweet) => {
                    if (!tweet.type.tweet) {
                      return <Tweet key={tweet.id} data={tweet} tweetType={tweet.type} />;
                    } else {
                      return null;
                    }
                })}
      </div> */}
      


  </div>
  
  
);
}
export default UserHome; 