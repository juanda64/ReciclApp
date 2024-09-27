import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import './styles/Home.css';
import Inicio from "./SeccionItem";
import Aliados from "./SeccionAliados";

const items = [
  { item: 'Inicio', target: '#inicio' },
  { item: 'Aliados', target: '#aliados' },
  { item: 'Sobre Nosotros', target: '#nosotros' },
  { item: 'Nuestra App', target: '#app' },
];

const itemsEnd = [
  { item: 'Iniciar sesión' },
  { item: 'Registrarse' }
];

const aliadosList =[
  {aliado: 'Aliado 1', img: './img/iconoRe.png'},
]

function Home() {
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.querySelector(item.target));
      const scrollPosition = window.pageYOffset;

      sections.forEach((section, index) => {
        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          setActiveItem(items[index].target.substring(1)); // Asegúrate de usar items[index] aquí
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className='backg sticky-nav'>
        <Nav listaNav={items} listEnd={itemsEnd} activeItem={activeItem} />
      </nav>

      <div id="inicio" className="seccion">
        
        <Inicio />
      </div>

      <div id="aliados" className="seccion">
        <h2>Nuestros Aliados</h2>
        <Aliados />
      </div>

      <div id="nosotros" className="seccion">
        <h2>Sobre Nosotros</h2>
        <p>Visión, misión.</p>
      </div>

      <div id="app" className="seccion">
        <h2>Nuestra Aplicación</h2>
        <p>Link de descarga de App Android e iOS.</p>
      </div>

      <div id="flutter" className="seccion">
        <h2> Footer</h2>
        <p>Descripción Reciclapp.</p>
      </div>
    </>
  );
}

export default Home;
