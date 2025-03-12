import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import formatDate from '../utils/formatedDate.js';

const UserHackathons = () => {
    const user = useParams();
    const navigate = useNavigate();
    const { authToken, authUser } = useContext(AuthContext);
    const backgroundImageUrl = `${VITE_API_URL}/imgHack/backg2.jpg`;

    const [pastRegistrations, setPastRegistrations] = React.useState([]);
    const [futureRegistrations, setFutureRegistrations] = React.useState([]);
    const [ratedHackathons, setRatedHackathons] = React.useState([]);

    React.useEffect(() => {
        const fetchHackathonData = async (user) => {
            try {
                const response1 = await fetch(
                    `${VITE_API_URL}/api/users/profile/${user.username}/participationHistory`
                );
                const data1 = await response1.json();
                setPastRegistrations(data1);
                const response2 = await fetch(
                    `${VITE_API_URL}/api/users/profile/${user.username}/futureParticipations`
                );
                const data2 = await response2.json();
                setFutureRegistrations(data2);
                if (authUser) {
                    const ratings = [];
                    await Promise.all(
                        data1.data?.user?.map(async (hackathon) => {
                            try {
                                const response = await fetch(
                                    `${VITE_API_URL}/api/hackathon/${hackathon.id}/ratings/${authUser.id}`
                                );
                                const result = await response.json();
                                ratings.push(result.data.rating.length);
                            } catch (err) {
                                console.error(
                                    `Error encontrando rating para el hackathon con id ${hackathon.id}`,
                                    err
                                );
                            }
                        })
                    );
                    setRatedHackathons(ratings);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchHackathonData(authUser);
    }, [authUser.username]);

    return (
        <main
            className="flex min-h-screen items-center text-center px-8 py-12 lg:px-20 lg:py-20 flex-col bg-[#191919]"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <div className="flex-1 text-[32px] lg:text-[32px] text-[#9A4EAE] font-bold mb-8">
                <h1>Lista de hackathones</h1>
            </div>
            <section className="w-full max-w-4xl mt-12">
                <h2 className="text-2xl text-white font-semibold mb-6">
                    Mis inscripciones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {futureRegistrations.data?.user?.map((hackathon, index) => (
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
                                {hackathon.title}
                            </p>

                            <p className="text-white mt-3">
                                Participantes: {hackathon.participantCount}
                            </p>
                            <p className="text-white text-center mt-3">
                                Inicio: {formatDate(hackathon.startingDate)}
                            </p>
                            <button
                                className="hover:scale-105 transition w-[220px] py-2 mt-4 bg-[#7A3E8F] text-white font-semibold rounded-lg hover:bg-[#9A4EAE]"
                                onClick={() =>
                                    navigate(`/details/${hackathon.id}`)
                                }
                            >
                                {' '}
                                Cancelar registro
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <div className="w-full max-w-4xl mt-16">
                <h2 className="text-2xl text-white font-semibold mb-6">
                    Mi historial
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastRegistrations.data?.user?.map((hackathon, index) => (
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
                                {hackathon.title}
                            </p>

                            <p className="text-white text-center mt-3">
                                Participantes: {hackathon.participantCount}
                            </p>
                            <p className="text-white text-center">
                                {' '}
                                Media de valoración: {hackathon.avgRating}
                            </p>
                            {ratedHackathons[index] === 0 && (
                                <button
                                    className="hover:scale-105 w-full py-2 mt-4 bg-[#1ABC9C] text-black font-semibold rounded-lg hover:bg-[#2ED9B3] transition-all"
                                    onClick={() =>
                                        navigate(`/details/${hackathon.id}`)
                                    }
                                >
                                    {' '}
                                    Valorar hackathon
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default UserHackathons;
