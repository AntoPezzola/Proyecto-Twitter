import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './Register.css'
import useService from '../services/useService';
import logo from '../images/logo.png';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const { register } = useService()

  const handleSubmit = (e) => {
    e.preventDefault();
   register(username, email, password, image, backgroundImage)
   .catch(error => {
    toast.error(error.response.data.title);
    console.log(error.response.data.title)
   }
  )
    }

  return (
    <div className="registrate">
      <div className="imagen">
        <img src={logo} alt='imagenLogo'></img>
        </div>
        < ToastContainer /> 
        <div className="form-registrate">

      <div className="registrate-titulo"> 
      <h1>Registrate!</h1>
      </div>
      
      <form>
        <div className="form-group nombre">
          <label>Nombre:</label>
          <div>
            <input 
            type="text" 
            className="form-control form-nombre" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Ingrese su nombre"/>
          </div>
        </div>

        <div className="form-group correo">
          <label>Dirección de correo electrónico:</label>
          <div>
            <input 
            type="email" 
            className="form-control form-correo" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}  
            placeholder="Ingrese su email"/>
          </div>
        </div>

        <div className="form-group register-contraseña">
          <label>Contraseña:</label>
          <div>
            <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="form-control form-password" 
            placeholder="Ingrese una contraseña" />
          </div>
        </div>

        <div className="form-group register-imagen">
          <label>Adjunta una imagen</label>
          <div>
          <input 
          type="url"  
          className="form-control form-imagen" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          placeholder= "Adjunta una imagen"></input>
          </div>
        </div>
        
        <div className="form-group background">
          <label>Adjunta un background-image: </label>
          <div>
          <input 
          type="url"  
          className="form-control form-background" 
          value={backgroundImage} 
          onChange={(e) => setBackgroundImage(e.target.value)} 
          placeholder= "Adjunta un background-image"></input>
          </div>
        </div>


        <button type="submit" onClick={handleSubmit} className="btn btn-primary buttonRegistrate">Registrate</button>
      </form>
      </div>
      </div>
        );
};

export default Register;

