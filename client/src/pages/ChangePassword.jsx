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

// Inicializamos el componente.
const ChangePassword = () => {
    // Obtenemos los elementos necesarios del contexto de autorización.
    const { authUser } = useContext(AuthContext);

    // Obtenemos la función navigate.
    const navigate = useNavigate();

    // Declaramos una variable en el State para cada elemento del formulario.
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    // Declaramos una variable en el State para indicar si estamos haciendo fetch.
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
                        Authorization:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInJvbGUiOiJkZXYiLCJpYXQiOjE3NDA3NjE5NDIsImV4cCI6MTc0MTM2Njc0Mn0.YYE45g-4QAd8u6d_j0aOei-kaGppkx4Jy6JGbhVY6Xk',
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

            // Redirigimos a la página principal.
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
        <main className="w-screen bg-black text-white flex flex-col gap-5 text-xl text-center">
            <h2 className="text-pink-500 py-5 mb-5">CAMBIO DE CONTRASEÑA</h2>

            <form
                onSubmit={handleChangePassword}
                className="flex gap-5 w-screen"
            >
                <label htmlFor="currentPassword">CONTRASEÑA ACTUAL:</label>
                <input
                    type="text"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                <label htmlFor="newPassword">NUEVA CONTRASEÑA:</label>
                <input
                    type="text"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />

                <label htmlFor="repeatNewPassword">REPETIR CONTRASEÑA:</label>
                <input
                    type="text"
                    id="repeatNewPassword"
                    value={repeatNewPassword}
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Cambiando...' : 'Enviar'}
                </button>
            </form>
        </main>
    );
};

export default ChangePassword;
