import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSave, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './styles/Material.css';

const MaterialList = () => {
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

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("https://apipyton.onrender.com/api/material/all");
        const result = await response.json();

        const materialsData = result.body?.data?.Material;

        if (materialsData) {
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
        `https://apipyton.onrender.com/api/material/update/${editingMaterial.id}`,
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
            material.id === editingMaterial.id ? editingMaterial : material
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
    <div className="container">
      <h1 className="my-4 text-center">Gestión de Materiales</h1>
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Botón para mostrar/ocultar el formulario de añadir material */}
      <button
        className="btn button mb-4 d-flex align-items-center"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? <FaChevronUp /> : <FaChevronDown />}
        {showAddForm ? " Ocultar Formulario" : " Añadir Nuevo Material"}
      </button>

      {/* Formulario para añadir material */}
      {showAddForm && (
        <form onSubmit={handleAddMaterial} className="mb-4 p-4 border rounded bg-light">
          <h3 className="mb-3">Añadir Nuevo Material</h3>
          <div className="mb-3">
            <label>Nombre del Material:</label>
            <input
              type="text"
              className="form-control"
              value={newMaterial.nombre_material}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, nombre_material: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label>Unidad de Medida:</label>
            <input
              type="text"
              className="form-control"
              value={newMaterial.unidad_medida}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, unidad_medida: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label>Descripción:</label>
            <textarea
              className="form-control"
              value={newMaterial.descripcion}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, descripcion: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label>URL de la Foto:</label>
            <input
              type="text"
              className="form-control"
              value={newMaterial.foto}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, foto: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-success">
            <FaPlus /> Añadir Material
          </button>
        </form>
      )}

      {/* Formulario para actualizar material */}
      {editingMaterial && (
        <form onSubmit={handleUpdateMaterial} className="mb-4 p-4 border rounded bg-light">
          <h3>Actualizar Material</h3>
          <div className="mb-3">
            <label>Nombre del Material:</label>
            <input
              type="text"
              className="form-control"
              value={editingMaterial.nombre_material}
              onChange={(e) =>
                setEditingMaterial({ ...editingMaterial, nombre_material: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label>Unidad de Medida:</label>
            <input
              type="text"
              className="form-control"
              value={editingMaterial.unidad_medida}
              onChange={(e) =>
                setEditingMaterial({ ...editingMaterial, unidad_medida: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label>Descripción:</label>
            <textarea
              className="form-control"
              value={editingMaterial.descripcion}
              onChange={(e) =>
                setEditingMaterial({ ...editingMaterial, descripcion: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label>URL de la Foto:</label>
            <input
              type="text"
              className="form-control"
              value={editingMaterial.foto}
              onChange={(e) =>
                setEditingMaterial({ ...editingMaterial, foto: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-success">
            <FaSave /> Guardar Cambios
          </button>
        </form>
      )}

      {/* Lista de materiales */}
      <ul className="list-group">
        {materials.map((material) => (
          <li
            key={material.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h4>{material.nombre_material || "Nombre no disponible"}</h4>
              <p>{material.descripcion || "Sin descripción"}</p>
              <p>
                <strong>Unidad de medida:</strong> {material.unidad_medida || "No especificada"}
              </p>
            </div>
            {material.foto.startsWith("http") ? (
              <img
                src={material.foto}
                alt={material.nombre_material}
                style={{ width: "100px", borderRadius: "8px" }}
              />
            ) : (
              <p>Sin foto válida</p>
            )}
            <button
              onClick={() => handleEditMaterial(material)}
              className="btn btn-link"
              style={{ color: "blue" }}
            >
              <FaEdit />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialList;
