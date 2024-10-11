import React from "react";
import './styles/SeccionApp.css';
import imgCel from './img/IMG-CELULAR.png';  // Icono por defecto si alguna imagen falla
import qr from './img/qrMuestra.png'; 

const clasImg = "img-fluid";

function SeccionApp() {
    return (
        <div className="container">
            <h2 className="display-2">Descarga nuestra App</h2>
            <div className="row">

                <div className="col-md-4">
                    <h3 className="display-5" >Android</h3>
                    <img src={qr} className="qr" />
                </div>
                <div className="col-md-4">
                    <img src={imgCel} className="imgcelfor" />
                </div>
                <div className="col-md-4">
                    <h3 className="display-5">IOS</h3>
                    <img src={qr} className="qr" />
                </div>

            </div>
        </div>
    );
}

export default SeccionApp;