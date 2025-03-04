//Importamos los hooks.
import { useContext } from 'react';

// Importamos los componentes.
import { Link, Navigate } from 'react-router-dom';

// Importamos el contexto de autorización.
import { AuthContext } from '../contexts/AuthContext';

// Importamos el avatar por defecto.
import defaultAvatar from '/default-avatar.png';

// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const PrivateUserProfilePage = () => {
    // Obtenemos los elementos necesarios del contexto de autorización.
    const { authToken, authUser } = useContext(AuthContext);

    // Si no existe token o el usuario no esta logueado, redirigimos a la página principal.
    if (!authToken || !authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <h2>Página de mi perfil</h2>
            <>
                <img
                    src={
                        authUser.avatar
                            ? `${VITE_API_URL}/avatar/${authUser.avatar}`
                            : defaultAvatar
                    }
                    alt={authUser.username}
                />

                <ul>
                    <li>Nombre: {authUser.firstName}</li>
                    <li>Apellido: {authUser.lastName}</li>
                    <li>Usuario: {authUser.username}</li>
                    <li>Email: {authUser.email}</li>
                    <li>
                        <Link to="/users/profile/update">Editar perfil</Link>
                    </li>
                    <li>
                        <Link to="/users/password/change">
                            Cambiar contraseña
                        </Link>
                    </li>
                </ul>
            </>
        </main>
    );
};

export default PrivateUserProfilePage;
