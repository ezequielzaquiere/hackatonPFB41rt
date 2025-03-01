import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import defaultAvatar from '/default-avatar.png';
const { VITE_API_URL } = import.meta.env;

//Inicializamos el componente
const Header = () => {
    const { authUser, authLogOutState } = useContext(AuthContext);
    return (
        <header>
            <h1 className="text-red-500">
                {' '}
                <Link to="/">HACKAVERSE</Link>
            </h1>
            {
                // Si el usuario está autenticado, mostramos su información.
                authUser && (
                    <div className="user-info">
                        <p>
                            @{authUser.username} ({authUser.role})
                        </p>
                        <img
                            src={
                                authUser.avatar
                                    ? `${VITE_API_URL}/${authUser.avatar}`
                                    : defaultAvatar
                            }
                            alt={authUser.username}
                        />
                    </div>
                )
            }

            <nav>
                <ul>
                    {!authUser ? (
                        <>
                            <li>
                                <Link to="/register">Registro</Link>
                            </li>
                            <li>
                                <Link to="/login">Iniciar Sesión</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            authUser.role === `admin` && (
                            <li>
                                <Link to="/hackathon/new">Nuevo Hackathon</Link>
                            </li>
                            )
                        </>
                    )}
                    <li>
                        <Link to="/users/profile">Mi perfil</Link>
                    </li>
                    <li>
                        <Link to="/users/password/change">
                            Cambiar contraseña
                        </Link>
                    </li>
                    <li>
                        <Link to="/details">Detalles de los hackathones</Link>
                    </li>
                    <li>
                        <button onClick={() => authLogOutState}>
                            {' '}
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default Header;
