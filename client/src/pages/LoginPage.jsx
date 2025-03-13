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

    const [showPassword, setShowPassword] = useState(false);
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

        <main className="bg-[#191919] min-h-140 flex flex-grow flex-col justify-center items-center p-6">
            <h2 className="text-3xl text-center text-[#9A4EAE] mt-10 mb-10">
                ¡Inicia sesión!
            </h2>
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
                    placeholder="email@ejemplo.com"
                    autoFocus
                    required
                    className="focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition  hover:ring-2 hover:ring-[#7A3E8F]"
                />

                <label htmlFor="password" className="font-semibold">
                    Contraseña
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                <div className="flex justify-center">
                    <button
                        disabled={loading}
                        className={`hover:scale-105 min-w-[200px] max-w-[200px] mt-5 mb-1 px-4 py-2 font-semibold rounded-lg transition duration-300 shadow-[4px_4px_10px_#191919] 
                        ${
                            loading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-[#7A3E8F] text-white hover:bg-[#9A4EAE] focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] focus:ring-opacity-50'
                        }`}
                    >
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </div>

                <p className="text-[#9A4EAE] text-center text-base mt-4">
                    ¿Aún no te has registrado?
                </p>
                <Link
                    to="/register"
                    className="text-[#9A4EAE] text-center text-xl mb-5 hover:underline"
                >
                    <strong>¡Crea tu cuenta!</strong>
                </Link>
                <Link
                    to="/users/password/reset"
                    className="text-[#9A4EAE] hover:underline text-center text-base"
                >
                    ¿Has olvidado tu contraseña?
                </Link>
            </form>
        </main>
    );
};

export default LoginPage;
