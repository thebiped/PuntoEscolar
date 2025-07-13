import { useEffect, useState } from "react";
import { getProductos } from "../../services/productos";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch((e) => alert(e.message));
  }, []);

  return (
    <div>
      <h2>Listado de Productos</h2>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio} - Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
