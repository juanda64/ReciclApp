import React from "react";
import './styles/SeccionNosotros.css'; // Asegúrate de crear este archivo CSS si deseas personalizar el estilo.
import imgMision from'./img/IMG-MISION.jpg';
import imgVision from'./img/IMG-VISION.jpg';

function SeccionNosotros() {
  return (
    <div className="container" id="nosotros">
      <h2 className="display-4 text-center">Sobre Nosotros</h2>
      <div className="row">
        <div className="col-md-6">
          <img src={imgMision} className="imgNosostros"  />
          <h3>Misión</h3>
          <p>
            Nuestra misión es proporcionar soluciones sostenibles que contribuyan a un
            mundo más limpio y saludable. Nos esforzamos por educar y empoderar a las
            comunidades para que participen activamente en la gestión de residuos y
            el reciclaje.
          </p>
        </div>
        <div className="col-md-6">
        <img src={imgVision} className="imgNosostros"  />
          <h3>Visión</h3>
          <p>
            Nuestra visión es ser líderes en la transformación de la gestión de
            residuos, inspirando a un cambio positivo en la forma en que las personas
            interactúan con su entorno. Buscamos un futuro donde el reciclaje sea la
            norma y no la excepción.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SeccionNosotros;
