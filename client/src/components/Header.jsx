import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react'; // Iconos de menú hamburguesa
import defaultAvatar from '/default-avatar.png';
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-[#191919] border-black border-b-1 text-ss px-20 py-5 flex justify-between items-center relative">
            {/* Logo */}
            <Link to="/">
                <img
                    src="/logo.png"
                    alt="Hackverse"
                    className="h-10 hover:scale-115"
                />
            </Link>

            {/* NAV para Desktop */}
            <nav className="relative ml-28 hidden lg:flex space-x-8">
                {!authUser ? (
                    <>
                        <Link
                            to="/register"
                            className="text-white transition hover:scale-115"
                        >
                            Registro
                        </Link>
                        <Link
                            to="/login"
                            className="text-white transition hover:scale-115"
                        >
                            Iniciar Sesión
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/users/profile"
                            className="text-white transition hover:scale-115"
                        >
                            Mi perfil
                        </Link>

                        {authUser.role === 'admin' && (
                            <Link
                                to="/hackathon/new"
                                className="text-white transition hover:scale-115"
                            >
                                Nuevo Hackathon
                            </Link>
                        )}

                        <button
                            onClick={authLogoutState}
                            className="text-white transition hover:scale-115"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </nav>

            {/* Botón de Menú Hamburguesa para móviles */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none lg:hidden"
            >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Menú Hamburguesa */}
            <nav
                className={`absolute top-20 right-4 bg-[#222] text-white p-6 rounded-lg shadow-lg w-64 h-auto z-50 flex flex-col space-y-4 transition-all duration-300 ${
                    isOpen ? 'block' : 'hidden'
                } lg:hidden`}
            >
                {!authUser ? (
                    <>
                        <Link
                            to="/register"
                            className="hover:text-gray-300 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Registro
                        </Link>
                        <Link
                            to="/login"
                            className="hover:text-gray-300 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/users/profile"
                            className="hover:text-gray-300 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Mi perfil
                        </Link>

                        {authUser.role === 'admin' && (
                            <Link
                                to="/hackathon/new"
                                className="hover:text-gray-300 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Nuevo Hackathon
                            </Link>
                        )}
                        <button
                            onClick={() => {
                                authLogoutState();
                                setIsOpen(false);
                            }}
                            className="max-w-[200px] px-4 py-2 my-3 font-semibold rounded-lg shadow-[6px_6px_5px_#191919] text-white transition bg-[#7A3E8F]  hover:bg-[#9A4EAE] focus:outline-none focus:ring-2 focus:bg-[#9A4EAE] focus:ring-[#9A4EAE] focus:ring-opacity-50"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </nav>

            {/* Usuario Autenticado - Avatar y Nombre */}
            {authUser && (
                <Link to="/users/profile" className="hidden">
                    <div className="hover:scale-115 transition hidden lg:flex items-center">
                        <p className="text-white">@{authUser.username}</p>
                        <img
                            src={
                                authUser.avatar
                                    ? `${VITE_API_URL}/avatar/${authUser.avatar}`
                                    : defaultAvatar
                            }
                            alt={authUser.username}
                            className="h-9 w-9 object-cover rounded-full border-2 border-white shadow-md"
                        />
                    </div>
                </Link>
            )}
        </header>
    );
};

export default Header;
