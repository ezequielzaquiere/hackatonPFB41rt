//Importamos los hooks.
import { useEffect, useState } from 'react';

// Importamos los componentes.
//import { Navigate } from 'react-router-dom';

// Importamos el contexto de autorización.
//import { AuthContext } from '../contexts/AuthContext';

// Importamos la función que muestra un mensaje al usuario.
//import toast from 'react-hot-toast';

// Importamos el avatar por defecto.
import defaultAvatar from '/default-avatar.png';

// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const UserProfilePage = () => {
    // Obtenemos los elementos necesarios del contexto de autorización.
    //const { authToken, authUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Solicitamos datos del usuario
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Obtenemos una respuesta.
                const res = await fetch(`${VITE_API_URL}/api/users`, {
                    headers: {
                        Authorization:
                            //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6ImRldiIsImlhdCI6MTc0MDg0NDQyMiwiZXhwIjoxNzQxNDQ5MjIyfQ.4X5XLSAW5_cwtNZljhXTnTMWYC21Eftn9eiKcfjGIwk',
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNzczNjIyLCJleHAiOjE3NDEzNzg0MjJ9.GmjbDlCvTeNMj2h3Hm3Kx9HqkX47WPHPGOAMtihFtME',
                    },
                });

                // Obtenemos el body.
                const body = await res.json();

                // Si hubo algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }
                setUser(body.data.user);
                // Establecemos los datos del usuario en el State.
                //setAuthUser(body.data.user);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No se encontraron datos de usuario</p>;

    // Si no existe token o el usuario no esta logueado, redirigimos a la página principal.
    // if (!authToken || !authUser) {
    //     return <Navigate to="/" />;
    // }

    return (
        <main>
            <h2>Página de perfil de usuario</h2>

            <img
                src={
                    user.avatar
                        ? `${VITE_API_URL}/${user.avatar}`
                        : defaultAvatar
                }
                alt={user.username}
            />

            <ul>
                <li>Usuario: {user.username}</li>
            </ul>
        </main>
    );
};

export default UserProfilePage;
