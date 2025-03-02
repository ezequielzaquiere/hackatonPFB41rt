//Importamos los hooks. 
import { useState,useContext } from "react";

//Importamos los componentes y el hook useNavigate.
import { Navigate, useNavigate } from "react-router-dom";

//Importamos contexto de autorización.
import { AuthContext } from "../contexts/AuthContext";

//Importamos la función toast.
import toast from "react-hot-toast";

//Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

//Inicializamos el componente.
const RegisterPage=()=>{
    //Importamos el contexto de autorización.
    const {authUser} = useContext(AuthContext);

    const navigate = useNavigate();

    //Creamos una variable en el State para cada elemento del formulario.
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPass, setRepeatedPass] = useState("");

    //Creamos una variable en el State para indicar si estamos haciendo fetch.
    const [loading, setLoading] = useState(false);

    //Función que maneja el envío del formulario.
    const handleRegister = async (e) => {
      try {
        e.preventDefault();

        //Si las contraseñas no coinciden lanzamos un error.
        if(password !== repeatedPass){
            throw new Error ("Las contraseñas no coinciden");
        }

        //Indicamos que comienza el fetch.
        setLoading(true);

        //Obtenemos respuesta.
        const res = await fetch(`${VITE_API_URL}/api/users/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
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
        if (body.status === "error"){
            throw new Error(body.message)
        }

        //Si todo va bien mostramos un mensaje de confirmación al usuario.
        toast.success(body.message, {
            id:"register",
            duration: 10000,
        });
        //Dirigimos a la página principal.
        navigate("/")

      } catch (err) {
            toast.error(err.message, {
                id:"register",
            });
      } finally {

         //Indicamos que se finalizó el fetch.
         setLoading(false);
      }
    };

    //Si estamos logueados restringimos el acceso redirigiendo a la página principal.
    if (authUser){
    return <Navigate to ="/" />
    } 

    return(
        <main>
            <h2>Página de Registro</h2>

            <form onSubmit={handleRegister}>

                <label htmlFor="username">Usuario:</label>
                <input type="text" id="username" value={username} onChange={(e)=> setUsername(e.target.value)} autoComplete="username" autoFocus required/>

                <label htmlFor="firstName">Nombre:</label>
                <input type="text" id="firstName" value={firstName} onChange={(e)=> setFirstName(e.target.value)}  required/>

                <label htmlFor="lastName">Apellido:</label>
                <input type="text" id="lastName" value={lastName} onChange={(e)=> setLastName(e.target.value)}  required/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} autoComplete="email" required/>    

                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} autoComplete="new-password" required/> 

                <label htmlFor="repeatedPass">Repetir Contraseña:</label>
                <input type="password" id="repeatedPass" value={repeatedPass} onChange={(e)=> setRepeatedPass(e.target.value)} autoComplete="new-password" required/> 

                <button
    type="submit"
    disabled={loading}
    className={`px-4 py-2 font-semibold rounded-lg shadow-md transition duration-300 ${
        loading 
            ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
            : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    }`}
>
    {loading ? "Registrando..." : "Registrarse"}
</button>

            </form>
        </main>
    );
};

export default RegisterPage;