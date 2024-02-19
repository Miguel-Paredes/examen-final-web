// Importacion de Navigate
import { Navigate } from 'react-router-dom';

// Verificar las rutas privadas
//                              componentes
export const PrivateRoute = ({ children }) => 
{
    // Obtener el token del localStorage
    const autenticado = localStorage.getItem('token')
    // Si el usuario tiene token entonces navega a las rutas siguientes
    // caso contrario navega al login
    return (autenticado) ? children : <Navigate to='/login' />
}