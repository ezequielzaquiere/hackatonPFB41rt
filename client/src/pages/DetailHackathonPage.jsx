import { useState, useContext, useEffect } from 'react';
import useHackathon from '../hooks/useHackathon';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { isAfter } from 'date-fns';

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
                    localStorage.setItem(`hasVoted_${hackathonId}`, 'true');
                }
            };

            checkVote();

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
            toast.success(
                'Para confirmar tu registro, revisa tu correo electrónico',
                { id: '3' }
            );
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
                    method: 'delete',
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
            localStorage.setItem(`hasVoted_${hackathonId}`, 'true');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const goToModifyHackathon = () => {
        navigate(`/details/${hackathonId}/edit`);
    };

    const cloneHackathon = () => {
        navigate('/hackathon/new', { state: { hackathonId } });
    };

    const deleteHackathon = async () => {
        toast((t) => (
            <div className="flex flex-col gap-2 text-black">
                <p>¿Seguro que quieres eliminar el Hackathon?</p>
                <div className="flex gap-4 justify-center">
                    <button
                        className="bg-[#9A4EAE] hover:bg-[#7a3a8a] text-white px-4 py-2 rounded"
                        onClick={async () => {
                            try {
                                const response = await fetch(
                                    `${VITE_API_URL}/api/hackathon/${hackathonId}`,
                                    {
                                        method: 'DELETE',
                                        headers: {
                                            Authorization: authToken,
                                        },
                                    }
                                );
                                const body = await response.json();

                                if (!response.ok)
                                    throw new Error(
                                        body.message || 'Error al eliminar'
                                    );
                                toast.dismiss(t.id);

                                const successToast = toast.success(
                                    'Hackathon eliminado correctamente',
                                    {
                                        duration: 2000,
                                        className:
                                            'bg-gray-800 text-white font-semibold p-4 rounded-lg shadow-lg',
                                    }
                                );
                                setTimeout(() => {
                                    toast.dismiss(successToast);
                                    navigate('/');
                                }, 2000);
                            } catch (error) {
                                toast.error(error.message);
                            }
                        }}
                    >
                        Sí, eliminar
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                            toast.dismiss(t.id);
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        ));
    };

    if (!hackathon) return <p className="text-white">Loading...</p>;

    const id = Number(hackathonId);

    return (
        <div className="bg-[#191919] min-h-screen text-white p-10">
            {/* Botones de navegación y acciones */}
            <div className="flex gap-4 mb-6 justify-center">
                <button
                    onClick={() => navigate(`/details/${id - 1}`)}
                    className="px-4 py-2 bg-[#9A4EAE] text-white font-semibold rounded-lg hover:bg-[#7a3a8a] transition"
                >
                    ⬅ Anterior
                </button>
                {authUser?.role === 'admin' && (
                    <>
                        <button
                            onClick={cloneHackathon}
                            className="px-4 py-2 bg-[#9A4EAE] text-white font-semibold rounded-lg hover:bg-[#7a3a8a] transition"
                        >
                            Copiar
                        </button>
                        <button
                            onClick={deleteHackathon}
                            className="px-4 py-2 bg-[#9A4EAE] text-white font-semibold rounded-lg hover:bg-[#7a3a8a] transition"
                        >
                            Eliminar
                        </button>
                    </>
                )}
                {authUser?.role === 'admin' &&
                    isAfter(hackathon.startingDate, new Date()) && (
                        <button
                            onClick={goToModifyHackathon}
                            className="px-4 py-2 bg-[#9A4EAE] text-white font-semibold rounded-lg hover:bg-[#7a3a8a] transition"
                        >
                            Modificar
                        </button>
                    )}
                <button
                    onClick={() => navigate(`/details/${id + 1}`)}
                    className="px-4 py-2 bg-[#9A4EAE] text-white font-semibold rounded-lg hover:bg-[#7a3a8a] transition"
                >
                    Siguiente ➡
                </button>
            </div>

            {/* Contenedor principal del hackathon */}
            <div className="bg-[#212121] rounded-3xl p-8 max-w-lg mx-auto border border-gray-700 ">
                <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-32 h-32 rounded-full border-4 border-gray-700 mx-auto mb-4"
                />
                <h2 className="text-3xl font-bold text-white text-center">
                    {hackathon.title}
                </h2>

                <div className="flex items-center gap-2 mt-4 text-gray-300 justify-center">
                    <FaUsers className="text-[#9A4EAE]" />
                    <span>{hackathon.participantCount} participantes</span>
                    {hackathon.type === 'presencial' && hackathon.location && (
                        <>
                            <FaMapMarkerAlt className="text-[#9A4EAE] ml-4" />
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hackathon.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9A4EAE] hover:underline"
                            >
                                {hackathon.location}
                            </a>
                        </>
                    )}
                    {hackathon.type === 'online' && (
                        <span className="ml-4 text-gray-300">🌐 Online</span>
                    )}
                </div>

                <p className="text-gray-300 mt-4 text-center">
                    {hackathon.summary}
                </p>
                <p className="text-gray-300 mt-4 text-center">
                    {hackathon.programmingLangs.join(' | ')}
                </p>

                <p className="text-sm text-gray-400 mt-4">
                    <span className="font-semibold">🛫 Fecha de inicio:</span>{' '}
                    {new Date(hackathon.startingDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    <span className="font-semibold">🛬 Fecha límite:</span>{' '}
                    {new Date(hackathon.deadline).toLocaleDateString()}
                </p>

                {new Date(hackathon.deadline) < new Date() ? (
                    <h3 className="mt-4 text-lg font-semibold text-[#9A4EAE] text-center">
                        El evento ha terminado
                    </h3>
                ) : (
                    <>
                        {authToken ? (
                            registeredHackathons[hackathonId] ? (
                                <button
                                    onClick={handleUnregister}
                                    className="bg-[#9A4EAE] text-white py-2 px-4 rounded hover:bg-[#7a3a8a] transition w-full mt-4"
                                >
                                    Desapuntarse
                                </button>
                            ) : (
                                <button
                                    onClick={handleRegister}
                                    className="bg-[#9A4EAE] text-white py-2 px-4 rounded hover:bg-[#7a3a8a] transition w-full mt-4"
                                >
                                    Apuntarse
                                </button>
                            )
                        ) : (
                            <p className="mt-4 text-[#9A4EAE] text-center">
                                Inicia sesión para apuntarte.
                            </p>
                        )}
                    </>
                )}

                {/* Valoración del hackathon */}
                {new Date(hackathon.deadline) < new Date() &&
                    registeredHackathons[hackathonId] &&
                    !hasVoted[hackathonId] && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white text-center">
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
                                            className={`text-2xl ${rating >= star ? 'text-[#9A4EAE]' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-[#9A4EAE] text-white py-2 px-4 rounded hover:bg-[#7a3a8a] transition w-full"
                                >
                                    Enviar valoración
                                </button>
                            </form>
                        </div>
                    )}

                {hasVoted[hackathonId] && (
                    <p className="mt-4 text-[#9A4EAE] text-center">
                        ¡Gracias por tu valoración!
                    </p>
                )}
            </div>
        </div>
    );
};

export default DetailHackathonPage;
