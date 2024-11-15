import React, { useState, useEffect, useRef } from 'react';
import { FaTachometerAlt, FaCog, FaSignOutAlt, FaBars, FaUser, FaBox, FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';
import Nav from "./Nav";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import './styles/Admin.css';

const Admin = () => {
    const { t, i18n } = useTranslation();
    const [solicitudes, setSolicitudes] = useState([]);
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
        const fetchSolicitudes = async () => {
            try {
                const response = await fetch('https://apipyton.onrender.com/api/solicitudes/all');
                const data = await response.json();
                setSolicitudes(data.body.data.solicitudes);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las solicitudes:', error);
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, []);

    if (loading) {
        return <div>Cargando solicitudes...</div>;
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
                        listaNav={[{ item: t('admin.title'), target: '/admin', onClick: () => navigate('/admin') }]}
                        listEnd={[{ item: t("nav.cerrar_sesion"), onClick: () => console.log('Cerrar sesión') }]}
                        idiom={[
                            { item: 'ES', onClick: () => i18n.changeLanguage('es') },
                            { item: 'EN', onClick: () => i18n.changeLanguage('en') }
                        ]}
                    />
                </nav>
                <div id="lista_solicitudes" className="container mt-5">
                    <h2 className="text-center">Panel de Administración</h2>
                    <h4>Lista de Solicitudes de Reciclaje</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID Usuario</th>
                                <th>Fecha Recolección</th>
                                <th>Dirección</th>
                                <th>Código QR</th>
                                <th>Comentarios</th>
                                <th>Status</th>
                                <th>Centro</th>
                                <th>Recolector</th>
                                <th>Ubicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud) => (
                                <tr key={solicitud.id}>
                                    <td>{solicitud.id}</td>
                                    <td>{solicitud.id_usuario}</td>
                                    <td>{new Date(solicitud.fecha_recoleccion).toLocaleString()}</td>
                                    <td>{solicitud.direccion}</td>
                                    <td>{solicitud.codigo_qr}</td>
                                    <td>{solicitud.comentarios}</td>
                                    <td>{solicitud.status}</td>
                                    <td>{solicitud.id_centro}</td>
                                    <td>{solicitud.id_recolector}</td>
                                    <td>
                                        <button
                                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(solicitud.direccion)}`, '_blank')}
                                            className="map-button"
                                            title="Ver en Google Maps"
                                        >
                                            <FaMapMarkerAlt size={20} color="blue" />
                                        </button>
                                    </td>
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
