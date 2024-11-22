import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

const GestionUser = () => {
    const { t, i18n } = useTranslation(); // Traducción
    const [usuarios, setUsuarios] = useState([]);  // Estado para guardar los usuarios
    const [loading, setLoading] = useState(true);  // Estado para manejar el loading
    const navigate = useNavigate(); // Hook para navegar entre rutas

    // Lista de navegación sin "Iniciar sesión" ni "Registrarse"
    const items = [
        { item: 'nav.inicio', target: '/admin', onClick: () => navigate('/admin') }, // Redirigir a Home
        { item: 'nav.lista_usuarios', target: '#lista_usuarios' }
    ];

    // Añadimos solo "Cerrar sesión" como opción final
    const itemsEnd = [
        { item: t("nav.cerrar_sesion"), target: '', onClick: () => console.log('Cerrar sesión') },
    ];

    // Opciones de idiomas
    const idiom = [
        { item: 'ES', onClick: () => i18n.changeLanguage('es') },
        { item: 'EN', onClick: () => i18n.changeLanguage('en') },
    ];

    // Obtener usuarios desde la API
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://apipyton.onrender.com/api/usuario/all');
                const data = await response.json();
                setUsuarios(data.body.data.usuarios);  // Guardamos los usuarios
                setLoading(false);  // Cambia el estado de loading
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    if (loading) {
        return <div>{t("gestion_user.loading")}</div>;  // Muestra un mensaje mientras carga
    }

    return (
        <>
            <nav id="nav" className="backg sticky-nav">
                <Nav 
                    listaNav={items.map(item => ({ item: t(item.item), target: item.target, onClick: item.onClick }))}
                    listEnd={itemsEnd.map(item => ({ item: item.item, onClick: item.onClick }))}
                    idiom={idiom.map(item => ({ item: item.item, onClick: item.onClick }))}
                />
            </nav>
            <div id="lista_usuarios" className="container mt-5">
                <h4>{t("gestion_user.titulo")}</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{t("gestion_user.tabla.id")}</th>
                            <th>{t("gestion_user.tabla.nombre")}</th>
                            <th>{t("gestion_user.tabla.apellido")}</th>
                            <th>{t("gestion_user.tabla.edad")}</th>
                            <th>{t("gestion_user.tabla.genero")}</th>
                            <th>{t("gestion_user.tabla.email")}</th>
                            <th>{t("gestion_user.tabla.telefono")}</th>
                            <th>{t("gestion_user.tabla.pais")}</th>
                            <th>{t("gestion_user.tabla.ciudad")}</th>
                            <th>{t("gestion_user.tabla.ocupacion")}</th>
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
        </>
    );
};

export default GestionUser;
