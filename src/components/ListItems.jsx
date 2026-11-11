import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/apiConfig';

function CardItem({ pelicula, token, onEliminar, onEditar }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        let objectUrl = '';
        const fetchImage = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}auth/items/${pelicula.id}/foto`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const blob = await response.blob();
                    objectUrl = URL.createObjectURL(blob);
                    setImageUrl(objectUrl);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchImage();

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [pelicula.id, token]);

    return (
        <div className="card">
            <img
                src={imageUrl || 'https://via.placeholder.com/150'}
                alt={pelicula.titulo}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
            />
            <div className="card-body">
                <h3>{pelicula.titulo}</h3>
                <p><strong>Género:</strong> {pelicula.genero}</p>

                <div className="card-actions">
                    <button className="btn-edit" onClick={() => onEditar(pelicula)}>Editar</button>
                    <button className="btn-delete" onClick={() => onEliminar(pelicula.id)}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

function ListItems({ peliculas, onEliminar, onEditar, token }) {
    return (
        <div className="grid-cards">
            {peliculas.map((pelicula) => (
                <CardItem
                    key={pelicula.id}
                    pelicula={pelicula}
                    token={token}
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                />
            ))}
        </div>
    );
}

export default ListItems;
