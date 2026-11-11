import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/apiConfig';
import ListItems from '../components/ListItems';

function GestionItems() {
    const [peliculas, setPeliculas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [file, setFile] = useState(null);
    const [editandoId, setEditandoId] = useState(null);
    const [error, setError] = useState('');

    const { token } = useAuth();

    const cargarPeliculas = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}auth/items`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Error al cargar los elementos');
            const data = await response.json();
            setPeliculas(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        cargarPeliculas();
    }, [token]);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('genero', genero);
        if (file) {
            formData.append('file', file);
        }

        try {
            let url = `${API_BASE_URL}auth/items/registro`;
            let method = 'POST';

            if (editandoId) {
                url = `${API_BASE_URL}auth/items/${editandoId}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (!response.ok) throw new Error('Error al guardar el elemento');

            setTitulo('');
            setGenero('');
            setFile(null);
            setEditandoId(null);
            cargarPeliculas();
        } catch (err) {
            setError(err.message);
        }
    };

    const manejarEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este elemento?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}auth/items/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('No se pudo eliminar');
            cargarPeliculas();
        } catch (err) {
            setError(err.message);
        }
    };

    const manejarIniciarEdicion = (pelicula) => {
        setEditandoId(pelicula.id);
        setTitulo(pelicula.titulo);
        setGenero(pelicula.genero);
        setFile(null);
    };

    return (
        <div className="auth-container" style={{ maxWidth: '800px' }}>
            <h2>{editandoId ? 'Editar Película' : 'Registrar Película'}</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Género</label>
                    <input
                        type="text"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Foto</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <button type="submit">{editandoId ? 'Actualizar' : 'Guardar'}</button>
                {editandoId && (
                    <button
                        type="button"
                        style={{ backgroundColor: '#64748b', marginTop: '5px' }}
                        onClick={() => { setEditandoId(null); setTitulo(''); setGenero(''); setFile(null); }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <h2 style={{ marginTop: '30px' }}>Listado de Películas</h2>
            <ListItems
                peliculas={peliculas}
                onEliminar={manejarEliminar}
                onEditar={manejarIniciarEdicion}
                token={token}
            />
        </div>
    );
}

export default GestionItems;
