//Importamos los hooks.
import { useContext, useState } from 'react';

//Importamos los componentes.
import { Navigate, Link } from 'react-router-dom';

//Importamos la función toast.
import toast from 'react-hot-toast';

//Importamos el contexto de autorización.
import { AuthContext } from '../contexts/AuthContext';

//Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

//Inicializamos el componente.
const LoginPage = () => {
    //Importamos el contexto de autorización.
    const { authUser, authLoginState } = useContext(AuthContext);

    //Creamos una variable en el State para cada elemento del formulario.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Creamos una variable en el State para indicar si estamos haciendo fetch.
    const [loading, setLoading] = useState(false);

    //Función que maneja el envío del formulario.
    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            //Indicamos que comienza el fetch.
            setLoading(true);

            //Obtenemos respuesta.
            const res = await fetch(`${VITE_API_URL}/api/users/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            //Obtenemos el body.
            const body = await res.json();

            //Si recibimos un error lo mostramos al usuario.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            //Almacenamos el token.
            authLoginState(body.data.token);

            //Si todo va bien mostramos un mensaje de confirmación al usuario.
            toast.success('Usuario logueado', {
                id: 'login',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'login',
            });
        } finally {
            //Indicamos que se finalizó el fetch.
            setLoading(false);
        }
    };

    //Si estamos logueados restringimos el acceso redirigiendo  a la página principal.
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="bg-[#191919] min-h-140 flex flex-col justify-center items-center p-6">
            <form
                onSubmit={handleLogin}
                className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <label htmlFor="email" className="font-semibold">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="bg-[#333] mb-4 border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition  hover:ring-2 hover:ring-[#9A4EAE]"
                />

                <label htmlFor="password" className="font-semibold">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] hover:ring-2 hover:ring-[#9A4EAE] transition"
                />

                <button
                    disabled={loading}
                    className={`w-full mt-5 mb-1 px-4 py-2 font-semibold rounded-lg transition duration-300 shadow-[4px_4px_10px_#191919] 
                ${
                    loading
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50'
                }`}
                >
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                </button>

                <Link
                    to="/users/password/reset"
                    className="text-[#9A4EAE] hover:underline text-center text-sm"
                >
                    ¿Has olvidado tu contraseña?
                </Link>
            </form>
        </main>
    );
};

export default LoginPage;
