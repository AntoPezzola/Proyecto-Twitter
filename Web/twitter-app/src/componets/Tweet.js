import React, { useEffect, useState } from "react";
import './Tweet.css';
import useService from "../services/useService"; 
import Modal from "./Modal"; 
import { useNavigate } from 'react-router-dom'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Retweet from "./Retweet";

const Tweet = (tw) => {
 
    const { getUserById, likeTweet, retweet, reply, getUser } = useService()
    const [tweet , setTweet] = useState(tw.data);
    const [userTweet, setUserTweet] = useState("");
    const [userToken, setUserToken] = useState({});

    const navigate = useNavigate();
    const [showModalRtw, setShowModalRtw] = useState(false);
    const [showModalReply , setShowModalReply] = useState(false); 
    const [contentTw , setContent] = useState(""); 
    const [image , setImage] = useState("")
    
    const handleClickRtw = (e) => {
        e.preventDefault();
        setShowModalRtw(true);
    };

    const handleClickReply = (e) => {
        e.preventDefault();
        setShowModalReply(true);
      };
  
      const handleCloseRtw = () => {
        setShowModalRtw(false);
        retweet(tweet.id, contentTw)
            .then((response) => {
                let retw = response.data.retweet[response.data.retweet.length - 1];
                navigate('/tweet/' + retw.id);
            }).catch(error => { 
            toast.error(error.response.data.title);
            }
        )
    }

    const handleKeyDownTw = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleCloseRtw();
        }
    };

    const handleCloseReply = () => {
        setShowModalReply(false);
        reply(tweet.id, contentTw, image)
            .then((reply) => {
                const replyTw = reply.data.replies;
                navigate('/tweet/' + tweet.id);
            }).catch(error => { 
                toast.error(error.response.data.title);
                }
            )
    };

    const handleKeyDownReply = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleCloseReply();
        }
    };

    const heartFilled = 'https://img.icons8.com/sf-ultralight-filled/25/a467c1/like.png';
    const heartEmpty = 'https://img.icons8.com/sf-black/64/a467c1/like.png';

    const likeTw = () => {
        likeTweet(tweet.id)
            .then((response) => {
                const { retweet, replies, ...twDto } = response.data;
                twDto.retweetAmount = retweet.length;
                twDto.repliesAmount = replies.length;
                setTweet(twDto);
            }) 
    }

    const handlerNavigate = (e) => {
        e.preventDefault();
        navigate('/user/' + tweet.user.id);
    }

    const redirigirTw = (e) => {
        e.preventDefault();
        navigate('/tweet/' + tweet.id);
    }

    useEffect(() => {
        getUserById(tweet.user.id)
            .then((response) => {
                setUserTweet(response.data);
            });
            getUser()
            .then((response) => {
                setUserToken(response.data);
            })

    }, [])

    return (
        <div className="boxTw">
            <div className="retweet"> 
             { tweet.retweetAmount > 0 ? <p> <img src="https://img.icons8.com/sf-black-filled/64/c680ff/retweet.png"/> Retweeteado </p> : null}
            </div>

            <div className="usuario">
                <button type="submit" onClick={handlerNavigate}>
                    <div className="imagenUser"> 
                        <img src={userTweet.image} alt="User Profile"/>
                        <div className="username">{userTweet.username}</div> 
                    </div>     
                </button>
            </div>

            <div className="content"> {tweet.content} </div>

            {(tweet.type.tweet && tweet.type.tweet.retweetAmount > 0 &&
                (<div className="tweetType">
                    { <Retweet>{tweet.type.tweet}</Retweet>}
                </div>)     
            )}

            <div className="image"> {tweet.type.image ? <img src={tweet.type.image} alt="Imagen"/> : null } </div>
            
            <div className="likes">

                <div className="like-corazon">
                     <button type="submit" onClick={likeTw} >
                        {tweet.likes.find(likes => likes.id == userToken.id) ? <img src={heartFilled}></img> : <img src={heartEmpty}></img>} {tweet.likes.length}
                     </button>
                </div>
            </div>
            

 
            <ToastContainer /> 
            <div className="replay">
                <button className= "replies" onClick={handleClickReply} > <img src="https://img.icons8.com/ios-filled/50/a87ed3/speech-bubble--v1.png"/> {tweet.repliesAmount}</button> 
                     {showModalReply && (
                        <Modal>
                            <form>
                                <input className="form-control content-Tw"
                                    text="text"
                                    placeholder="¿Que estas pensando?"
                                    onChange={(e) => setContent(e.target.value)}
                                    onKeyDown={handleKeyDownReply}>          
                                </input>
                                <input className="form-control image-tw" 
                                    text="url"
                                    placeholder="Sube una imagen!"
                                    onChange={(e) => setImage(e.target.value) }>
                                </input>
                            </form>
                            <div className="buttones-reply">
                                <button type="submit"  onClick={handleCloseReply} className="btn btn-primary buttonAgregarTw">
                                Añadir Reply
                                </button> 

                                <div className="button-cancelar">
                                    <button onClick={() => setShowModalReply(false)} className="btn btn-primary buttonAgregarTw">  Cerrar </button>
                                </div>
                            </div>    
                        </Modal>
                   )}
            </div>

            <button className="rtw" onChange={(e) => setContent(e.target.value)} onClick={handleClickRtw} > 
                <img src="https://img.icons8.com/sf-black-filled/64/c680ff/retweet.png"/>{tweet.retweetAmount} 
            </button>

            {showModalRtw && (
                    <Modal>
                            <form>
                                <input className="form-control content-Tw"
                                    text="text"
                                    placeholder="¿Que estas pensando?"
                                    onChange={(e) => setContent(e.target.value)}
                                    onKeyDown={handleKeyDownTw}>          
                                </input>
                            </form>

                            <div className="botones-rt">
                                <div className="bt-rt">
                                    <button type="submit" onClick={handleCloseRtw} className="btn btn-primary buttonAgregarTw">
                                    Añadir Retweet 
                                    </button> 
                                </div>

                                <div className="bt-cerrar">
                                    <button
                                        onClick={() => setShowModalRtw(false)} 
                                        className="btn btn-primary buttonAgregarTw" >  Cerrar
                                    </button>
                                </div>

                            </div>
                    </Modal>
                )}
                   
                <div className="date"> {tweet.date} </div>

                <>
                    <button className="redirigirTw" type="submit" onClick={redirigirTw}>Ir a página de Tweet</button>
                </>
        </div>
    )  
}

export default Tweet