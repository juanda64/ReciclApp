import React from "react";
import './styles/Nav.css';
import icono from './img/iconoRe.png';

function Nav({ listaNav, listEnd, activeItem }) {
    return (
        <nav className="nav-container">
            <img src={icono} className="rounded float-start imgcustom" alt="Icono" />
            <ul className="nav justify-content-start">
                {listaNav.map((item, indice) => (
                    <li key={indice} className="nav-item">                    
                        <a
                            className={`nav-link ${activeItem === item.target.substring(1) ? 'active' : ''}`}
                            aria-current="page"
                            href={item.target}
                        >
                            {item.item}
                        </a>
                    </li>
                ))}
            </ul>
            <ul className="nav justify-content-end">
                {listEnd.map((item, indice) => (
                    <li key={indice} className="nav-item itemEnd">                    
                        <a className="nav-link" aria-current="page" href={item.target}>
                            {item.item}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
