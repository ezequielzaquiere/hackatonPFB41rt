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

    //Orden de clases Tailwind: colores-margenes-posicion-hover-focus-mediaQueries
    return (
        <header className="bg-[#191919] border-black border-b-1 px-20 py-5 text-ss relative flex justify-between items-center transition hover:bg-[#222222]">
            {/* Logo */}
            <Link to="/">
                <img
                    src="/logo.png"
                    alt="Hackverse"
                    className="h-10 hover:scale-115"
                />
            </Link>

            {/* NAV para Desktop */}
            <nav className="ml-28 space-x-8 relative hidden lg:flex">
                {!authUser ? (
                    <>
                        <Link
                            to="/hackathones"
                            className=" text-white transition hover:scale-115 hover:text-gray-300"
                        >
                            Hackathones
                        </Link>
                        <Link
                            to="/register"
                            className=" text-white transition hover:scale-115 hover:text-gray-300"
                        >
                            Registro
                        </Link>
                        <Link
                            to="/login"
                            className=" text-white transition hover:scale-115 hover:text-gray-300"
                        >
                            Iniciar Sesión
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/hackathones"
                            className=" text-white transition hover:scale-115 hover:text-gray-300"
                        >
                            Hackathones
                        </Link>

                        {authUser.role === 'admin' && (
                            <div className="flex gap-5">
                                <Link
                                    to="admin/myhackathons"
                                    className="text-white transition hover:scale-110 hover:text-gray-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Mis hackathones
                                </Link>

                                <Link
                                    to="/hackathon/new"
                                    className="text-white transition hover:scale-110 hover:text-gray-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Crear Hackathon
                                </Link>
                            </div>
                        )}

                        <button
                            onClick={authLogoutState}
                            className=" text-white transition hover:scale-115 hover:text-gray-300"
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
                className={`bg-[#222] border-1 border-[#7A3E8F] text-white w-50 h-auto p-6 flex flex-col absolute top-20 right-4 z-50 rounded-lg shadow-lg space-y-4 transition ${
                    isOpen ? 'block' : 'hidden'
                } lg:hidden`}
            >
                {!authUser ? (
                    <>
                        <Link
                            to="/hackathones"
                            className=" text-white transition hover:scale-115 hover:text-gray-300"
                        >
                            Hackathones
                        </Link>
                        <Link
                            to="/register"
                            className="transition hover:scale-105 hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Registro
                        </Link>
                        <Link
                            to="/login"
                            className="transition hover:scale-105 hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/hackathones"
                            className="transition hover:text-gray-300"
                        >
                            Hackathones
                        </Link>

                        {authUser.role === 'admin' && (
                            <>
                                <Link
                                    to="admin/myhackathons"
                                    className="transition hover:text-gray-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Mis hackathones
                                </Link>

                                <Link
                                    to="/hackathon/new"
                                    className="transition hover:text-gray-300 "
                                    onClick={() => setIsOpen(false)}
                                >
                                    Crear Hackathon
                                </Link>
                            </>
                        )}
                        <button
                            onClick={() => {
                                authLogoutState();
                                setIsOpen(false);
                            }}
                            className="bg-[#7A3E8F] text-white font-semibold max-w-[200px] px-4 py-2 my-3 rounded-lg shadow-[6px_6px_5px_#191919] transition hover:bg-[#9A4EAE] focus:outline-none focus:ring-2 focus:bg-[#9A4EAE] focus:ring-[#9A4EAE] focus:ring-opacity-50"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </nav>

            {/* Usuario Autenticado - Avatar y Nombre */}
            {authUser && (
                <Link to="/users/profile" className="hidden lg:block">
                    <div className="hidden min-w-10 h-full transition hover:scale-115 lg:flex lg:items-center">
                        <p className="text-white pr-4">@{authUser.username}</p>
                        <img
                            src={
                                authUser.avatar
                                    ? `${VITE_API_URL}/avatar/${authUser.avatar}`
                                    : defaultAvatar
                            }
                            alt={authUser.username}
                            className="border-2 border-white h-9 w-9 object-cover rounded-full shadow-md"
                        />
                    </div>
                </Link>
            )}
        </header>
    );
};

export default Header;
