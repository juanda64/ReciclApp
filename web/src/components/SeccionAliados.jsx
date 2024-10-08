import React from "react";
import './styles/SeccionAliados.css';
import icono from './img/iconoRe.png';  // Icono por defecto si alguna imagen falla

const clasImg = "img-fluid";

function SeccionAliados({ aliadosImg }) {  
    return (
        <div className="container">
            <h2 className="display-2">Nuestros Aliados</h2>
            <div className="card-grid">
                {aliadosImg.map((imgSrc, index) => (
                    <div key={index} className="card cardCustom">
                        <img 
                            src={imgSrc} 
                            className={clasImg} 
                            alt={`Aliado ${index + 1}`} 
                            onError={(e) => { e.target.src = icono; }} // Si la imagen no carga, muestra un icono por defecto
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeccionAliados;
