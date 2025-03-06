import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import defaultAvatar from '/default-avatar.png';
const { VITE_API_URL } = import.meta.env;

//Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useContext(AuthContext);
    return (
        <header className="bg-[#191919] p-6 lg:px-12 lg:py-8">
            {
                // Si el usuario está autenticado, mostramos su información.
                authUser && (
                    <div className="absolute top-2 right-2 flex items-center space-x-2">
                        <p className="text-white">@{authUser.username}</p>
                        <img
                            src={
                                authUser.avatar
                                    ? `${VITE_API_URL}/avatar/${authUser.avatar}`
                                    : defaultAvatar
                            }
                            alt={authUser.username}
                            className="h-12 w-12 rounded-full border-2 border-white shadow-md"
                        />
                    </div>
                )
            }

            <nav className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                <ul>
                    <li>
                        <Link
                            to="/"
                            className="text-white hover:text-gray-300 transition"
                        >
                            Página principal
                        </Link>
                    </li>
                    {!authUser ? (
                        <>
                            <li>
                                <Link
                                    to="/register"
                                    className="text-white hover:text-gray-300 transition"
                                >
                                    Registro
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="text-white hover:text-gray-300 transition"
                                >
                                    Iniciar Sesión
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {authUser.role === 'admin' && (
                                <li>
                                    <Link
                                        to="/hackathon/new"
                                        className="text-white hover:text-gray-300 transition"
                                    >
                                        Nuevo Hackathon
                                    </Link>
                                </li>
                            )}

                            <li>
                                <Link
                                    to="/users/profile"
                                    className="text-white hover:text-gray-300 transition"
                                >
                                    Mi perfil
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => authLogoutState()}
                                    className="text-white hover:text-gray-300 transition"
                                >
                                    {' '}
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
export default Header;
