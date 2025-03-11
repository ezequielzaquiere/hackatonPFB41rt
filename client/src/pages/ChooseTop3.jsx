import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const ChooseTop3 = () => {
    const navigate = useNavigate();
    const { authToken, authUser } = useContext(AuthContext);
            
    // Redirigir si no hay token de autenticación
    if (!authToken || !authUser.role === "admin")  {
        navigate('/');
    }

    const [participants, setParticipants] = React.useState([]);
    const [thisHackathon, setThisHackathon] = React.useState([]);

    const hackathon = useParams();
    

    React.useEffect(() => {
        window.scrollTo(0, 0);
        const fetchParticipants = async () => {
            try {
                const response1 = await fetch(`${VITE_API_URL}/api/hackathon/${hackathon.hackathonId}/participants/private`);
                const data1 = await response1.json();
                setParticipants(data1.data.hackathonUsers);
                const response2 = await fetch(`${VITE_API_URL}/api/hackathon/hackathones/details/${hackathon.hackathonId}`);
                const data2 = await response2.json();
                setThisHackathon(data2.data.hackathon)
            } catch (err) {
                toast.error("Ha habido un fallo al obtener los usuarios registrados.");
            };
        };

        fetchParticipants();
    }, [hackathon.hackathonId]);

    const [firstPlace, setFirstPlace] = React.useState('');
    const [secondPlace, setSecondPlace] = React.useState('');
    const [thirdPlace, setThirdPlace] = React.useState('');

    const handleSelection = (place, value) => {
        if (place === 'first') setFirstPlace(value);
        if (place === 'second') setSecondPlace(value);
        if (place === 'third') setThirdPlace(value);
    };

    const handleSubmit = async (firstPlace, secondPlace, thirdPlace) => {
        const podiumData = {
            first: Number(firstPlace),
            second: Number(secondPlace),
            third: Number(thirdPlace),
        };

        try {
            const response = await fetch(
                `${VITE_API_URL}/api/hackathon/${hackathon.hackathonId}/publish`,
                {
                    method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                },
                    body: JSON.stringify(podiumData),
                }
            );

            const result = await response.json();

            if (result.status === 'ok') {
                toast.success(result.message);
                navigate('/');
            } else {
                toast.error('Error al enviar datos: ' + result.message);
            }
        } catch (error) {
            toast.error('Error al enviar datos:', error);
        }
    };

    return (
        <div className="bg-[#191919] text-white min-h-screen p-10">
            {/* Título */}
            <h1 className="text-3xl font-bold text-center mb-10">
                Selecciona el Top 3 del hackathon: {thisHackathon.title}
            </h1>

            {/* Contenedor de selección */}
            <div className="bg-[#212121] p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                {/* Primer puesto */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        <span>Primer puesto:</span>
                    </label>
                    <select
                        value={firstPlace}
                        onChange={(e) =>
                            handleSelection('first', e.target.value)
                        }
                        className="w-full focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition  hover:ring-2 hover:ring-[#7A3E8F]"
                    >
                        <option value="">Selecciona un participante</option>
                        {participants.map((participant) => (
                            <option
                                key={participant.id}
                                value={participant.id}
                                className="text-white"
                            >
                                {participant.username}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Segundo puesto */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        <span>Segundo puesto:</span>
                    </label>
                    <select
                        value={secondPlace}
                        onChange={(e) =>
                            handleSelection('second', e.target.value)
                        }
                        className="w-full focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition  hover:ring-2 hover:ring-[#7A3E8F]"
                    >
                        <option value="">Selecciona un participante</option>
                        {participants.map((participant) => (
                            <option
                                key={participant.id}
                                value={participant.id}
                                className="text-white"
                            >
                                {participant.username}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tercer puesto */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        <span>Tercer puesto:</span>
                    </label>
                    <select
                        value={thirdPlace}
                        onChange={(e) =>
                            handleSelection('third', e.target.value)
                        }
                        className="w-full focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition  hover:ring-2 hover:ring-[#7A3E8F]"
                    >
                        <option value="">Selecciona un participante</option>
                        {participants.map((participant) => (
                            <option
                                key={participant.id}
                                value={participant.id}
                                className="text-white"
                            >
                                {participant.username}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botón de enviar */}
                <div className="flex justify-end">
                    <button
                        onClick={() =>
                                handleSubmit(firstPlace, secondPlace, thirdPlace)
                        }
                        className="bg-[#9A4EAE] text-white px-4 py-2 rounded-md hover:bg-[#7B3A8E] transition"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseTop3;
