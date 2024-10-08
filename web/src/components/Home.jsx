import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import './styles/Home.css';
import Inicio from "./SeccionItem";
import Aliados from "./SeccionAliados";
import SeccionNosotros from "./SeccionNosotros";

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

const aliadosList = [
  { aliado: 'https://lavanderiasuavite.com/empresa-reciclaje-en-bogota-colombia/images/Logo-Arbol-Verde.png' },
  { aliado: 'https://lh5.googleusercontent.com/proxy/JpvIMy1kTtt5NTMVRCvSJJYHshmRAERuHEXicqWdezINxG-Zlgw0cJrA1io5ZqGMbcar05DXvuAmoD_oadjboOwv41d2w61BbAqpm9ximX6oZkWwN9vIsZ_oBatJSHMECSj3KeMKRKVsUoztxriFNOjem73AXA' },
  { aliado: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1MQAzYVRK7QriJ5cOi_-zqu079nfzcXedA&s' },
  { aliado: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4w3t5TCUQ8hcCedZgULJETpdtqjBgJ52EHQ&s' },
];

function Home() {
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.querySelector(item.target));
      const scrollPosition = window.pageYOffset;

      sections.forEach((section, index) => {
        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          setActiveItem(items[index].target.substring(1));
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
      <body>
        <div id="inicio" className="seccion">
          <Inicio />
        </div>

        <div id="aliados" className="seccion">
          <Aliados aliadosImg={aliadosList.map(item => item.aliado)} />
        </div>

        <div id="nosotros" className="seccion">
          <SeccionNosotros />
        </div>

        <div id="app" className="seccion">
          <h2>Nuestra Aplicación</h2>
          <p>Link de descarga de App Android e iOS.</p>
        </div>

        <div id="flutter" className="seccion">
          <h2>Footer</h2>
          <p>Descripción Reciclapp.</p>
        </div>
      </body>


    </>
  );
}

export default Home;
