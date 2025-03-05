import { useState, useContext, useEffect } from 'react';
import useHackathon from '../hooks/useHackathon';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const { VITE_API_URL } = import.meta.env;

const DetailHackathonPage = () => {
    const { hackathonId } = useParams();
    const { hackathon } = useHackathon(hackathonId);
    const navigate = useNavigate();
    const { authToken, authUser } = useContext(AuthContext);
    const [registeredHackathons, setRegisteredHackathons] = useState({});
    const [rating, setRating] = useState(0);
    const [hasVoted, setHasVoted] = useState({});

    useEffect(() => {
        if (authUser && hackathon) {
            const checkRegistration = async () => {
                const response = await fetch(
                    `${VITE_API_URL}/api/register/${authUser.id}/${hackathonId}`,
                    {
                        headers: {
                            Authorization: authToken,
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

            // Verificar si el usuario ya ha votado en este hackathon
            const checkVote = async () => {
                const response = await fetch(
                    `${VITE_API_URL}/api/hackathon/${hackathonId}/ratings/${authUser.id}`,
                    {
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );
                if (response.ok) {
                    setHasVoted((prev) => ({
                        ...prev,
                        [hackathonId]: true,
                    }));
                    // Guardar en localStorage que el usuario ya ha votado
                    localStorage.setItem(`hasVoted_${hackathonId}`, 'true');
                }
            };

            checkVote();

            // Cargar el estado de hasVoted desde localStorage
            const hasVotedStored = localStorage.getItem(
                `hasVoted_${hackathonId}`
            );
            if (hasVotedStored === 'true') {
                setHasVoted((prev) => ({
                    ...prev,
                    [hackathonId]: true,
                }));
            }
        }
    }, [authUser, hackathonId, authToken, hackathon]);

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
                        Authorization: authToken,
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

    const handleUnregister = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL}/api/register/${hackathonId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
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
                [hackathonId]: false,
            }));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        if (!authToken) {
            toast.error('Debes iniciar sesión para votar', { id: '4' });
            return;
        }

        if (new Date(hackathon.deadline) > new Date()) {
            toast.error(
                'No puedes votar un hackathon que aún no ha finalizado',
                { id: '5' }
            );
            return;
        }

        if (!registeredHackathons[hackathonId]) {
            toast.error('Solo los participantes pueden votar el hackathon', {
                id: '6',
            });
            return;
        }

        if (hasVoted[hackathonId]) {
            toast.error('Ya has votado este hackathon', { id: '7' });
            return;
        }

        try {
            const response = await fetch(
                `${VITE_API_URL}/api/hackathon/${hackathonId}/ratings`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({ rating }),
                }
            );

            if (!response.ok) {
                throw new Error('Error al enviar la valoración.');
            }

            toast.success('Valoración enviada con éxito', { id: '8' });
            setHasVoted((prev) => ({
                ...prev,
                [hackathonId]: true,
            }));
            // Guardar en localStorage que el usuario ya ha votado
            localStorage.setItem(`hasVoted_${hackathonId}`, 'true');
        } catch (error) {
            toast.error(error.message);
        }
    };

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
                <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4"
                />
                <h2 className="text-3xl font-bold text-gray-900 text-center">
                    {hackathon.title}
                </h2>

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
                        <span className="ml-4 text-gray-700">🌐 Online</span>
                    )}
                </div>

                <p className="text-gray-600 mt-4 text-center">
                    {hackathon.summary}
                </p>
                <p className="text-gray-600 mt-4 text-center">
                    {hackathon.programmingLangs.join(' | ')}
                </p>

                <p className="text-sm text-gray-500 mt-4">
                    <span className="font-semibold">🛫 Fecha de inicio:</span>{' '}
                    {new Date(hackathon.startingDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">🛬 Fecha límite:</span>{' '}
                    {new Date(hackathon.deadline).toLocaleDateString()}
                </p>

                {new Date(hackathon.deadline) < new Date() ? (
                    <h3 className="mt-4 text-lg font-semibold text-red-500">
                        El evento ha terminado
                    </h3>
                ) : (
                    <>
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
                    </>
                )}

                {/* Componente para valorar el hackathon */}
                {new Date(hackathon.deadline) < new Date() &&
                    registeredHackathons[hackathonId] &&
                    !hasVoted[hackathonId] && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Valora este hackathon
                            </h3>
                            <form
                                onSubmit={handleRatingSubmit}
                                className="flex flex-col items-center"
                            >
                                <div className="flex gap-2 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
                                >
                                    Enviar valoración
                                </button>
                            </form>
                        </div>
                    )}

                {hasVoted[hackathonId] && (
                    <p className="mt-4 text-green-500">
                        ¡Gracias por tu valoración!
                    </p>
                )}
            </div>
        </div>
    );
};

export default DetailHackathonPage;
