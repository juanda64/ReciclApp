import React from "react";
import './styles/Nav.css';

function Nav({ listaNav }) {
    return (
        <ul className="nav justify-content-end">
            {listaNav.map((item, indice) => (
                <li key={indice} className="nav-item">
                    <a className="nav-link active item" aria-current="page" href="#">
                        {item.item}
                    </a>
                </li>
            ))}
        </ul>
    );
    
}

export default Nav;