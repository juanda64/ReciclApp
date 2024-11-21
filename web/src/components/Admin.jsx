import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaCog, FaSignOutAlt, FaBars, FaUser, FaBox, FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';
import Nav from "./Nav";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import './styles/Admin.css'; 



const Admin = () => {
    const { t, i18n } = useTranslation();
    const [solicitudes, setSolicitudes] = useState([]);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showConfigItems, setShowConfigItems] = useState(false);
    const navigate = useNavigate();  // Usamos useNavigate para redirigir a diferentes rutas

    useEffect(() => {
        const fetchData = async () => {
            try {
                const solicitudesResponse = await fetch('https://apipyton.onrender.com/api/solicitudes/all');
                const solicitudesData = await solicitudesResponse.json();
                setSolicitudes(solicitudesData.body.data.solicitudes);

                const usuariosResponse = await fetch('https://apipyton.onrender.com/api/users/all');
                const usuariosData = await usuariosResponse.json();
                setTotalUsuarios(usuariosData.body.data.total);

                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div className={`admin-container ${isCollapsed ? 'collapsed' : ''}`}>
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="toggle-btn">
                    <FaBars />
                </button>
                <h3 className="menu-title">{!isCollapsed && 'Menú'}</h3>
                <ul className="menu-list">
                    <li onClick={() => console.log('Dashboard')}>
                        <FaTachometerAlt size={22} />
                        {!isCollapsed && <span>Dashboard</span>}
                    </li>
                </ul>
                <ul className="menu-list bottom-menu">
                    <li
                        onClick={() => setShowConfigItems(!showConfigItems)}
                        className={`menu-item ${showConfigItems ? 'active' : ''}`}
                    >
                        <FaCog size={22} />
                        {!isCollapsed && <span>Configuración</span>}
                    </li>
                    {showConfigItems && !isCollapsed && (
                        <ul className="config-items">
                            <li onClick={() => navigate('/admin/perfil')}>
                                <FaUser size={20} /> <span>Perfil</span>
                            </li>
                            <li onClick={() => navigate('/admin/usuarios')}>
                                <FaUserFriends size={20} /> <span>Usuarios</span>
                            </li>
                            <li onClick={() => navigate('/admin/materiales')}>
                                <FaBox size={20} /> <span>Materiales</span> {/* Ruta Materiales */}
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
                <nav id="nav" className="backg sticky-nav">
                    <Nav
                        listaNav={[{ item: t('admin.title'), target: '/admin', onClick: () => navigate('/admin') }]}
                        listEnd={[{ item: t("nav.cerrar_sesion"), onClick: () => console.log('Cerrar sesión') }]}
                        idiom={[{ item: 'ES', onClick: () => i18n.changeLanguage('es') }, { item: 'EN', onClick: () => i18n.changeLanguage('en') }]}
                    />
                </nav>
                <div id="lista_solicitudes" className="container mt-5">
                    <div className="stats-container">
                        <div className="stat-card">
                            <h3 className="stat-title">Usuarios</h3>
                            <p className="stat-value">{totalUsuarios}</p>
                        </div>
                        <div className="stat-card">
                            <h3 className="stat-title">Solicitudes</h3>
                            <p className="stat-value">{solicitudes.length}</p>
                        </div>
                    </div>
                    <h4>Lista de Solicitudes de Reciclaje</h4>
                    <div className="table-container">
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
                                                <FaMapMarkerAlt size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
