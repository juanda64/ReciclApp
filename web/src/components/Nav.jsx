import React from "react";
import './styles/Nav.css';
import icono from './img/iconoRe.png';

function Nav({ listaNav, listEnd, idiom, activeItem }) {
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
                        {item.onClick ? (
                            // Si el ítem tiene un onClick, usamos un botón
                            <button className="nav-link btn" onClick={item.onClick}>
                                {item.item}
                            </button>
                        ) : (
                            // Si no tiene onClick, seguimos usando el enlace
                            <a className="nav-link" aria-current="page" href={item.target}>
                                {item.item}
                            </a>
                        )}
                    </li>
                ))}
                {/* Select para cambiar de idioma */}
                <li className="nav-item itemEnd">
                    <select 
                        className="nav-link select-idiom" 
                        onChange={(e) => {
                            const selectedLang = e.target.value;
                            const selectedOption = idiom.find(item => item.item === selectedLang);
                            if (selectedOption) {
                                selectedOption.onClick(); // Llamar a la función onClick asociada
                            }
                        }}
                    >
                        {idiom.map((item, indice) => (
                            <option key={indice} value={item.item}>
                                {item.item}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;

