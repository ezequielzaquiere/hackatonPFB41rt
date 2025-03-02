//Importamos los hooks.
import { useContext, useState } from "react";

//Importamos los componentes.
import { Navigate, Link } from "react-router-dom";

//Importamos la función toast.
import toast from "react-hot-toast";

//Importamos el contexto de autorización.
import { AuthContext } from "../contexts/AuthContext";

//Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;

//Inicializamos el componente.
const LoginPage=()=>{
    //Importamos el contexto de autorización.
    const {authUser, authLoginState} = useContext(AuthContext);

    //Creamos una variable en el State para cada elemento del formulario.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
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
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email,
                password,
            }),
        });

        //Obtenemos el body.
        const body = await res.json();

        //Si recibimos un error lo mostramos al usuario.
        if (body.status === "error"){
            throw new Error(body.message);
        }

        //Almacenamos el token.
        authLoginState(body.data.token);
        
        //Si todo va bien mostramos un mensaje de confirmación al usuario.
        toast.sucess("Usuario logueado", {
            id:"login",
        });
        
      } catch (err) {
            toast.error(err.message, {
                id:"login",
            });
      } finally {
         //Indicamos que se finalizó el fetch.
         setLoading(false);
      }
    };

    //Si estamos logueados restringimos el acceso redirigiendo  a la página principal.
    if (authUser){
        return <Navigate to ="/" />
        } 

    return(
        <main>
            <h2>Página de Login</h2>

            <form onSubmit={handleLogin}>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} autoComplete="email" required/>    

                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} autoComplete="current-password" required/> 

 
                <button 
    disabled={loading} 
    className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ${
        loading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-500 hover:bg-blue-600"
    }`}
>
    Loguearse
</button>

<a><Link to="/user/password/reset">¿Has olvidado tu contraseña?</Link></a>

            </form>
        </main>
    );
};

export default LoginPage;
