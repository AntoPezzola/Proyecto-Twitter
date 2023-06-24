import logo from '../images/logo.png';
import './Login.css';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './Register'; 
import useService from '../services/useService';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const { login } = useService()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
    .catch(error => {
        toast.error(error.response.data.title);
        console.log(error.response.data.title)
    }
      )
  }
    
    return (
      <div className="inicioSesion">
        
      <div className="imagen">
        <img src={logo} alt='imagenLogo'></img>
      </div> 
      <ToastContainer /> 
      <div className='form-center'>
      <form>
        <div className="form-group">
          <div className='usuario'>
          <label htmlFor="exampleInputusername1">Usuario:</label>
          </div>
          <input
            type="text"
            className="form-control form-usuario"
            id="exampleInputusername1"
            aria-describedby="usernameHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
           />
        </div>

      <div className="form-group">
      <div className='contraseña'>
      <label htmlFor="exampleInputPassword1">Contraseña:</label>
      </div>
      <input
          type="password"
          className="form-control form-contraseña"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
      />
      </div>

      <button onClick={handleSubmit} type="submit" className="btn btn-primary buttonIniciarSesion">
      Iniciar sesión
      </button>
      
 
        <div className='barraRegistrate'>
          <a className="link" href='/register'>Registrate</a>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;