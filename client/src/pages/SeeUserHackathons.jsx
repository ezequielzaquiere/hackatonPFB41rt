//TODO: Update onClick events to correct routes and API requests (with Toast messages)
//TODO: Hide buttons for users that aren't the logged user in question

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;

const UserHackathons = () => {
    const user = useParams();
    const navigate = useNavigate();

    const [pastRegistrations, setPastRegistrations] = React.useState([]);
    const [futureRegistrations, setFutureRegistrations] = React.useState([]);

    React.useEffect(() => {
        const fetchHackathonData = async (username) => {
            try {
                const response1 = await fetch(
                    `${VITE_API_URL}/api/users/profile/${username}/participationHistory`
                );
                const data1 = await response1.json();
                setPastRegistrations(data1);
                const response2 = await fetch(
                    `${VITE_API_URL}/api/users/profile/${username}/futureParticipations`
                );
                const data2 = await response2.json();
                setFutureRegistrations(data2);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchHackathonData(user.username);
    }, [user.username]);

    return (
        <div className="flex w-screen text-center w-400 h-150 flex-col bg-[#191919] text-white">
            <div className="flex-1 text-[32px] font-bold">
                <h1>Lista de hackathones</h1>
            </div>
            <div className="flex-10 pl-10 mb-10">
                <h2 className=" text-[24px] text-left font-medium mb-5">
                    Mis inscripciones
                </h2>
                <div className="flex gap-20 h-44 w-full flex-row">
                    {futureRegistrations.data?.user?.map((hackathon, index) => (
                        <div
                            key={index}
                            className="flex-1 rounded-md m-auto max-h-fit shadow-[0px_0px_20px_#9A4EAE] max-w-100 items-center"
                        >
                            <img
                                src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                                alt={hackathon.name}
                                className="w-56 h-28 m-auto rounded-lg align-center object-cover"
                                onClick={() =>
                                    navigate(`/details/${hackathon.id}`)
                                }
                            />

                            <p>
                                Número de participantes:{' '}
                                {hackathon.participantCount}
                            </p>
                            <p
                                className="bg-fuchsia-800 align-center m-auto max-w-1/2 shadow-[0px_0px_5px_#191919] rounded-lg"
                                onClick={() =>
                                    navigate(`/details/${hackathon.id}`)
                                }
                            >
                                {' '}
                                Cancelar registro
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-10 pl-10 text-[24px] text-left font-medium">
                <h2>Mi historial</h2>
                <div className="flex gap-20 text-[16px] font-normal text-center justify-center h-44 w-full flex-row">
                    {pastRegistrations.data?.user?.map((hackathon, index) => (
                        <div
                            key={index}
                            className="flex-1 shadow-[0px_0px_20px_#9A4EAE] max-w-100 rounded-md m-auto max-h-fit items-center"
                        >
                            <img
                                src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                                alt={hackathon.name}
                                className="h-25 w-40 rounded-lg m-auto align-center object-cover"
                                onClick={() =>
                                    navigate(`/details/${hackathon.id}`)
                                }
                            />

                            <p>
                                Número de participantes:{' '}
                                {hackathon.participantCount}
                            </p>
                            <p> Media de valoración: {hackathon.avgRating}</p>
                            <p
                                className="bg-blue-700 m-auto max-w-1/2 rounded-lg"
                                onClick={() =>
                                    navigate(`/details/${hackathon.id}`)
                                }
                            >
                                {' '}
                                Valorar hackathon
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserHackathons;
