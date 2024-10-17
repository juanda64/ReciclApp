import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import { useTranslation } from "react-i18next";

const Admin = () => {
    const { t, i18n } = useTranslation(); // Traducción
    const [usuarios, setUsuarios] = useState([]);  // Estado para guardar los usuarios
    const [loading, setLoading] = useState(true);  // Estado para manejar el loading

    // Lista de navegación sin "Iniciar sesión" ni "Registrarse"
    const items = [
        { item: 'nav.inicio', target: '#inicio' },
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
        return <div>Cargando usuarios...</div>;  // Muestra un mensaje mientras carga
    }

    return (
        <>
            <nav id="nav" className='backg sticky-nav'>
                <Nav 
                    listaNav={items.map(item => ({ item: t(item.item), target: item.target }))}
                    listEnd={itemsEnd.map(item => ({ item: item.item, onClick: item.onClick }))}
                    idiom={idiom.map(item => ({ item: item.item, onClick: item.onClick }))}
                />
            </nav>
            <div id ="lista_usuarios" className="container mt-5">
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
        </>
    );
};

export default Admin;
