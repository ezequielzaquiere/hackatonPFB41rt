import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

//URL de la API.
const { VITE_API_URL } = import.meta.env;

//Componente que usa el código de recuperación de contraseña.
const UseRecoveryPassCode = () => {
    const navigate = useNavigate();

    //Obtener código de recuperación de los query params
    const { userId, recoverPassCode } = useParams();

    //Crear estado para cada campo
    const [newPassword, setNewPassword] = useState('');
    const [repeatedNewPass, setRepeatedNewPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatedPass, setShowRepeatedPass] = useState(false);

    //Variable en el state para indicar si se está haciendo fetch
    const [loading, setLoading] = useState(false);

    // Función que maneja el envío del formulario.
    const handleUseRecoveryPassCode = async (e) => {
        try {
            e.preventDefault();

            // Si las contraseñas no coinciden, lanzar error
            if (newPassword !== repeatedNewPass) {
                throw new Error('Las contraseñas no coinciden');
            }

            //Comienza el fetch...
            setLoading(true);

            //Fetch
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

            //Obtener el body
            const body = await res.json();

            //Si hay error, se lanza
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            //Mostrar toast de éxito
            toast.success(body.message, {
                id: 'useRecoveryPass',
            });

            //Redirigir al login
            navigate('/login');
        } catch (err) {
            toast.error(err.message, {
                id: 'useRecoveryPass',
            });
        } finally {
            //Actualizar el estado del fetch
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#191919] min-h-140 flex flex-col justify-start items-center p-6">
            <h2 className="text-3xl text-center text-[#9A4EAE] mt-10 mb-10">
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
                        className="focus:placeholder-transparent bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md w-full pr-10 focus:outline-none focus:ring-2 focus:bg-[#7A3E8F] focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
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
                        className="focus:placeholder-transparent bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md w-full pr-10 focus:outline-none focus:ring-2 focus:bg-[#7A3E8F] focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowRepeatedPass(!showRepeatedPass)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                    >
                        {showRepeatedPass ? (
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
                        className={`hover:scale-105 max-w-[200px] min-w-[200px]  mt-5 mb-1 px-4 py-2 font-semibold rounded-lg transition duration-300 shadow-[4px_4px_10px_#191919] 
                        ${
                            loading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-[#7A3E8F] text-white hover:bg-[#9A4EAE] focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] focus:ring-opacity-50'
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
