//Importamos los hooks.
import { useContext } from 'react';

// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el contexto de autorización.
import { AuthContext } from '../contexts/AuthContext';

// Importamos el avatar por defecto.
import defaultAvatar from '/default-avatar.png';

// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const UserProfilePage = () => {
    // Obtenemos los elementos necesarios del contexto de autorización.
    const { authUser } = useContext(AuthContext);

    // Si el usuario no esta logueado, redirigimos a la página principal.
    if (!authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de perfil de usuario</h2>

            <img
                src={
                    authUser.avatar
                        ? `${VITE_API_URL}/${authUser.avatar}`
                        : defaultAvatar
                }
                alt={authUser.username}
            />

            <ul>
                <li>Usuario: {authUser.username}</li>
            </ul>
        </main>
    );
};

export default UserProfilePage;
