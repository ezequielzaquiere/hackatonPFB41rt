import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


//Inicializamos el componente
const Header = () => {
    const{ authUser, authLogOutState } = useContext(AuthContext);
    return (
        <header>
            <h1 className="text-red-500">
                {' '}
                <Link to="/">HACKAVERSE</Link>
            </h1>

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
                    ) :( 
                        <>
                        authUser.role === `admin` && (
                            <li>
                                <Link to="/hackathon/new">Nuevo Hackathon</Link>
                            </li>
                        )
                        </>   

                    )} 
                    
                    <li>
                        <Link to="/details">Detalles de los hackathones</Link>
                    </li>
                    <li>
                        <button onClick={()=>authLogOutState}> Cerrar Sesión</button>
                    </li>

                </ul>
            </nav>
        </header>
    );
};
export default Header;
