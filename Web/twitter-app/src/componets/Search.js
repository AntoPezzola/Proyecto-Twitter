import React, { useEffect, useState } from "react";
import useService from "../services/useService";
import Tweet from "./Tweet";
import './Search.css'
import { useNavigate } from "react-router-dom";

const Search = () => {

    const [texto, setTexto] = useState("");
    const { search , getUser} = useService();
    const [tweetsSearch, setTweetsSearch] = useState([]);
    const navigate = useNavigate();
    const [userTk , setUserTk] = useState("");


    const handleSearch = (e) => {
        e.preventDefault();
        search(texto)
            .then((response) => {
                setTweetsSearch(response.data.result);
            })

    }

    useEffect(() => {
        getUser()
        .then((response) => {
          setUserTk(response.data);
        })


    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/login');
      }

    const handlerUser = (e) => {
    e.preventDefault();
    navigate('/user/');
    }

    const abrirTrendings = (e) => {
        e.preventDefault();
        navigate('/trendingTopics/');
    }

    const handlerHome = (e) => {
        e.preventDefault();
        navigate('/home/');
    }



    return (
        <div className="search">

            <div className="box-buttons">
                    <div className="buttons-search">
                            <button className="button-Home" type="submit" onClick={handlerHome}> 
                                <img src="https://img.icons8.com/sf-black-filled/64/a467c1/home.png"/> 
                                Home 
                            </button>

                            <button className="button-Perfil" type="submit" onClick={handlerUser}> 
                                <div className="imagenUser"> 
                                    <img src={userTk.image} alt="User Profile"/>
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
            </div>


            <div className="busqueda-container">
                    <div>
                        <input 
                        className="form-control form-buscar"
                        type="text" 
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Buscar en Twitter">
                        </input>
                    </div>
                    <div>
                        <button className="busqueda" type="submit" onClick={handleSearch}>
                            <img src="https://img.icons8.com/sf-regular/48/a87ed3/search.png"/>
                        </button>
                    </div>
                
            </div>
            
            <div>
              
                {tweetsSearch.map((tweetSearch) => {
                    return  (
                            <div className="boxTweet">
                                <Tweet key={tweetSearch.id} data={tweetSearch} ></Tweet>
                            </div>
                        )           
                })}        
            </div>

        </div>
    )

}

export default Search;