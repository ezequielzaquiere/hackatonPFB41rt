// Importamos los hooks.
// import { useContext, useEffect, useRef, useState } from 'react';

// // Importamos los componentes.
// import { Navigate } from 'react-router-dom';

// // Importamos el contexto de autorización.
// import { AuthContext } from '../contexts/AuthContext';

// // Importamos la función que muestra un mensaje al usuario.
// import toast from 'react-hot-toast';

// // Importamos el avatar por defecto.
// import defaultAvatar from '/default-avatar.png';

// // Importamos la URL de nuestra API.
// const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const PrivateUserProfilePage = () => {
    // // Obtenemos los elementos necesarios del contexto de autorización.
    // const { authToken, authUser, authUpdateProfileState } =
    //     useContext(AuthContext);

    // // Creamos una referencia para asignar al input file.
    // const inputFileRef = useRef();

    // // Declaramos una variable en el State para almacenar el contenido del input.
    // const [username, setUserName] = useState('');
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [avatar, setAvatar] = useState('');

    // // Declaramos una variable en el State que indicará si estamos haciendo fetch.
    // const [loading, setLoading] = useState(false);

    // // Si hay algun cambio, actualizamos los datos del usuario.
    // useEffect(() => {
    //     if (authUser) {
    //         setUserName(authUser.username);
    //         setFirstName(authUser.firstName);
    //         setLastName(authUser.lastName);
    //         setEmail(authUser.email);
    //         setAvatar(authUser.avatar);
    //     }
    // }, [authUser]);

    // // Función que maneja el envío del formulario.
    // const handleUpdateProfile = async (e) => {
    //     try {
    //         // Prevenimos el comportamiento por defecto.
    //         e.preventDefault();

    //         // Indicamos que el fetch va a dar comienzo.
    //         setLoading(true);

    //         // Creamos un objeto de tipo FormData.
    //         const formData = new FormData();

    //         // Añadimos al objeto anterior las propiedades y valores necesarios.
    //         if (authUser.username !== username) {
    //             formData.append('username', username);
    //         }

    //         if (authUser.firstName !== firstName) {
    //             formData.append('firstName', firstName);
    //         }

    //         if (authUser.lastName !== lastName) {
    //             formData.append('lastName', lastName);
    //         }

    //         if (authUser.email !== email) {
    //             formData.append('email', email);
    //         }

    //         formData.append('avatar', avatar);

    //         // Obtenemos una respuesta.
    //         const res = await fetch(`${VITE_API_URL}/api/users`, {
    //             method: 'put',
    //             headers: {
    //                 Authorization: authToken,
    //             },
    //             body: formData,
    //         });

    //         // Obtenemos el body.
    //         const body = await res.json();

    //         // Si hay un error lo lanzamos.
    //         if (body.status === 'error') {
    //             throw new Error(body.message);
    //         }

    //         // Actualizamos la info del usuario.
    //         authUpdateProfileState(body.data.user);

    //         // Indicamos al usuario que todo ha ido bien.
    //         toast.success(body.message, {
    //             id: 'userProfile',
    //         });
    //     } catch (err) {
    //         toast.error(err.message, {
    //             id: 'userProfile',
    //         });
    //     } finally {
    //         // Indicamos que el fetch ha finalizado.
    //         setLoading(false);

    //         // Vaciamos el valor del input.
    //         inputFileRef.current.value = '';
    //     }
    // };

    // // Si no existe token o el usuario no esta logueado, redirigimos a la página principal.
    // if (!authToken || !authUser) {
    //     return <Navigate to="/" />;
    // }

    return (
        <main>
            <h2>Página de perfil de usuario</h2>

            {/* <img
                src={
                    authUser.avatar
                        ? `${VITE_API_URL}/${authUser.avatar}`
                        : defaultAvatar
                }
                alt={authUser.username}
            />

            <form onSubmit={handleUpdateProfile}>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                />

                <label htmlFor="firstName">Nombre:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Apellidos:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="avatar">Actualizar avatar:</label>
                <input
                    type="file"
                    id="avatar"
                    ref={inputFileRef}
                    onChange={(e) => setAvatar(e.target.files[0])}
                    accept="image/png,image/jpeg"
                />

                <button disabled={loading}>Actualizar</button>
            </form>

            <ul>
                <li>Usuario: {authUser.username}</li>
                <li>Email: {authUser.email}</li>
            </ul> */}
        </main>
    );
};

export default PrivateUserProfilePage;
