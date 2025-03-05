import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
const VerificationRegisterHackathon = () => {
    const navigate = useNavigate();
    const { confirmationCode, hackathonId } = useParams(); // Obtener el código de la URL
    const [countdown, setCountdown] = useState(2);
    const [message, setMessage] = useState('Verificando tu asistencia...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const confirmParticipation = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/register/${hackathonId}/${confirmationCode}`,
                    { method: 'PATCH' }
                );

                if (!response.ok) {
                    throw new Error(
                        'Código de confirmación inválido o ya usado'
                    );
                }

                setMessage('🚀 Enhorabuena, te has inscrito al Hackathon!! 🛰️');
            } catch (err) {
                setError(err.message);
            }
        };

        if (confirmationCode) {
            confirmParticipation();
        } else {
            setError('Falta el código de confirmación');
        }

        const interval = setInterval(
            () => setCountdown((prev) => prev - 1),
            1000
        );
        const timeout = setTimeout(() => navigate('/'), 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [confirmationCode, hackathonId, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <p className="text-2xl font-bold mb-5">
                {error ? '❌ Error' : message}
            </p>
            {error ? (
                <p className="text-lg font-semibold text-red-600">{error}</p>
            ) : (
                <p className="text-lg font-semibold text-gray-600">
                    Serás redirigido en{' '}
                    <span className="font-bold">{countdown}</span> segundos...
                </p>
            )}
        </div>
    );
};

export default VerificationRegisterHackathon;
