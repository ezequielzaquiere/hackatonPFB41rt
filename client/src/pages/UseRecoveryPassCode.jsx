import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

//URL de la API.
const { VITE_API_URL } = import.meta.env;

//Componente que usa el código de recuperación de contraseña.
const UseRecoveryPassCode = () => {
    const navigate = useNavigate();

    // Obtenemos el código de recuperación de los path params.
    const { userId, recoverPassCode } = useParams();

    const [newPassword, setNewPassword] = useState('');
    const [repeatedNewPass, setRepeatedNewPass] = useState('');

    // Declaramos una variable en el State para indicar si estamos haciendo fetch.
    const [loading, setLoading] = useState(false);

    // Función que maneja el envío del formulario.
    const handleUseRecoveryPassCode = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Si las contraseñas no coinciden lanzamos un error.
            if (newPassword !== repeatedNewPass) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Indicamos que va a dar comienzo el fetch.
            setLoading(true);

            // Obtenemos el response.
            const res = await fetch(
                `${VITE_API_URL}/api/users/${userId}/password/recover/${recoverPassCode}`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newPassword,
                        repeatedNewPass,
                    }),
                }
            );

            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Mostramos un mesaje al usuario indicando que todo ha ido bien.
            toast.success(body.message, {
                id: 'useRecoveryPass',
            });

            // Regirigimos a login.
            navigate('/login');
        } catch (err) {
            toast.error(err.message, {
                id: 'useRecoveryPass',
            });
        } finally {
            // Indicamos que el fetch ha finalizado.
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#191919] min-h-140 flex flex-col justify-center items-center p-6">
            <form
                onSubmit={handleUseRecoveryPassCode}
                className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#9A4EAE] mb-4">
                    Restablecer Contraseña
                </h2>

                <label htmlFor="newPass" className="font-semibold">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    id="newPass"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    autoFocus
                    required
                    className="bg-[#333] mb-4 border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] hover:ring-2 hover:ring-[#9A4EAE] transition"
                />

                <label htmlFor="repatedPass" className="font-semibold">
                    Repetir Contraseña
                </label>
                <input
                    type="password"
                    id="repatedPass"
                    value={repeatedNewPass}
                    onChange={(e) => setRepeatedNewPass(e.target.value)}
                    autoComplete="new-password"
                    required
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] hover:ring-2 hover:ring-[#9A4EAE] transition"
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
                    {loading ? 'Procesando...' : 'Enviar'}
                </button>
            </form>
        </main>
    );
};

export default UseRecoveryPassCode;
