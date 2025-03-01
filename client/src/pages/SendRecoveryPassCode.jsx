import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <main>
            <h2>Página de envío de email de recuperación de contraseña</h2>

            <form onSubmit={handleSendRecoveryPassCode}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </main>
    );
};

export default SendRecoveryPassCode;
