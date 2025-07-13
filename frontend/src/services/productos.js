
import api from "./api";

const API_URL = "/productos/";

export const getProductos = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw new Error("Error al obtener productos");
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await api.post(`${API_URL}crear/`, producto);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error("Error al crear producto");
  }
};

export const editarProducto = async (id, productoActualizado) => {
  try {
    const response = await api.put(`${API_URL}${id}/editar/`, productoActualizado);
    return response.data;
  } catch (error) {
    console.error("Error al editar producto:", error);
    throw new Error("Error al editar producto");
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await api.delete(`${API_URL}${id}/eliminar/`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw new Error("Error al eliminar producto");
  }
};
