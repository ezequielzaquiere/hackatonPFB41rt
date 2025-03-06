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
        <main className="bg-[#191919] min-h-screen flex flex-col justify-center items-center px-10 py-10 text-s">
            <h2 className="text-3xl text-center text-[#9A4EAE] mb-4">
                Área privada de usuario. Bienvenid@, {authUser.username}!
            </h2>
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
                    <li className="text-xl text-center text-[#efeff5] mb-4">
                        Nombre: {authUser.firstName}
                    </li>
                    <li className="text-xl text-center text-[#efeff5] mb-4">
                        Apellido: {authUser.lastName}
                    </li>
                    <li className="text-xl text-center text-[#efeff5] mb-4">
                        Usuario: {authUser.username}
                    </li>
                    <li className="text-xl text-center text-[#efeff5] mb-4">
                        Email: {authUser.email}
                    </li>
                    <li>
                        <Link
                            to="/users/profile/update"
                            className="text-[#9A4EAE] hover:underline text-center text-sm"
                        >
                            Editar perfil
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/${authUser.username}/registrations`}
                            className="text-[#9A4EAE] hover:underline text-center text-sm"
                        >
                            Ver mis inscripciones
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/users/password/change"
                            className="text-[#9A4EAE] hover:underline text-center text-sm"
                        >
                            Cambiar contraseña
                        </Link>
                    </li>
                </ul>
            </>
        </main>
    );
};

export default PrivateUserProfilePage;
