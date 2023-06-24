import React, { useState } from "react";
import './Home.css'; 
import { useEffect } from "react";
import useService from '../services/useService';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom'
import Tweet from './Tweet';  
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {

  const [tweetContent, setTweetContent] = useState([]);
  const { getUser, getTws, agregarTw } = useService()
  const navigate = useNavigate();
  const [content , setContent] = useState("")
  const [userTk , setUserTk] = useState(""); 
  const [image , setImage] = useState("")

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  }
  
  useEffect(() => {
      getUser()
      .then((response) => {
        setUserTk(response.data);
      })
      getTws()
        .then((result) => {
          setTweetContent(result);
        })
   
  }, [])



  const handleAgregarTw = (e) => {
    e.preventDefault();
    agregarTw(content, image)
      .then((tw) => {
        navigate("/tweet/" + tw.id); 
      }).catch(error => { 
        toast.error(error.title); 
        }
    )
  }



  const handlerUser = (e) => {
    e.preventDefault();
    navigate('/user/');
  }

  const abrirTrendings = (e) => {
    e.preventDefault();
    navigate('/trendingTopics/');
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search/');
  } 

  return (
     <div className="home">
      
       <div id="imagen">
        <img src={logo} alt='imagenLogo'></img>
  
      </div>
      <ToastContainer /> 
      <button className="busqueda" type="submit" onClick={handleSearch}>
       <img src="https://img.icons8.com/sf-regular/48/a87ed3/search.png"/>
          Search
       </button>
      <div className="buttons">
        <button className="button-Perfil" type="submit" onClick={handlerUser}> 
        <div className="imagenUser"> 
             <img className="imagenHome" src={userTk.image} alt="User Profile"/>
             <div className="username">{userTk.username}</div> 
        </div> 
        </button>

        <button className="button-Trending" type="submit" onClick={abrirTrendings}>
          <img src="https://img.icons8.com/sf-regular/48/a87ed3/topic.png"/>
          Trending Topics
        </button>
        <button className="button-Logout" type="submit" onClick={logout}> 
          <img src="https://img.icons8.com/fluency-systems-filled/48/a87ed3/exit.png"/>
          Cerrar sesión
        </button>
      </div>

      
      <div className="agregarTw">
       <div className="twBox">
        <form>
            <input className="form-control content-Tw"
            text="text"
            placeholder="¿Que estas pensando?"
            onChange={(e) => setContent(e.target.value)}
            >          
            </input>
             <input className="form-control image-tw" 
             text="url"
             placeholder="Sube una imagen!"
             onChange={(e) => setImage(e.target.value) }>

             </input>
        </form>
        
           <button type="submit"  className="btn btn-primary buttonAgregarTw" onClick={handleAgregarTw}>
             Agregar Tweet
           </button> 
           </div>
           </div>
      
      
        <div className="tweets">
             {tweetContent.map((tweet) => {
               return  (
                <div className="boxTweet">
                <Tweet key={tweet.id}
                 data={tweet}
                ></Tweet>
                </div>)           
             })}        
        </div>
    </div>
  );
};

export default Home;