import React from "react";
import img1 from './img/IMG1.png';
import img2 from './img/IMG2.jpg';
import img3 from './img/IMG3.jpg';
import './styles/SeccionItem.css';

const imgClass = "d-block w-100 img-fluid imgCarousel";

function Seccion() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div class="card bg-dark text-white">
            <img src={img1} className={imgClass} class="card-img" alt="Slide 1" />
            <div class="card-img-overlay">
              <h5 class="card-title">Card title</h5>
              <p class ="card-text">Descarga nuestra app</p>
              <p class="card-text">img 1</p>
            </div>
          </div>

        </div>
        <div className="carousel-item">
          <img src={img1} className={imgClass} alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={img1} className={imgClass} alt="Slide 3" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Seccion;
