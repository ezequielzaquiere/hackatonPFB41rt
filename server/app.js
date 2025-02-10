// Accedemos a las variables del fichero ".env" y las añadimos a la lista de variables de entorno.
import 'dotenv/config';

// Importamos las dependencias.
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

// Importamos las rutas.

// Obtenemos las variables de entorno necesarias.
const { PORT } = process.env;

// Creamos una aplicación Express (el servidor).
const app = express();

// Middleware que muestra por consola información acerca de la petición entrante.

// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());

// Middleware que permite leer un body en formato JSON.

// Middleware que permite leer un body en formato form-data.

// Middleware que indica a Express dónde están las rutas.

// Middleware de manejo de errores.
// eslint-disable-next-line no-unused-vars

// Middelware de ruta no encontrada.

// Indicamos al servidor que escuche peticiones en un puerto específico.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
