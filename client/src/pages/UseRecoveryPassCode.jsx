import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

//URL de la API.
const { VITE_API_URL } = import.meta.env;

//Componente que usa el código de recuperación de contraseña.
const UseRecoveryPassCode = () => {
    const navigate = useNavigate();

    // Obtenemos el código de recuperación de los path params.
    const { recoverPassCode } = useParams();
    console.log('Código de recuperación recibido:', recoverPassCode);
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
                `${VITE_API_URL}/api/users/password/reset/${recoverPassCode}`,
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
        <main>
            <h2>Página para usar el código recuperación de contraseña</h2>

            <form onSubmit={handleUseRecoveryPassCode}>
                <label htmlFor="newPass">Nueva contraseña:</label>
                <input
                    type="password"
                    id="newPass"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    autoFocus
                    required
                />

                <label htmlFor="repatedPass">Nueva contraseña:</label>
                <input
                    type="password"
                    id="repatedPass"
                    value={repeatedNewPass}
                    onChange={(e) => setRepeatedNewPass(e.target.value)}
                    autoComplete="new-password"
                    required
                />

                <button disabled={loading}>Enviar</button>
            </form>
        </main>
    );
};

export default UseRecoveryPassCode;
