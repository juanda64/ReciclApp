import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import './styles/Home.css';
import Inicio from "./SeccionItem";
import Aliados from "./SeccionAliados";
import SeccionNosotros from "./SeccionNosotros";
import SeccionApp from "./SeccionApp";
import Login from "./Login";
import { useTranslation } from "react-i18next"; // Importar el hook

function Home() {
  const { t } = useTranslation(); // Obtener la función de traducción
  const [activeItem, setActiveItem] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  // Lista de items traducidos
  const items = [
    { item: t('nav.inicio'), target: '#inicio' },
    { item: t('nav.aliados'), target: '#aliados' },
    { item: t('nav.sobre_nosotros'), target: '#nosotros' },
    { item: t('nav.nuestra_app'), target: '#app' },
  ];

  const itemsEnd = [
    { item: t('nav.iniciar_sesion'), target: '', onClick: 'handleLogin' },
    { item: t('nav.registrarse'), target: '' }
  ];

  const aliadosList = [
    { aliado: 'https://lavanderiasuavite.com/empresa-reciclaje-en-bogota-colombia/images/Logo-Arbol-Verde.png' },
    { aliado: 'https://lh5.googleusercontent.com/proxy/JpvIMy1kTtt5NTMVRCvSJJYHshmRAERuHEXicqWdezINxG-Zlgw0cJrA1io5ZqGMbcar05DXvuAmoD_oadjboOwv41d2w61BbAqpm9ximX6oZkWwN9vIsZ_oBatJSHMECSj3KeMKRKVsUoztxriFNOjem73AXA' },
    { aliado: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1MQAzYVRK7QriJ5cOi_-zqu079nfzcXedA&s' },
    { aliado: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4w3t5TCUQ8hcCedZgULJETpdtqjBgJ52EHQ&s' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.querySelector(item.target));
      const scrollPosition = window.pageYOffset;

      sections.forEach((section, index) => {
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          setActiveItem(items[index].target.substring(1));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleLogin = () => {
    setIsLoginVisible(true);
  };

  return (
    <>
      <nav id="nav" className='backg sticky-nav'>
        <Nav listaNav={items} listEnd={itemsEnd.map((item) => ({ ...item, onClick: item.item === t('nav.iniciar_sesion') ? handleLogin : undefined }))} activeItem={activeItem} />
      </nav>

      <body className="body">
        {isLoginVisible ? (
          <div id="login" className="seccion">
            <Login />
          </div>
        ) : (
          <>
            <div id="inicio" className="seccion">
              <Inicio />
            </div>
            <div id="aliados" className="seccion inicial">
              <Aliados aliadosImg={aliadosList.map(item => item.aliado)} />
            </div>
            <div id="nosotros" className="seccion">
              <SeccionNosotros />
            </div>
            <div id="app" className="seccion">
              <SeccionApp />
            </div>
            <div id="flutter" className="seccion">
              <h2>{t('footer.title')}</h2>
              <p>{t('footer.description')}</p>
            </div>
          </>
        )}
      </body>
    </>
  );
}

export default Home;
