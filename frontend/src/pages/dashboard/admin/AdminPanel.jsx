import { useEffect, useState, useContext } from "react";
import {
  getProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
} from "../../../services/productos";
import { AuthContext } from "../../../context/AuthContext";
import "./AdminPanel.css";

const categoriasDisponibles = [
  "Útiles",
  "Snacks",
  "Bebidas",
  "Libros",
  "Tecnología",
  "Otros",
];

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modoEdicion, setModoEdicion] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria: categoriasDisponibles[0], // valor por defecto
  });

  useEffect(() => {
    if (user?.tipo === "admin") {
      getProductos()
        .then(setProductos)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrear = async () => {
    try {
      await crearProducto(nuevoProducto);
      const actualizados = await getProductos();
      setProductos(actualizados);
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
        categoria: categoriasDisponibles[0],
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleEditar = async (id) => {
    try {
      const productoActualizado = productos.find((p) => p.id === id);
      await editarProducto(id, productoActualizado);
      setModoEdicion(null);
      const actualizados = await getProductos();
      setProductos(actualizados);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Eliminar este producto?")) {
      try {
        await eliminarProducto(id);
        setProductos((prev) => prev.filter((p) => p.id !== id));
      } catch (e) {
        alert(e.message);
      }
    }
  };

  if (user?.tipo !== "admin") return <p>No tenés permisos para acceder a este panel.</p>;

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>

      <h3>Agregar nuevo producto</h3>
      <div className="admin-form">
        <input
          name="nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="descripcion"
          value={nuevoProducto.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          name="precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
          type="number"
          placeholder="Precio"
        />
        <input
          name="stock"
          value={nuevoProducto.stock}
          onChange={handleChange}
          type="number"
          placeholder="Stock"
        />
        <input
          name="imagen"
          value={nuevoProducto.imagen}
          onChange={handleChange}
          placeholder="URL Imagen"
        />
        {/* Select categoría */}
        <select
          name="categoria"
          value={nuevoProducto.categoria}
          onChange={handleChange}
        >
          {categoriasDisponibles.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleCrear}>Crear</button>
      </div>

      <h3>Lista de productos</h3>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                {modoEdicion === p.id ? (
                  <>
                    <td>
                      <input
                        value={p.nombre}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((prod) =>
                              prod.id === p.id ? { ...prod, nombre: e.target.value } : prod
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={p.descripcion}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((prod) =>
                              prod.id === p.id ? { ...prod, descripcion: e.target.value } : prod
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={p.precio}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((prod) =>
                              prod.id === p.id ? { ...prod, precio: e.target.value } : prod
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((prod) =>
                              prod.id === p.id ? { ...prod, stock: e.target.value } : prod
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={p.imagen}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((prod) =>
                              prod.id === p.id ? { ...prod, imagen: e.target.value } : prod
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      {/* Select categoría en edición */}
                      <select
                        value={p.categoria || categoriasDisponibles[0]}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((prod) =>
                              prod.id === p.id ? { ...prod, categoria: e.target.value } : prod
                            )
                          )
                        }
                      >
                        {categoriasDisponibles.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleEditar(p.id)}>Guardar</button>
                      <button onClick={() => setModoEdicion(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>${p.precio}</td>
                    <td style={{ color: p.stock < 5 ? "red" : "inherit" }}>{p.stock}</td>
                    <td>
                      <img src={p.imagen} alt={p.nombre} width="50" />
                    </td>
                    <td>{p.categoria || "-"}</td>
                    <td>
                      <button onClick={() => setModoEdicion(p.id)}>✏️</button>
                      <button onClick={() => handleEliminar(p.id)}>🗑️</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
