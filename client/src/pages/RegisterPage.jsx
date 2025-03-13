//Importamos los hooks.
import { useState, useContext } from 'react';

//Importamos los componentes y el hook useNavigate.
import { Navigate, useNavigate } from 'react-router-dom';

//Importamos contexto de autorización.
import { AuthContext } from '../contexts/AuthContext';

//Importamos la función toast.
import toast from 'react-hot-toast';

//Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

//Inicializamos el componente.
const RegisterPage = () => {
    //Importamos el contexto de autorización.
    const { authUser } = useContext(AuthContext);

    const navigate = useNavigate();

    //Creamos una variable en el State para cada elemento del formulario.
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatedPass, setShowRepeatedPass] = useState(false);

    //Creamos una variable en el State para indicar si estamos haciendo fetch.
    const [loading, setLoading] = useState(false);

    //Función que maneja el envío del formulario.
    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            //Si las contraseñas no coinciden lanzamos un error.
            if (password !== repeatedPass) {
                throw new Error('Las contraseñas no coinciden');
            }

            //Indicamos que comienza el fetch.
            setLoading(true);

            //Obtenemos respuesta.
            const res = await fetch(`${VITE_API_URL}/api/users/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    firstName,
                    lastName,
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

            //Si todo va bien mostramos un mensaje de confirmación al usuario.
            toast.success(body.message, {
                id: 'register',
                duration: 3000,
            });
            //Dirigimos a la página principal.
            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'register',
            });
        } finally {
            //Indicamos que se finalizó el fetch.
            setLoading(false);
        }
    };

    //Si estamos logueados restringimos el acceso redirigiendo a la página principal.
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <main className="bg-[#191919] min-h-screen flex flex-col justify-start items-center px-10 py-10 text-s">
            <h2 className="text-3xl text-center text-[#9A4EAE] mt-10 mb-10">
                ¡Crea tu cuenta!
            </h2>

            <form
                onSubmit={handleRegister}
                className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <label htmlFor="username" className="font-semibold">
                    Usuario *
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    autoFocus
                    required
                    placeholder="usuario123"
                    className="focus:placeholder-transparent bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:bg-[#7A3E8F] focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                />

                <label htmlFor="firstName" className="font-semibold">
                    Nombre *
                </label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="Tu nombre"
                    className="focus:placeholder-transparent bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:bg-[#7A3E8F] focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                />

                <label htmlFor="lastName" className="font-semibold">
                    Apellido *
                </label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Tu apellido"
                    className="focus:placeholder-transparent bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:bg-[#7A3E8F] focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                />

                <label htmlFor="email" className="font-semibold">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    placeholder="email@ejemplo.com"
                    className="focus:placeholder-transparent bg-[#333] border border-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:bg-[#7A3E8F] focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                />

                <label htmlFor="password" className="font-semibold">
                    Contraseña *
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
                <p className="text-xs pb-2">
                    Debe contener mínimo 8 caracteres, una letra, un número y un
                    caracter especial (!@#$%^&*()).
                </p>
                <label htmlFor="repeatedPass" className="font-semibold">
                    Repetir Contraseña:
                </label>
                <div className="relative">
                    <input
                        type={showRepeatedPass ? 'text' : 'password'}
                        id="repeatedPass"
                        value={repeatedPass}
                        onChange={(e) => setRepeatedPass(e.target.value)}
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
                <p className="text-xs pb-2">(*) Campos obligatorios.</p>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`hover:scale-105 transition max-w-[200px] px-4 py-2 my-3 font-semibold rounded-lg shadow-[6px_6px_5px_#191919] ${
                            loading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-[#7A3E8F] text-white hover:bg-[#9A4EAE] focus:outline-none focus:ring-2 focus:bg-[#9A4EAE] focus:ring-[#9A4EAE] focus:ring-opacity-50'
                        }`}
                    >
                        {loading ? 'Registrando...' : '¡Registrarse!'}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default RegisterPage;
