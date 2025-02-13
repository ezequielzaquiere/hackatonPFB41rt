// Accedemos a las variables del fichero ".env" y las añadimos a la lista de variables de entorno.
import 'dotenv/config';

// Importamos las dependencias.
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

// Importamos las rutas.
import userRoutes from './src/routes/userRoutes.js';
import hackathonRoutes from './src/routes/hackathonRoutes.js';

// Obtenemos las variables de entorno necesarias.
const { PORT, UPLOADS_DIR } = process.env;

// Creamos una aplicación Express (el servidor).
const app = express();

// Middleware que muestra por consola información acerca de la petición entrante.
app.use(morgan('dev'));

// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());

// Middleware que permite leer un body en formato JSON.
app.use(express.json());

// Middleware que permite leer un body en formato form-data.
app.use(fileUpload());

// Middleware que indica a Express dónde están los archivos estaticos.
app.use(express.static(UPLOADS_DIR));

// Middleware que indica a Express dónde están las rutas.
app.use('/api/users', userRoutes);
app.use('/api/hackathon', hackathonRoutes);

// Middleware de manejo de errores.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Indicamos al servidor que escuche peticiones en un puerto específico.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
