import React from "react";
import icono from './img/iconoRe.png'; // Si lo usas en otro lugar
import img1 from './img/IMG1.jpg';
import img2 from './img/IMG2.jpg';
import img3 from './img/IMG3.jpg';
import './styles/SeccionItem.css';

function Seccion() {

    return (
        <div className="container-fluid">
           <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={img2} className="d-block w-100 img-fluid" alt="Slide 1" />
                </div>
                <div className="carousel-item">
                  <img src={img1} className="d-block w-100 img-fluid" alt="Slide 2" />
                </div>
                <div className="carousel-item">
                  <img src={img3} className="d-block w-100 img-fluid" alt="Slide 3" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
           </div>
        </div>
    );
}

export default Seccion;
