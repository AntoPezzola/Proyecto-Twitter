import { useNavigate } from "react-router-dom";
import useService from "../services/useService";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import './Reply.css';

const Reply = (reply) => {
  const { id, user, content, type, date, likes, repliesAmount, retweetAmount } = reply.data;

  const { likeTweet, retweet, getUserById, getUser } = useService()

  const navigate = useNavigate();
  
  const [userReply, setUserReply] = useState("");
  const [like, setLike] = useState(likes.length);
  const [showModalRtw, setShowModalRtw] = useState(false);
  const [showModalReply, setShowModalReply] = useState(false);
  const [contentTw, setContent] = useState("");
  const [userToken, setUserToken] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    getUserById(user.id)
      .then((res) => {
        setUserReply(res.data)
      })
      getUser()
      .then((response) => {
          setUserToken(response.data);
      })


  }, []);

  const handlerNavigate = (e) => {
    e.preventDefault();
    navigate("/user/" + user.id);
  };

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
    retweet(id, contentTw)
        .then((response) => {
            const retw = response.data.retweet[response.data.retweet.length - 1];
            navigate('/tweet/' + retw.id);
        })
}

  const handleCloseReplay = () => {
    setShowModalReply(false);
    reply(id, contentTw, image).then((response) => {
      navigate("/tweet/" + id);
    });
  };

  const heartEmpty = 'https://img.icons8.com/sf-black/64/a467c1/like.png';
  const heartFilled = 'https://img.icons8.com/sf-ultralight-filled/25/a467c1/like.png';
  const heart = likes.find(likes => likes.id == userToken.id) ? heartFilled : heartEmpty;

  const likeTw = () => {
    likeTweet(id).then((response) => {
      setLike(response.data.likes.length);
    });

  };

  return (
    <div className="boxReplay">

      <div className="retweet">
        {retweetAmount > 0 ? (
          <p>
            {" "}
            <img src="https://img.icons8.com/sf-black-filled/64/c680ff/retweet.png" />{" "}
            Retweeteado{" "}
          </p>
        ) : null}
      </div>

      <div className="usuario">
          <button type="submit" onClick={handlerNavigate}>
              <div className="imagenUser">
                  <img src={userReply.image} alt="User Profile" />
                  <div className="username">{userReply.username}</div>
              </div>
          </button>
      </div>

      <div className="content"> {content}</div>

      <div className="image">
          {" "}
          {type.image ? <img src={type.image} alt="Imagen" /> : null}{" "}
      </div>

      <div className="likes">
          <div className="like-corazon">
              <button type="submit" onClick={likeTw} >
                  <img src={heart} alt="like button" /> {like}
              </button>
          </div>
      </div>

      <div className="replay">
          <button className="replies" onClick={handleClickReply}>
              {" "}
              <img src="https://img.icons8.com/ios-filled/50/a87ed3/speech-bubble--v1.png" />{" "}
              {repliesAmount}
          </button>
            {showModalReply && (
                <Modal>
                   <form>
                      <input className="form-control content-Tw" text="text" placeholder="¿Que estas pensando?" onChange={(e) => setContent(e.target.value)}></input>
                      <input className="form-control image-tw" text="url" placeholder="Sube una imagen!" onChange={(e) => setImage(e.target.value)}></input>
                    </form>
                    <div className="botones-reply">
                      <div className="bt-añadirReply">
                    <button type="submit" onClick={handleCloseReplay} className="btn btn-primary buttonAgregarTw">
                        Añadir Reply
                    </button>
                    </div>
                    <div className="bt-cerrar">
                    <button class="btn btn-primary buttonAgregarTw">
                        Cerrar
                    </button>
                    </div>
                    </div>
                </Modal>
            )}        
      </div>

      <button className="rtw" onChange={(e) => setContent(e.target.value)} onClick={handleClickRtw}>
          {" "}
          <img src="https://img.icons8.com/sf-black-filled/64/c680ff/retweet.png" />
          {retweetAmount}
      </button>

      {showModalRtw && (
          <Modal>
              <form>
                  <input className="form-control content-Tw" text="text" placeholder="¿Que estas pensando?" onChange={(e) => setContent(e.target.value)}></input>
              </form>

              <button type="submit" onClick={handleCloseRtw} className="btn btn-primary buttonAgregarTw">
                  Añadir Retweet
              </button>
          </Modal>
      )}

      <div className="date"> {date} </div>

    </div>
  );
};

export default Reply;
