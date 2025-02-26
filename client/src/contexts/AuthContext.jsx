// Importamos las dependencias
import PropTypes from 'prop-types';
import cookies from 'js-cookie';

// Importamos la función que genera un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';

// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';

// Importamos la URL de nuestra API.
const { VITE_API_URL, VITE_AUTH_TOKEN } = import.meta.env;

// Creamos un contexto vacío.
const AuthContext = createContext(null);

// Creamos el compontente provider.
const AuthProvider = ({ children }) => {
    // Declaramos una variable en el State para almacenar el token.
    const [authToken, setAuthToken] = useState(
        cookies.get(VITE_AUTH_TOKEN) || null
    );

    // Declaramos una variable en el State para almacenar los datos del usuario.
    const [authUser, setAuthUser] = useState(null);

    // Cada vez que actualicemos la variable token solicitamos los datos del usuario.
    useEffect(() => {
        // Función que solicita al servidor los datos del usuario.
        const fetchUser = async () => {
            try {
                // Obtenemos una respuesta.
                const res = await fetch(`${VITE_API_URL}/api/users`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                // Obtenemos el body.
                const body = await res.json();

                // Si hubo algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Establecemos los datos del usuario en el State.
                setAuthUser(body.data.user);
            } catch (err) {
                // Eliminamos los datos del token.
                authLogoutState();

                // Eliminamos los datos del usuario.
                setAuthUser(null);

                toast.error(err.message, {
                    id: 'authContext',
                });
            }
        };

        // Si existe un token, buscamos los datos del usuario.
        if (authToken) {
            // Llamamos a la función anterior.
            fetchUser();
        } else {
            // Vaciamos los datos del usuario.
            setAuthUser(null);
        }
    }, [authToken]);

    // Función que almacena el token.
    const authLoginState = (token) => {
        // Guardamos el token en el State.
        setAuthToken(token);

        // Guardamos el token en las cookies.
        cookies.set(VITE_AUTH_TOKEN, token, {
            expires: 7,
        });
    };

    // Función que elimina el token.
    const authLogoutState = () => {
        // Eliminamos el token del State.
        setAuthToken(null);

        // Eliminamos el token de las cookies.
        cookies.remove(VITE_AUTH_TOKEN);
    };

    // Función que actualiza el avatar del usuario en el State.
    const authUpdateAvatarState = (avatar) => {
        setAuthUser({
            ...authUser,
            avatar,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authUser,
                authLoginState,
                authLogoutState,
                authUpdateAvatarState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Validamos las props.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
