import React, { useState } from 'react';
import axios from 'axios';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onSuccess, categories }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('stock', stock);
        console.log('Category ID before parseInt:', categoria);
        const parsedCategoria = parseInt(categoria, 10);
        console.log('Category ID after parseInt:', parsedCategoria);
        formData.append('categoria_id', parsedCategoria);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            const token = localStorage.getItem('token');

            await axios.post('http://localhost:8000/api/productos/productos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}` 
                },
            });
            onSuccess(); 
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setStock('');
            setCategoria('');
            setImagen(null);
        } catch (err) {
            console.error('Error adding product:', err.response ? err.response.data : err);
            setError('Error al agregar el producto. Verifica los datos.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Agregar Nuevo Producto</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Stock:</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Categoría:</label>
                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                            <option value="">Selecciona una categoría</option>
                            {categories.filter(cat => cat.id !== 'todos').map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Imagen:</label>
                        <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button type="submit">Agregar Producto</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;