import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
// Importamos el contexto de autorización.
import { AuthContext } from '../contexts/AuthContext';

const VerificationRegisterHackathon = () => {
    const navigate = useNavigate();
    const { confirmationCode, hackathonId } = useParams(); // Obtener el código de la URL
    const [countdown, setCountdown] = useState(2);
    const [message, setMessage] = useState('Verificando tu asistencia...');
    const [error, setError] = useState(null);
    const { authToken } = useContext(AuthContext); // Obtenemos el token de autenticación

    useEffect(() => {
        const confirmParticipation = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/register/${hackathonId}/${confirmationCode}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authToken, // Agregamos el token en los headers
                        },
                    }
                );

                if (!response.ok) {
                    console.log(hackathonId);
                    console.log(confirmationCode);
                    throw new Error(
                        'Código de confirmación inválido o ya usado'
                    );
                }

                setMessage('🚀 Enhorabuena, te has inscrito al Hackathon!! 🛰️');
            } catch (err) {
                setError(err.message);
            }
        };

        if (confirmationCode && authToken) {
            // Verificamos que el token esté disponible
            confirmParticipation();
        } else {
            setError('Falta el código de confirmación o no estás autenticado');
        }

        const interval = setInterval(
            () => setCountdown((prev) => prev - 1),
            1000
        );
        const timeout = setTimeout(() => navigate('/'), 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [confirmationCode, hackathonId, navigate, authToken]); // Añadimos authToken a las dependencias

    return (
        <div className="bg-[#191919] text-[#9A4EAE]">
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-2xl font-bold mb-5">
                    {error ? '❌ Error' : message}
                </p>
                {error ? (
                    <p className="text-lg font-semibold text-[#9A4EAE]">
                        {error}
                    </p>
                ) : (
                    <p className="text-lg font-semibold text-gray-600">
                        Serás redirigido en{' '}
                        <span className="font-bold">{countdown}</span>{' '}
                        segundos...
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerificationRegisterHackathon;
