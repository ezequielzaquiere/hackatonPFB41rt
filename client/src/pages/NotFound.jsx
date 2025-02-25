import { Link } from 'react-router-dom';
// Inicializamos el componente.
const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-4">
            <h1 className="text-6xl font-bold animate-bounce">404</h1>
            <p className="text-xl mt-4">
                ¡Oops! Parece que te perdiste en el ciberespacio.
            </p>
            <div className="mt-6">
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                    Volver a casa
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
