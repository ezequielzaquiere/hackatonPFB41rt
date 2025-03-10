//Importamos los hooks.
import { useContext, useRef, useState, useEffect } from 'react';

// Importamos componentes y hook.
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos el contexto de autorización.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';

// Importamos la URL de nuestra API y el avatar.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const UpdateProfilePage = () => {
    // Obtenemos los elementos necesarios del contexto de autorización.
    const { authToken, authUser, authUpdateProfileState } =
        useContext(AuthContext);

    const navigate = useNavigate();
    // Creamos una referencia para asignar al input file.
    const inputFileRef = useRef();

    // Declaramos una variable en el State para almacenar el contenido del input.
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    // Declaramos una variable en el State que indicará si estamos haciendo fetch.
    const [loading, setLoading] = useState(false);

    // Si hay algun cambio, actualizamos los datos del usuario.
    useEffect(() => {
        if (authUser) {
            setUserName(authUser.username);
            setFirstName(authUser.firstName);
            setLastName(authUser.lastName);
            setEmail(authUser.email);
            setAvatar(authUser.avatar);
        }
    }, [authUser]);

    // Función que maneja el envío del formulario.
    const handleUpdateProfile = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto.
            e.preventDefault();

            // Indicamos que el fetch va a dar comienzo.
            setLoading(true);

            // Creamos un objeto de tipo FormData.
            const formData = new FormData();

            // Añadimos al objeto anterior las propiedades y valores necesarios.
            if (authUser.username !== username) {
                formData.append('username', username);
            }

            if (authUser.firstName !== firstName) {
                formData.append('firstName', firstName);
            }

            if (authUser.lastName !== lastName) {
                formData.append('lastName', lastName);
            }

            if (authUser.email !== email) {
                formData.append('email', email);
            }

            formData.append('avatar', avatar);

            //Obtenemos una respuesta.
            const res = await fetch(`${VITE_API_URL}/api/users/profile/edit`, {
                method: 'PUT',
                body: formData,
                headers: {
                    Authorization: authToken,
                },
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hay un error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Actualizamos la info del usuario.
            authUpdateProfileState(body.data.user);
            navigate('/users/profile');

            // Indicamos al usuario que todo ha ido bien.
            toast.success(body.message, {
                id: 'userProfile',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'userProfile',
            });
        } finally {
            // Indicamos que el fetch ha finalizado.
            setLoading(false);

            // Vaciamos el valor del input.
            inputFileRef.current.value = '';
        }
    };

    // Si no existe token o el usuario no esta logueado, redirigimos a la página principal.
    if (!authToken || !authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="bg-[#191919] min-h-screen flex flex-col justify-center items-center px-10 py-10 text-s">
            <h2 className="text-3xl text-center text-[#7A3E8F] mb-10">
                Editar perfil
            </h2>
            <>
                <form
                    onSubmit={handleUpdateProfile}
                    className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
                >
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        autoFocus
                        className="focus:bg-[#7A3E8F] bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                    />

                    <label htmlFor="firstName">Nombre:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="focus:bg-[#7A3E8F] bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                    />

                    <label htmlFor="lastName">Apellidos:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="focus:bg-[#7A3E8F] bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="focus:bg-[#7A3E8F] bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                    />

                    <label htmlFor="avatar">Avatar:</label>
                    <input
                        type="file"
                        id="avatar"
                        ref={inputFileRef}
                        onChange={(e) => setAvatar(e.target.files[0])}
                        accept="image/png,image/jpeg"
                        className="focus:bg-[#7A3E8F] bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                    />

                    <button
                        disabled={loading}
                        className={`w-full px-4 py-2 my-3 font-semibold rounded-lg shadow-[6px_6px_5px_#191919] ${
                            loading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-[#7A3E8F] text-white hover:bg-[#9A4EAE] hover:transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] focus:ring-opacity-50'
                        }`}
                    >
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                </form>
            </>
        </main>
    );
};

export default UpdateProfilePage;
