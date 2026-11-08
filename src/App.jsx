import { BrowserRouter, Routes } from 'react-router-dom';
import { AuthProvaider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvaider>
    	<BrowserRouter>
			<Routes>
				<Route path='/login' element={ <Login /> } />
				<Route element={<ProtectedRoute />}>
					<Route path='/perfil' element={<Perfil />} />
				</Route>
				<Route path='*' element={<Navigate to='/login'} replace />
			</Routes>
    	</BrowserRouter>
    </AuthProvaider>
  )
}

export default App
