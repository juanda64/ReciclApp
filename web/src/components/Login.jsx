import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import admittedUser from './authUser';
import './styles/Login.css';
import imgLogo from './img/iconoRe.png'; // Logo pequeño para el texto
import sideImage from './img/IMG-MISION.jpg'; // Imagen que se mostrará a la izquierda

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        if (email === admittedUser.username && password === admittedUser.password) {
            navigate('/admin');
        } else {
            setLoginError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Columna izquierda para la imagen */}
                <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
                    <img src={sideImage} className="img-fluid" alt="Imagen descriptiva" />
                </div>
                
                {/* Columna derecha para el formulario */}
                <div className="col-md-6">
                    {/* Fila para el logo y el texto "Iniciar Sesión" */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-10 text-center">
                            <img src={imgLogo} className="imgIconcustom mb-2" alt="Icono" />
                            <h2 className="display-2">Iniciar Sesión</h2>
                        </div>
                    </div>

                    {/* Fila para el formulario */}
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Usuario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Ingrese su usuario"
                                        value={credentials.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Ingrese su contraseña"
                                        value={credentials.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={`text-danger ${loginError ? '' : 'd-none'}`}>
                                    {loginError}
                                </div>
                                {/* Centrar el botón con d-flex y justify-content-center */}
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary btn-link">Iniciar Sesión</button>
                                </div>
                                <div className="text-center mt-2">
                                    <a href="#">¿Olvidaste tu contraseña?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;