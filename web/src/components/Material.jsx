import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const items = [
    { item: t("nav.inicio"), target: "/admin", onClick: () => navigate("/admin") },
    { item: t("nav.lista_materiales"), target: "#lista_materiales" }
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
          throw new Error(t("materials.error", { error: response.statusText }));
        }
        const result = await response.json();
        const materialsData = result.body?.data?.Material;

        if (Array.isArray(materialsData)) {
          setMaterials(materialsData);
        } else {
          throw new Error(t("materials.error", { error: "Unexpected format" }));
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching materials:", err);
      }
    };

    fetchMaterials();
  }, [t]);

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
        throw new Error(t("materials.error", { error: "Failed to add material" }));
      }

      const result = await response.json();
      if (result.success) {
        setMaterials((prev) => [...prev, result.data]);
        setNewMaterial({ nombre_material: "", unidad_medida: "", descripcion: "", foto: "" });
        setShowAddForm(false);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error adding material:", err);
    }
  };

  return (
    <>
      <nav id="nav" className="backg sticky-nav">
        <Nav
          listaNav={items.map((item) => ({ item: t(item.item), target: item.target, onClick: item.onClick }))}
          listEnd={itemsEnd}
          idiom={idiom}
        />
      </nav>
      <div className="container">
        <h1 className="my-4 text-center">{t("materials.title")}</h1>
        {error && <p className="text-danger">{t("materials.error", { error })}</p>}
        <button className="btn button mb-4" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? <FaChevronUp /> : <FaChevronDown />}
          {showAddForm ? ` ${t("materials.hide_form_button")}` : ` ${t("materials.add_button")}`}
        </button>
        {showAddForm && (
          <form onSubmit={handleAddMaterial} className="mb-4 p-4 border rounded bg-light">
            <h3 className="mb-3">{t("materials.form_title")}</h3>
            <div className="mb-3">
              <label>{t("materials.form_name_label")}</label>
              <input
                type="text"
                className="form-control"
                value={newMaterial.nombre_material}
                onChange={(e) => setNewMaterial({ ...newMaterial, nombre_material: e.target.value })}
                required
              />
            </div>
          </form>
        )}
        <ul className="list-group">
          {materials.map((material) => (
            <li key={material._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h4>{material.nombre_material || t("materials.no_description")}</h4>
                <p>{material.descripcion || t("materials.no_description")}</p>
              </div>
              {material.foto?.startsWith("http") ? (
                <img src={material.foto} alt={material.nombre_material} style={{ width: "100px" }} />
              ) : (
                <p>{t("materials.no_photo")}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MaterialList;
