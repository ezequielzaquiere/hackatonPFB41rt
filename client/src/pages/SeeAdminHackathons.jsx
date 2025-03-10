import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AdminHackathons = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { authToken, authUser } = useContext(AuthContext);

    // Si no hay token, redirigir a inicio
    if (!authToken) navigate('/');

    const [pastHackathons, setPastHackathons] = React.useState([]);
    const [futureHackathons, setFutureHackathons] = React.useState([]);

    React.useEffect(() => {
        const fetchHackathonData = async () => {
            try {
                const response1 = await fetch(
                    `${VITE_API_URL}/api/users/profile/${username}/creationHistory`
                );
                const data1 = await response1.json();
                setPastHackathons(data1.data?.user || []);

                const response2 = await fetch(
                    `${VITE_API_URL}/api/users/profile/${username}/futureCreations`
                );
                const data2 = await response2.json();
                setFutureHackathons(data2.data?.user || []);
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchHackathonData();
    }, [username]);

    return (
        <main className="bg-[#191919] min-h-screen flex flex-col items-center px-8 py-12 lg:px-20 lg:py-20">
            {/* Título */}
            <h1 className="text-3xl lg:text-3xl text-[#9A4EAE] font-bold mb-8">
                Mis Hackathones
            </h1>

            {/* Botón para crear nuevo hackathon */}
            <div className="hover:scale-105 transition w-full flex justify-center max-w-md">
                <button
                    onClick={() => navigate(`/hackathon/new`)}
                    className="w-1/2 py-3 bg-[#7A3E8F] text-white font-semibold rounded-lg hover:bg-[#9A4EAE] transition-all shadow-lg"
                >
                    Crear nuevo Hackathon
                </button>
            </div>

            {/* Hackathones activos */}
            <section className="w-full max-w-4xl mt-12">
                <h2 className="text-2xl text-white font-semibold mb-6">
                    Hackathones Activos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {futureHackathons.length > 0 ? (
                        futureHackathons.map((hackathon, index) => (
                            <div
                                key={index}
                                className="hover:scale-105 hover:bg-[#303030] transition bg-[#222] p-4 rounded-lg shadow-lg flex flex-col items-center"
                            >
                                <h2></h2>
                                <img
                                    src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                                    alt={hackathon.name}
                                    className="w-full h-40 object-cover rounded-lg"
                                    onClick={() =>
                                        navigate(`/details/${hackathon.id}`)
                                    }
                                />
                                <p className="text-white mt-3">
                                    Participantes: {hackathon.participantCount}
                                </p>
                                <button
                                    className="hover:scale-105 transition w-[220px] py-2 mt-4 bg-[#7A3E8F] text-white font-semibold rounded-lg hover:bg-[#9A4EAE]"
                                    onClick={() =>
                                        navigate(
                                            `/details/${hackathon.id}/edit`
                                        )
                                    }
                                >
                                    Modificar Detalles
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">
                            No tienes hackathones activos.
                        </p>
                    )}
                </div>
            </section>

            {/* Historial de hackathones */}
            <section className="w-full max-w-4xl mt-16">
                <h2 className="text-2xl text-white font-semibold mb-6">
                    Historial de Hackathones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastHackathons.length > 0 ? (
                        pastHackathons.map((hackathon, index) => (
                            <div
                                key={index}
                                className="hover:scale-105 hover:bg-[#303030] transition bg-[#222] p-4 rounded-lg shadow-lg flex flex-col items-center"
                            >
                                <img
                                    src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                                    alt={hackathon.name}
                                    className="w-full h-40 object-cover rounded-lg"
                                    onClick={() =>
                                        navigate(`/details/${hackathon.id}`)
                                    }
                                />
                                <p className="text-white text-center mt-3">
                                    Participantes: {hackathon.participantCount}
                                </p>
                                <p className="text-white text-center">
                                    Media de valoración: {hackathon.avgRating}
                                </p>
                                <button
                                    className="hover:scale-105 w-full py-2 mt-4 bg-[#1ABC9C] text-black font-semibold rounded-lg hover:bg-[#2ED9B3] transition-all"
                                    onClick={() =>
                                        navigate(`/${hackathon.id}/ranking/set`)
                                    }
                                >
                                    Publicar Podio
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">
                            No tienes hackathones en tu historial.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default AdminHackathons;
