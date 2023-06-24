import React, { useEffect, useState } from "react";
import logo from '../images/logo.png';
import { useNavigate, useParams } from "react-router-dom";
import useService from "../services/useService";
import Tweet from "./Tweet";
import Replay from "./Reply";
import './TweetDisplay.css';


const TweetDisplay = () => {

    const  { idTw } = useParams()
    const navigate = useNavigate();
    const { getTwById,  getUser} = useService()
    const [userTk , setUserTk] = useState(""); 
    const [tweet, setTweet] = useState(null); 

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

    const abrirTrendings = (e) => {
        e.preventDefault();
        navigate('/trendingTopics/');
      }
    
      const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search/');
      } 
    

    useEffect(() => {
        getTwById(idTw)
            .then((tw) => {
                setTweet(tw.data);
                console.log(tw.data); 
            })
        getUser()
        .then((response) => {
          setUserTk(response.data);
        })

    }, [])

    return(
        <div className="tweetDisplay">
            
            <div className="imagen">
                <img src={logo} alt='imagenLogo'></img>
            </div>
            
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
               <div className="buttons-User">
                <button className="button-Home" type="submit" onClick={handlerHome}> 
                    <img src="https://img.icons8.com/sf-black-filled/64/a467c1/home.png"/> 
                    Home 
                </button>
       
               <button className="button-Trending" type="submit" onClick={abrirTrendings}>
                 <img src="https://img.icons8.com/sf-regular/48/a87ed3/topic.png"/>
                 Trending Topics
               </button>
               <button className="button-Logout" type="submit" onClick={logout}> 
                 <img src="https://img.icons8.com/fluency-systems-filled/48/a87ed3/exit.png"/>
                 Cerrar sesión
               </button>
    
            
                <div className="tweetRtw">
                      {tweet ? (
                            <Tweet data={tweet} ></Tweet>
                            ) : ( <>cargando...</> )}
                     
                       <div className="replaysTweet">
                           { tweet ? tweet.replies.map((reply) => {
                               return  (
                                   <div className="boxReplay">
                                       <Replay key={reply.id} data={reply}></ Replay>
                                   </div>
                               )           
                           }) : <>cargando...</>}        
                         </div>
                    </div>
               </div>
        </div>
        </div>
    )
}

export default TweetDisplay;