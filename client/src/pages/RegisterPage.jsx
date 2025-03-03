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
                duration: 10000,
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
        <main className="bg-[#191919] min-h-screen flex flex-col justify-center items-center px-10 py-10 text-s">
            <form
                onSubmit={handleRegister}
                className="bg-[#222] text-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-3xl text-center text-[#9A4EAE] mb-4">
                    ¡Crea tu cuenta!
                </h2>

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
                    placeholder="jose.elias"
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
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
                    placeholder="Jose"
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
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
                    placeholder="Elias"
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
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
                    placeholder="jose@dominio.com"
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                />

                <label htmlFor="password" className="font-semibold">
                    Contraseña *
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    placeholder="************"
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                />

                <p className="text-xs pb-2">
                    Debe contener mínimo 8 caracteres, una letra, un número y un
                    caracter especial (!@#$%^&*()).
                </p>
                <label htmlFor="repeatedPass" className="font-semibold">
                    Repetir Contraseña:
                </label>
                <input
                    type="password"
                    id="repeatedPass"
                    value={repeatedPass}
                    onChange={(e) => setRepeatedPass(e.target.value)}
                    autoComplete="new-password"
                    required
                    placeholder="************"
                    className="bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                />

                <p className="text-xs pb-2">(*) Campos obligatorios.</p>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 my-3 font-semibold rounded-lg shadow-[6px_6px_5px_#191919] ${
                        loading
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50'
                    }`}
                >
                    {loading ? 'Registrando...' : '¡Crea tu cuenta!'}
                </button>
            </form>
        </main>
    );
};

export default RegisterPage;
