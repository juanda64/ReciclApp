import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSave, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Traducción
import { useNavigate } from "react-router-dom"; // Navegación
import './styles/Material.css';
import Nav from "./Nav";

const MaterialList = () => {
  const { t, i18n } = useTranslation();
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    nombre_material: "",
    unidad_medida: "",
    descripcion: "",
    foto: "",
  });
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const items = [
    { item: "nav.inicio", target: "/admin", onClick: () => navigate("/admin") },
    { item: "nav.lista_usuarios", target: "#lista_usuarios" }
  ];

  const itemsEnd = [
    { item: t("nav.cerrar_sesion"), target: "", onClick: () => console.log("Cerrar sesión") },
  ];

  const idiom = [
    { item: "ES", onClick: () => i18n.changeLanguage("es") },
    { item: "EN", onClick: () => i18n.changeLanguage("en") },
  ];

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("https://apipyton.onrender.com/api/material/all");
        if (!response.ok) {
          throw new Error("Error al obtener materiales");
        }

        const result = await response.json();
        const materialsData = result.body?.data?.Material;

        if (Array.isArray(materialsData)) {
          setMaterials(materialsData);
        } else {
          throw new Error("Datos no disponibles o formato inesperado");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener materiales:", err);
      }
    };

    fetchMaterials();
  }, []);

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://apipyton.onrender.com/api/material/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMaterial),
      });

      if (!response.ok) {
        throw new Error("Error al añadir el material");
      }

      const result = await response.json();

      if (result.success) {
        setMaterials((prevMaterials) => [...prevMaterials, result.data]);
        setNewMaterial({
          nombre_material: "",
          unidad_medida: "",
          descripcion: "",
          foto: "",
        });
        setShowAddForm(false);
      } else {
        throw new Error(result.error || "Error desconocido");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error al añadir material:", err);
    }
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
  };

  const handleUpdateMaterial = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://apipyton.onrender.com/api/material/update/${editingMaterial._id}`, // Uso de _id
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingMaterial),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el material");
      }

      const result = await response.json();

      if (result.success) {
        setMaterials((prevMaterials) =>
          prevMaterials.map((material) =>
            material._id === editingMaterial._id ? editingMaterial : material
          )
        );
        setEditingMaterial(null);
      } else {
        throw new Error(result.error || "Error desconocido");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error al actualizar material:", err);
    }
  };

  return (
    <>
      <nav id="nav" className="backg sticky-nav">
        <Nav
          listaNav={items.map((item) => ({ item: t(item.item), target: item.target, onClick: item.onClick }))}
          listEnd={itemsEnd.map((item) => ({ item: item.item, onClick: item.onClick }))}
          idiom={idiom.map((item) => ({ item: item.item, onClick: item.onClick }))}
        />
      </nav>
      <div className="container">
        <h1 className="my-4 text-center">Gestión de Materiales</h1>
        {error && <p className="text-danger">Error: {error}</p>}

        <button
          className="btn button mb-4 d-flex align-items-center"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? <FaChevronUp /> : <FaChevronDown />}
          {showAddForm ? " Ocultar Formulario" : " Añadir Nuevo Material"}
        </button>

        {showAddForm && (
          <form onSubmit={handleAddMaterial} className="mb-4 p-4 border rounded bg-light">
            <h3 className="mb-3">Añadir Nuevo Material</h3>
            <div className="mb-3">
              <label>Nombre del Material:</label>
              <input
                type="text"
                className="form-control"
                value={newMaterial.nombre_material}
                onChange={(e) => setNewMaterial({ ...newMaterial, nombre_material: e.target.value })}
                required
              />
            </div>
            {/* Otros campos */}
          </form>
        )}

        <ul className="list-group">
          {materials.map((material) => (
            <li
              key={material._id} // Cambio a _id
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h4>{material.nombre_material || "Nombre no disponible"}</h4>
                <p>{material.descripcion || "Sin descripción"}</p>
              </div>
              {material.foto?.startsWith("http") ? ( // Validación de URL
                <img
                  src={material.foto}
                  alt={material.nombre_material}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              ) : (
                <p>Sin foto válida</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MaterialList;
