import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// URL de la API
const { VITE_API_URL } = import.meta.env;

// Componente SendRecoveryPassCode
const SendRecoveryPassCode = () => {
    const navigate = useNavigate();

    // Estado para el email
    const [email, setEmail] = useState('');
    // Estado para la carga
    const [loading, setLoading] = useState(false);

    // Función para enviar el email de recuperación
    const handleSendRecoveryPassCode = async (e) => {
        e.preventDefault(); // Previene la recarga del formulario

        if (!email.trim()) {
            toast.error('El email no puede estar vacío', {
                id: 'sendRecoveryPassCode',
            });
            return;
        }

        try {
            setLoading(true);
            console.log(`Enviando a: ${VITE_API_URL}/api/users/password/reset`);

            const res = await fetch(
                `${VITE_API_URL}/api/users/password/reset`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            toast.success(body.message, {
                id: 'sendRecoveryPassCode',
            });

            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'sendRecoveryPassCode',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#191919] min-h-140 flex flex-col justify-center items-center p-6">
            <form
                onSubmit={handleSendRecoveryPassCode}
                className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#9A4EAE] mb-4">
                    ¡Recupera tu contraseña!
                </h2>

                <label htmlFor="email" className="font-semibold">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                    required
                    className="bg-[#333] mb-4 border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] hover:ring-2 hover:ring-[#9A4EAE] transition"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-5 mb-1 px-4 py-2 font-semibold rounded-lg transition duration-300 shadow-[4px_4px_10px_#191919] 
                ${
                    loading
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50'
                }`}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>

                <Link
                    to="/users/password/reset"
                    className="text-[#9A4EAE] hover:underline text-center text-sm"
                >
                    ¿No recibiste el email? Reintentar
                </Link>
            </form>
        </main>
    );
};

export default SendRecoveryPassCode;
