// Importamos los hooks.
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

    // Si no existe token o el usuario no está logueado, redirigimos a la página principal.
    if (!authToken || !authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="bg-[#191919] min-h-screen flex flex-col justify-center items-center px-10 py-12 lg:px-16 lg:py-20">
            {/* Encabezado */}
            <h2 className="text-3xl text-center text-[#9A4EAE] mb-6">
                Área privada de usuario
            </h2>
            <p className="text-lg lg:text-base text-center text-white mb-6">
                Bienvenid@,{' '}
                <span className="font-semibold">{authUser.username}</span>!
            </p>

            {/* Imagen de perfil */}
            <div className="flex flex-col items-center bg-[#222] p-10 rounded-lg shadow-lg w-full max-w-md">
                <img
                    src={
                        authUser.avatar
                            ? `${VITE_API_URL}/avatar/${authUser.avatar}`
                            : defaultAvatar
                    }
                    alt={authUser.username}
                    className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-full border-4 border-[#9A4EAE] shadow-md mb-6"
                />

                {/* Datos del usuario */}
                <ul className="w-full flex flex-col gap-4">
                    <li className="text-base text-white">
                        <strong className="text-[#9A4EAE]">Nombre:</strong>{' '}
                        {authUser.firstName}
                    </li>
                    <li className="text-base text-white">
                        <strong className="text-[#9A4EAE]">Apellido:</strong>{' '}
                        {authUser.lastName}
                    </li>
                    <li className="text-base text-white">
                        <strong className="text-[#9A4EAE]">Usuario:</strong>{' '}
                        {authUser.username}
                    </li>
                    <li className="text-base text-white">
                        <strong className="text-[#9A4EAE]">Email:</strong>{' '}
                        {authUser.email}
                    </li>
                </ul>

                {/* Botones de acción */}
                <div className="mt-6 flex flex-col items-center w-full gap-3 mt-10">
                    <Link
                        to="/users/profile/update"
                        className="min-w-[220px] text-center py-2 bg-[#7A3E8F] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition-all"
                    >
                        Editar perfil
                    </Link>

                    <Link
                        to={`/${authUser.username}/registrations`}
                        className="min-w-[220px] text-center py-2 bg-[#7A3E8F] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition-all"
                    >
                        Ver mis inscripciones
                    </Link>

                    <Link
                        to="/users/password/change"
                        className="min-w-[220px] text-center py-2 bg-[#7A3E8F] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition-all"
                    >
                        Cambiar contraseña
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PrivateUserProfilePage;
