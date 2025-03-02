import { useState } from 'react'; // Importo useState para manejar estados locales.
import useHackathon from '../hooks/useHackathon'; // Importo el hook que obtiene los datos del hackathon.
import { useParams, useNavigate } from 'react-router-dom'; // Importo hooks para obtener parámetros de la URL y navegar entre páginas.
import { FaUsers, FaMapMarkerAlt, FaStar } from 'react-icons/fa'; // Importo iconos de FontAwesome.
import { toast } from 'react-hot-toast'; // Importo toast para mostrar notificaciones al usuario.

const DetailHackathonPage = () => {
    const { hackathonId } = useParams(); // Obtengo el id del hackathon desde la URL.
    const { hackathon } = useHackathon(hackathonId); // Uso mi hook para obtener los detalles del hackathon.

    const navigate = useNavigate(); // Hook para navegar entre páginas.

    const [hoveredRating, setHoveredRating] = useState(null); // Estado para manejar la calificación cuando el usuario pasa el cursor.
    const [setUserRating] = useState(hackathon.avgRating); // Estado para manejar la calificación dada por el usuario (error: falta userRating).

    // Función para mostrar las estrellas, resaltando las que el usuario pase el cursor o el rating actual.
    const printStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={`cursor-pointer transition duration-300 ${
                    i < (hoveredRating || rating)
                        ? 'text-yellow-400' // Si la estrella está dentro del rating, se pinta amarilla.
                        : 'text-gray-300' // Si no, se pinta gris.
                }`}
                onMouseEnter={() => setHoveredRating(i + 1)} // Al pasar el cursor, cambio el estado de hoveredRating.
                onMouseLeave={() => setHoveredRating(null)} // Al salir el cursor, lo restablezco a null.
                onClick={() => handleRating(i + 1)} // Al hacer clic, guardo la calificación.
            />
        ));
    };

    // Función para manejar la calificación del usuario.
    const handleRating = (rating) => {
        if (!hackathon.hasParticipated) {
            toast.error('Para votar, debes haber participado en el hackathon.'); // Si no participó, muestro un error.
            return;
        }

        if (new Date(hackathon.deadline) > new Date()) {
            toast.error(
                'Solo puedes votar después de que el evento haya terminado.'
            ); // Si aún no terminó, muestro un error.
            return;
        }

        setUserRating(rating); // Guardo la calificación (error: setUserRating está mal declarado y no funciona).
        // Aquí iría el código para enviar la calificación al backend.
        toast.success(`¡Gracias por tu calificación de ${rating} estrellas!`); // Muestro mensaje de éxito.
    };

    if (!hackathon) return <p className="text-white">Loading...</p>; // Si los datos aún no cargan, muestro un mensaje.

    const id = Number(hackathonId); // Convierto el id a número para manejarlo más fácilmente.

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white items-center justify-center p-6">
            {/* Botones para navegar entre hackathones anteriores y siguientes */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => navigate(`/details/${id - 1}`)}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    ⬅ Anterior
                </button>
                <button
                    onClick={() => navigate(`/details/${id + 1}`)}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Siguiente ➡
                </button>
            </div>

            {/* Contenedor principal con la información del hackathon */}
            <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full border border-gray-300 text-gray-800 flex flex-col items-center">
                <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4"
                />
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                    {hackathon.title}
                </h2>

                {/* Información del hackathon */}
                <div className="flex items-center gap-2 mt-4 text-gray-700">
                    <FaUsers className="text-blue-500" />
                    <span>{hackathon.participantCount} participantes</span>
                    {hackathon.type === 'presencial' && hackathon.location && (
                        <>
                            <FaMapMarkerAlt className="text-red-500 ml-4" />
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hackathon.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {hackathon.location}
                            </a>
                        </>
                    )}
                    {hackathon.type === 'online' && (
                        <span className="ml-4 text-gray-700">Online</span>
                    )}
                </div>

                {/* Descripción y tecnologías del hackathon */}
                <p className="text-gray-600 mt-4 text-center">
                    {hackathon.summary}
                </p>
                <p className="text-gray-600 mt-4 text-center">
                    {hackathon.programmingLangs.join(' | ')}
                </p>

                {/* Fechas del hackathon */}
                <p className="text-sm text-gray-500 mt-4">
                    <span className="font-semibold">Fecha de inicio:</span>{' '}
                    {new Date(hackathon.startingDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Fecha límite:</span>{' '}
                    {new Date(hackathon.deadline).toLocaleDateString()}
                </p>

                {/* Sección para votar */}
                <div className="mt-4 flex gap-1">
                    Votar {printStars(hackathon.avgRating)}
                </div>

                {/* Mensaje si el evento ya terminó */}
                {new Date(hackathon.deadline) < new Date() && (
                    <h3 className="mt-4 text-lg font-semibold text-red-500">
                        El evento ha terminado
                    </h3>
                )}
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition duration-300">
                    Apuntarse
                </button>
            </div>
        </div>
    );
};

export default DetailHackathonPage;
