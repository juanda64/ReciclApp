import React, { useState, useEffect, useRef } from 'react';
import { FaTachometerAlt, FaCog, FaSignOutAlt, FaBars, FaUser, FaBox, FaUserFriends } from 'react-icons/fa';
import Nav from "./Nav";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import './styles/Admin.css';

const Admin = () => {
    const { t, i18n } = useTranslation();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showConfigItems, setShowConfigItems] = useState(false);
    const navigate = useNavigate();
    const configRef = useRef(); // Referencia para el botón de configuración

    const mainMenuItems = [
        { label: 'Dashboard', icon: <FaTachometerAlt size={22} />, onClick: () => console.log('Dashboard') }
    ];

    const bottomMenuItems = [
        { label: 'Configuración', icon: <FaCog size={22} />, onClick: () => setShowConfigItems(!showConfigItems) },
        { label: 'Cerrar sesión', icon: <FaSignOutAlt size={22} />, onClick: () => console.log('Cerrar sesión') }
    ];

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://apipyton.onrender.com/api/usuario/all');
                const data = await response.json();
                setUsuarios(data.body.data.usuarios);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    return (
        <div className={`admin-container ${isCollapsed ? 'collapsed' : ''}`}>
            <aside className="sidebar">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="toggle-btn">
                    <FaBars />
                </button>
                <h3 className="menu-title">{!isCollapsed && 'Menu'}</h3>
                <ul className="menu-list">
                    {mainMenuItems.map((item, index) => (
                        <li key={index} onClick={item.onClick}>
                            {item.icon}
                            {!isCollapsed && <span>{item.label}</span>}
                        </li>
                    ))}
                </ul>
                <ul className="menu-list bottom-menu">
                    <li onClick={() => setShowConfigItems(!showConfigItems)} className="menu-item">
                        <FaCog size={22} />
                        {!isCollapsed && <span>Configuración</span>}
                    </li>
                    {/* Lista de ítems de configuración justo debajo del botón de Configuración */}
                    {showConfigItems && (
                        <ul className="config-items" ref={configRef}>
                            <li onClick={() => console.log('Perfil')}>
                                <FaUser size={20} /> <span>Perfil</span>
                            </li>
                            <li onClick={() => console.log('Usuarios')}>
                                <FaUserFriends size={20} /> <span>Usuarios</span>
                            </li>
                            <li onClick={() => console.log('Materiales')}>
                                <FaBox size={20} /> <span>Materiales</span>
                            </li>
                        </ul>
                    )}
                    <li onClick={() => console.log('Cerrar sesión')} className="menu-item">
                        <FaSignOutAlt size={22} />
                        {!isCollapsed && <span>Cerrar sesión</span>}
                    </li>
                </ul>
            </aside>
            <div className="main-content">
                <nav id="nav" className='backg sticky-nav'>
                    <Nav
                        listaNav={[{ item: t('nav.inicio'), target: '/', onClick: () => navigate('/') }]}
                        listEnd={[{ item: t("nav.cerrar_sesion"), onClick: () => console.log('Cerrar sesión') }]}
                        idiom={[
                            { item: 'ES', onClick: () => i18n.changeLanguage('es') },
                            { item: 'EN', onClick: () => i18n.changeLanguage('en') }
                        ]}
                    />
                </nav>
                <div id="lista_usuarios" className="container mt-5">
                    <h2 className="text-center">Panel de Administración</h2>
                    <h4>Lista de Usuarios</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Género</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>País</th>
                                <th>Ciudad</th>
                                <th>Ocupación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombres}</td>
                                    <td>{usuario.apellidos}</td>
                                    <td>{usuario.edad}</td>
                                    <td>{usuario.genero}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.pais}</td>
                                    <td>{usuario.ciudad}</td>
                                    <td>{usuario.ocupacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
