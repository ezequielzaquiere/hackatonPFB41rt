// Importamos useState para manejar estados y useContext para acceder al contexto de autenticación.
import { useState, useContext, useEffect } from 'react';
// Hook personalizado para obtener los datos del hackathon.
import useHackathon from '../hooks/useHackathon';
// useParams para obtener el ID de la URL y useNavigate para movernos entre páginas.
import { useParams, useNavigate } from 'react-router-dom';
// Iconos para mejorar la interfaz.
import { FaUsers, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
// Librería para mostrar mensajes emergentes.
import { toast } from 'react-hot-toast';
// Importamos el contexto donde está la información del usuario autenticado.
import { AuthContext } from '../contexts/AuthContext';
const { VITE_API_URL } = import.meta.env;

const DetailHackathonPage = () => {
    // Sacamos el ID del hackathon de la URL.
    const { hackathonId } = useParams();
    // Obtenemos los datos del hackathon con nuestro hook personalizado.
    const { hackathon } = useHackathon(hackathonId);
    // Hook para navegar entre páginas.
    const navigate = useNavigate();
    // Estado para manejar la estrella sobre la que pasamos el raton.
    const [hoveredRating, setHoveredRating] = useState(null);
    // Estado para la calificación del usuario (mal inicializado, falta el valor actual).
    const [userRating, setUserRating] = useState(hackathon?.avgRating || 0);

    // Extraemos el token de autenticación y la info del usuario desde el contexto.
    const { authToken, authUser } = useContext(AuthContext);
    // Estado para saber si el usuario ya está apuntado.
    const [registeredHackathons, setRegisteredHackathons] = useState({});

    useEffect(() => {
        // Verificar si el usuario ya está registrado en este hackathon
        if (authUser && hackathon) {
            const checkRegistration = async () => {
                const response = await fetch(
                    `${VITE_API_URL}/api/register/${authUser.id}/${hackathonId}`,
                    {
                        headers: {
                            Authorization: `${authToken}`,
                        },
                    }
                );
                const data = await response.json();
                if (data) {
                    setRegisteredHackathons((prev) => ({
                        ...prev,
                        [hackathonId]: true,
                    }));
                }
            };

            checkRegistration();
        }
    }, [authUser, hackathonId, authToken, hackathon]);

    // Función para el registro del usuario en el hackathon
    const handleRegister = async () => {
        if (!authToken) {
            toast.error('Debes iniciar sesión', { id: '1' });
            return;
        }

        if (new Date(hackathon.deadline) < new Date()) {
            toast.error('Evento terminado', { id: '2' });
            return;
        }

        try {
            const response = await fetch(
                `${VITE_API_URL}/api/register/${hackathonId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${authToken}`,
                    },
                    body: JSON.stringify({ userId: authUser.id }),
                }
            );
            if (!response.ok)
                throw new Error('Error al registrarse en el hackathon.');
            toast.success('Te has apuntado al hackathon.', { id: '3' });
            setRegisteredHackathons((prev) => ({
                ...prev,
                [hackathonId]: true,
            }));
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Función para cancelar inscrimpion a hackathon
    const handleUnregister = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL}/api/register/${hackathonId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${authToken}`,
                    },
                    body: JSON.stringify({ userId: authUser.id }),
                }
            );

            if (!response.ok) {
                throw new Error('Error al cancelar la inscripción.');
            }

            toast.success('Te has desinscrito del hackathon');
            setRegisteredHackathons((prev) => ({
                ...prev,
                [hackathonId]: false, // Cambiamos el estado de registro a false
            }));
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Función para mostrar las estrellas de votación
    const printStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={`cursor-pointer transition duration-300 ${
                    i < (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                }`}
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() => handleRating(i + 1)}
            />
        ));
    };

    // Función que maneja la votación del hackathon
    const handleRating = (rating) => {
        if (!hackathon.hasParticipated) {
            toast.error(
                'Para votar, debes haber participado en el hackathon.',
                { id: '4' }
            );
            return;
        }

        if (new Date(hackathon.deadline) > new Date()) {
            toast.error(
                'Solo puedes votar después de que el evento haya terminado.',
                { id: '5' }
            );
            return;
        }

        setUserRating(rating);
        toast.success(`¡Gracias por tu calificación de ${rating} estrellas!`, {
            id: '6',
        });
    };

    // Mientras los datos se están cargando, mostramos un mensaje.
    if (!hackathon) return <p className="text-white">Loading...</p>;

    const id = Number(hackathonId);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white items-center justify-center p-6">
            {/* Botones para ir al hackathon anterior o al siguiente */}
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
                {/* Imagen del hackathon */}
                <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4"
                />
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                    {hackathon.title}
                </h2>

                {/* Datos del hackathon como número de participantes y ubicación */}
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

                {/* Descripción y lenguajes de programación */}
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

                {/* Sección de votación con estrellas */}
                <div className="mt-4 flex gap-1">
                    Votar {printStars(userRating)}
                </div>

                {/* Mensaje si el hackathon ya terminó */}
                {new Date(hackathon.deadline) < new Date() && (
                    <h3 className="mt-4 text-lg font-semibold text-red-500">
                        El evento ha terminado
                    </h3>
                )}

                {/* Botón de apuntarse, solo si el usuario ha iniciado sesión */}
                {authToken ? (
                    registeredHackathons[hackathonId] ? (
                        <button
                            onClick={handleUnregister}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 transition duration-300"
                        >
                            Desapuntarse
                        </button>
                    ) : (
                        <button
                            onClick={handleRegister}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition duration-300"
                        >
                            Apuntarse
                        </button>
                    )
                ) : (
                    <p className="mt-4 text-red-500">
                        Inicia sesión para apuntarte.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DetailHackathonPage;
