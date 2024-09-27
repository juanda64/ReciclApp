import React from "react";
import './styles/SeccionAliados.css';
import icono from './img/iconoRe.png';

const clasImg = "img-fluid";

function SeccionAliados() {

    return (

        <div class="container">
            <div class="row g-7 ">
                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 1</p>
                    </div>
                </div>
                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 2</p>
                    </div>
                </div>
                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 3</p>
                    </div>
                </div>

                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 4</p>
                    </div>
                </div>
            </div>

            <div class="row g-7">
                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 5</p>
                    </div>
                </div>
                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 6</p>
                    </div>
                </div>
                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 7</p>
                    </div>
                </div>
                <div className="card col cardCustom" style={{ width: '18rem' }}>
                    <img src={icono} className={clasImg} alt="..." />
                    <div className="card-body">
                        <p className="card-text">Aliado 8</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeccionAliados;
