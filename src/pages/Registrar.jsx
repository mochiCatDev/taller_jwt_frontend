import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

function Registrar() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rol, setRol] = useState('USER');
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const manejarSubmit = async e => {
		e.preventDefault();
		setError('');
		setMensaje('');

		try {
			const response = await fetch(`${API_BASE_URL}auth/registrar`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password, rol })
			});

			if (!response.ok) {
				const errorData = await response.text();
				throw new Error(errorData || 'Error al registrar usuario');
			}

			setMensaje('¡Usuario registrado con éxito! Redirigiendo al login...');
			
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h1>Registro de Usuario</h1>
			<form onSubmit={manejarSubmit}>
				<div>
					<label>Usuario</label>
					<input
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Contraseña</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Rol</label>
					<select value={rol} onChange={e => setRol(e.target.value)}>
						<option value="USER">USER</option>
						<option value="ADMIN">ADMIN</option>
					</select>
				</div>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
				<button type="submit">Registrarse</button>
			</form>
			<p>
				¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
			</p>
		</div>
	);
}

export default Registrar;
