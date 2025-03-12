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
    const backgroundImageUrl = `${VITE_API_URL}/imgHack/backg2.jpg`;

    // Si el usuario no esta logueado, redirigimos a la página principal.
    if (!authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main
            className="bg-[#191919] min-h-screen flex flex-col justify-center items-center px-10 py-10 text-s"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <h2 className="text-3xl text-center text-[#9A4EAE] mb-4">
                Página de perfil de usuario
            </h2>

            <img
                src={
                    authUser.avatar
                        ? `${VITE_API_URL}/avatar/${authUser.avatar}`
                        : defaultAvatar
                }
                alt={authUser.username}
            />

            <ul>
                <li className="text-xl text-center text-[#efeff5] mb-4">
                    Usuario: {authUser.username}
                </li>
            </ul>
        </main>
    );
};

export default UserProfilePage;
