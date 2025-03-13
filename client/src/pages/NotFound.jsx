import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-full flex-grow flex flex-col items-center justify-center bg-[#191919] text-white text-center p-4">
            {/* Número 404 con animación */}
            <h1 className="text-8xl font-extrabold text-[#9A4EAE] animate-bounce">
                404
            </h1>

            {/* Mensaje de error */}
            <p className="text-xl mt-4 max-w-lg">
                ¡Oops! Parece que te perdiste en el ciberespacio.
            </p>

            {/* Botón de regreso */}
            <div className="hover:scale-105 transition mt-6">
                <Link
                    to="/"
                    className="px-6 py-3 bg-[#7A3E8F] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition duration-300"
                >
                    Volver a casa
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
