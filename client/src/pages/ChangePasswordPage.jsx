//Hooks
import { useContext, useState } from 'react';

//Componentes
import { useNavigate } from 'react-router-dom';

//Autorización
import { AuthContext } from '../contexts/AuthContext';

//Dependencias
import toast from 'react-hot-toast';

// Obtenemos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

//Componente para cambiar contraseña
const ChangePassword = () => {
    const { authToken, authUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    //Variable en el State para indicar si se está haciendo fetch.
    const [loading, setLoading] = useState(false);

    // Función que maneja el envío del formulario.
    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== repeatNewPassword) {
            toast.error('Las contraseñas no coinciden', {
                id: 'passwordMismatch',
            });
            return;
        }
        console.log('Datos enviados:', { currentPassword, newPassword });

        try {
            //Fetch comenzado...
            setLoading(true);

            //Obtener respuesta de la API
            const response = await fetch(
                `${VITE_API_URL}/api/users/password/change`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                    }),
                }
            );

            //Obtener el body de la respuesta
            const body = await response.json();
            console.log('Respuesta de la API:', body);

            if (!response.ok || body.status === 'error') {
                throw new Error(
                    body.message || 'Error al cambiar la contraseña'
                );
            }

            //Mostrar mensaje al usuario
            toast.success('Contraseña cambiada con éxito 🎉', {
                id: 'changePassword',
                duration: 3000,
                icon: '🔑', // Ícono de llave
            });

            // Redirigir la página principal.
            navigate('/');
        } catch (err) {
            toast.error(
                err.message || 'Hubo un problema al cambiar la contraseña',
                {
                    id: 'changePasswordError',
                }
            );
        } finally {
            //Fetch finalizado
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#191919] min-h-140 flex flex-col justify-center items-center p-10">
            <h2 className="text-2xl text-center text-[#9A4EAE] mb-10">
                ¡Cambia tu contraseña!
            </h2>
            <form
                onSubmit={handleChangePassword}
                className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <label htmlFor="currentPassword" className="font-semibold">
                    Contraseña Actual
                </label>
                <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    autoFocus
                    className="bg-[#333] mb-4 border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] hover:ring-2 hover:ring-[#9A4EAE] transition"
                />

                <label htmlFor="newPassword" className="font-semibold">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] hover:ring-2 hover:ring-[#9A4EAE] transition"
                />

                <p className="text-xs pb-2">
                    Debe contener mínimo 8 caracteres, una letra, un número y un
                    caracter especial (!@#$%^&*()).
                </p>

                <label htmlFor="repeatNewPassword" className="font-semibold">
                    Repetir Contraseña
                </label>
                <input
                    type="password"
                    id="repeatNewPassword"
                    value={repeatNewPassword}
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
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
                    {loading ? 'Cambiando...' : 'Enviar'}
                </button>
            </form>
        </main>
    );
};

export default ChangePassword;
