import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AddProductModal from "./AddProductModal";

const ProductManager = () => {
  const { autenticado, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/productos/productos/"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/productos/categorias/"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddProductSuccess = () => {
    setIsAddProductModalOpen(false);
    fetchProducts(); // Refrescar la lista de productos después de agregar uno nuevo
  };

  return (
    <div className="product-manager-container">
      <h2>Gestión de Productos</h2>

      {user && user.is_staff && (
        <button onClick={() => setIsAddProductModalOpen(true)}>
          Agregar Nuevo Producto
        </button>
      )}

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSuccess={handleAddProductSuccess}
        categories={categories}
      />

      <h3>Lista de Productos</h3>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <h4>{product.nombre}</h4>
              <p>{product.descripcion}</p>
              <p>Precio: ${product.precio}</p>
              <p>Stock: {product.stock}</p>
              <p>Categoría: {product.categoria_nombre}</p>
              {product.imagen && (
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
              {/* Aquí podrías agregar botones para editar/eliminar si el usuario es admin */}
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
