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
                try {
                    const response = await fetch(
                        `${VITE_API_URL}/api/hackathon/${hackathonId}/ratings/${authUser.id}`
                    );
                    if (!response.ok) {
                        throw new Error('Error al verificar el voto');
                    }
                    const result = await response.json();

                    if (result.data && result.data.rating.length > 0) {
                        setHasVoted((prev) => ({
                            ...prev,
                            [hackathonId]: true,
                        }));
                        localStorage.setItem(`hasVoted_${hackathonId}`, 'true');
                    } else {
                        setHasVoted((prev) => ({
                            ...prev,
                            [hackathonId]: false,
                        }));
                        localStorage.removeItem(`hasVoted_${hackathonId}`);
                    }
                } catch (error) {
                    console.error('Error en checkVote:', error);
                }
            };

            checkVote();

            // Verifica si hay un voto almacenado en localStorage
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
        toast(
            (t) => (
                <div className="flex flex-col gap-2 text-white">
                    <p>¿Seguro que quieres eliminar el Hackathon?</p>
                    <div className="flex gap-4 justify-center">
                        <button
                            className="bg-[#7a3a8a] hover:bg-[#9A4EAE] text-white px-4 py-2 rounded"
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
            ),
            { duration: 20000, position: 'top-center' }
        );
    };

    if (!hackathon) return <p className="text-white">Loading...</p>;

    const id = Number(hackathonId);

    return (
        <div className="bg-[#191919] flex-grow text-white p-10">
            {/* Botones de navegación y acciones */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
                {/* Botones del admin (arriba en móviles) */}
                <div className="flex flex-wrap gap-4 justify-center order-1 md:order-none">
                    {authUser?.role === 'admin' && (
                        <>
                            <button
                                onClick={cloneHackathon}
                                className="hover:scale-110  px-4 py-2 bg-[#7a3a8a] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition w-fit"
                            >
                                Copiar
                            </button>
                            <button
                                onClick={deleteHackathon}
                                className="hover:scale-110 px-4 py-2 bg-[#7a3a8a] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition w-fit"
                            >
                                Eliminar
                            </button>
                        </>
                    )}
                    {authUser?.role === 'admin' &&
                        isAfter(hackathon.startingDate, new Date()) && (
                            <button
                                onClick={goToModifyHackathon}
                                className="hover:scale-110 px-4 py-2 bg-[#7a3a8a] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition w-fit"
                            >
                                Modificar
                            </button>
                        )}
                </div>
            </div>

            {/* Contenedor principal del hackathon */}
            <div className="bg-[#212121] rounded-3xl p-8 border border-gray-700 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Imagen */}
                    <div className="flex flex-col items-center gap-6 order-1 md:order-none">
                        <img
                            src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                            alt={hackathon.title}
                            className="w-42 h-32 rounded-2xl mt-2 md:mb-0 md:ml-4 py-1"
                        />
                    </div>

                    {/* Contenido del hackathon */}
                    <div className="flex flex-col gap-4 flex-1 order-2 md:order-none">
                        <h2 className="text-3xl font-bold text-white text-center md:text-left">
                            {hackathon.title}
                        </h2>

                        <div className="flex items-center gap-2 text-gray-300 justify-center md:justify-start">
                            <FaUsers className="text-[#9A4EAE]" />
                            <span>
                                {hackathon.participantCount} participantes
                            </span>
                            {hackathon.type === 'presencial' &&
                                hackathon.location && (
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
                                <span className="ml-4 text-gray-300">
                                    🌐 Online
                                </span>
                            )}
                        </div>

                        <p className="text-gray-300 text-center md:text-left">
                            {hackathon.summary}
                        </p>
                        <p className="text-gray-300 text-center md:text-left">
                            {hackathon.programmingLangs.join(' | ')}
                        </p>

                        <p className="text-sm text-gray-400">
                            <span className="font-semibold">
                                🛫 Fecha de inicio:
                            </span>{' '}
                            {new Date(
                                hackathon.startingDate
                            ).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-400">
                            <span className="font-semibold">
                                🛬 Fecha límite:
                            </span>{' '}
                            {new Date(hackathon.deadline).toLocaleDateString()}
                        </p>

                        {new Date(hackathon.deadline) < new Date() ? (
                            <h3 className="mt-4 text-lg font-semibold text-[#9A4EAE] text-center md:text-left">
                                El evento ha terminado
                            </h3>
                        ) : (
                            <>
                                {authToken ? (
                                    registeredHackathons[hackathonId] ? (
                                        <button
                                            onClick={handleUnregister}
                                            className="hover:scale-110 bg-[#7a3a8a] text-white py-2 px-4 rounded-lg hover:bg-[#9A4EAE] transition w-fit mt-4"
                                        >
                                            Desapuntarse
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleRegister}
                                            className="hover:scale-110 bg-[#7a3a8a] text-white py-2 px-4 rounded-lg hover:bg-[#9A4EAE] transition w-fit mt-4"
                                        >
                                            Apuntarse
                                        </button>
                                    )
                                ) : (
                                    <p className="mt-4 text-[#9A4EAE] text-center md:text-left">
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
                                    <h3 className="text-lg font-semibold text-white text-center md:text-left">
                                        Valora este hackathon
                                    </h3>
                                    <form
                                        onSubmit={handleRatingSubmit}
                                        className="flex flex-col items-center md:items-start"
                                    >
                                        <div className="flex gap-2 mt-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    type="button"
                                                    key={star}
                                                    onClick={() =>
                                                        setRating(star)
                                                    }
                                                    className={`text-2xl ${rating >= star ? 'text-[#fcd53f]' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            type="submit"
                                            className="hover:scale-110 mt-4 bg-[#7a3a8a] text-white py-2 px-4 rounded-lg hover:bg-[#9A4EAE] transition w-fit"
                                        >
                                            Enviar valoración
                                        </button>
                                    </form>
                                </div>
                            )}

                        {hasVoted[hackathonId] && (
                            <p className="mt-4 text-[#9A4EAE] text-center md:text-left">
                                ¡Gracias por tu valoración!
                            </p>
                        )}
                    </div>

                    {/* Ranking */}
                    {hackathon.resultsPublished === 1 && (
                        <div className="bg-[#2a2a2a] rounded-3xl p-6 w-fit h-fit order-3 md:order-none">
                            <h3 className="text-xl font-bold text-[#9A4EAE] mb-4">
                                Ranking
                            </h3>
                            {hackathon.topThree
                                .sort((a, b) => a.position - b.position)
                                .map((user) => (
                                    <p
                                        key={user.position}
                                        className="text-sm text-gray-300 mt-2 font-semibold"
                                    >
                                        {user.position}. {user.username}
                                    </p>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Botones de navegación (abajo en móviles) */}
            <div className="flex gap-4 justify-center order-2 md:order-none mt-7">
                <button
                    onClick={() => navigate(`/details/${id - 1}`)}
                    className="hover:scale-110 px-4 py-2 bg-[#7a3a8a] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition w-fit"
                >
                    ⬅ Anterior
                </button>
                <button
                    onClick={() => navigate(`/details/${id + 1}`)}
                    className="hover:scale-110 px-4 py-2 bg-[#7a3a8a] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition w-fit"
                >
                    Siguiente ➡
                </button>
            </div>
        </div>
    );
};

export default DetailHackathonPage;
