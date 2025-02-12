//Importar modelos necesarios

//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Autenticar al usuario mediante JWT

//Array de usuarios para probar antes de tener la DB
const users = [
    {
        id: 1,
        email: 'usuario1@example.com',
        password: 'contraseña1',
    },
    {
        id: 2,
        email: 'usuario2@example.com',
        password: 'contraseña2',
    },
    {
        id: 3,
        email: 'usuario3@example.com',
        password: 'contraseña3',
    },
];

//Función para cambiar contraseña
const changePasswordController = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    //Validar datos
    if (!userId || !currentPassword || !newPassword) {
        generateErrorUtil(400, 'Faltan datos obligatorios');
    }

    //Buscar al usuario en la base de datos y verificar la contraseña (a esperas de que se termine la DB)
    const user = users.find((u) => u.id === userId);

    if (!user) {
        generateErrorUtil(404, 'Usuario no encontrado');
    }

    // Verificar contraseña actual
    if (user.password !== currentPassword) {
        generateErrorUtil(404, 'Contraseña actual incorrecta');
    }

    //Guardar nueva contraseña en la DB
    console.log(`Contraseña actualizada para el usuario ${userId}`);

    //Respuesta
    res.status(200).send({
        status: 'ok',
        message: 'Contraseña cambiada correctamente',
    });
};

export default changePasswordController;
