import React from "react";
import Nav from "./Nav";
import './styles/Home.css';
import icono from './img/iconoRe.png'; 

const items =[
  {item: 'Inicio'},
  {item: 'Aliados'},
  {item: 'Reciclar'},
  {item: 'Progresos'}
];

function Home() {
   

    return (
        <nav class ='backg'>
           <img src={icono} className="rounded float-start imgcustom" alt="Icono" />
          <Nav listaNav={items}/>
        </nav>
    );
}

export default Home;