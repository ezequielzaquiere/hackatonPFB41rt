import { Link } from 'react-router-dom';

//Inicializamos el componente
const Header = () => {
    return (
        <header>
            <h1 className="text-red-500">
                {' '}
                <Link to="/">HACKAVERSE</Link>
            </h1>

            <nav>
                <ul>
                    <li>
                        <Link to="/hackathon/new">Nuevo Hackathon</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default Header;
