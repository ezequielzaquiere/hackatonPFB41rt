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

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatedPass, setShowRepeatedPass] = useState(false);
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
            <h2 className="text-3xl text-center text-[#9A4EAE] mb-10">
                ¡Restablece tu contraseña!
            </h2>
            <form
                onSubmit={handleUseRecoveryPassCode}
                className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <label htmlFor="newPass" className="font-semibold">
                    Nueva Contraseña
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="newPass"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                        placeholder="************"
                        className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md w-full pr-10 focus:outline-none focus:ring-2 focus:bg-[#9A4EAE] focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                    >
                        {showPassword ? (
                            <img
                                src="/ojo-abierto.png"
                                className="max-w-[30px]"
                            />
                        ) : (
                            <img
                                src="/ojo-cerrado.png"
                                className="max-w-[30px]"
                            />
                        )}
                    </button>
                </div>

                <p className="text-xs pb-2">
                    Debe contener mínimo 8 caracteres, una letra, un número y un
                    caracter especial (!@#$%^&*()).
                </p>

                <label htmlFor="repatedPass" className="font-semibold">
                    Repetir Contraseña
                </label>
                <div className="relative">
                    <input
                        type={showRepeatedPass ? 'text' : 'password'}
                        id="repatedPass"
                        value={repeatedNewPass}
                        onChange={(e) => setRepeatedNewPass(e.target.value)}
                        autoComplete="new-password"
                        required
                        placeholder="************"
                        className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md w-full pr-10 focus:outline-none focus:ring-2 focus:bg-[#9A4EAE] focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowRepeatedPass(!showRepeatedPass)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                    >
                        {showPassword ? (
                            <img
                                src="/ojo-abierto.png"
                                className="max-w-[30px]"
                            />
                        ) : (
                            <img
                                src="/ojo-cerrado.png"
                                className="max-w-[30px]"
                            />
                        )}
                    </button>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`max-w-[200px] min-w-[200px]  mt-5 mb-1 px-4 py-2 font-semibold rounded-lg transition duration-300 shadow-[4px_4px_10px_#191919] 
                        ${
                            loading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50'
                        }`}
                    >
                        {loading ? 'Procesando...' : 'Enviar'}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default UseRecoveryPassCode;
