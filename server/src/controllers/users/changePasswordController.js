//Importar modelos necesarios

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
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos obligatorios',
        });
    }

    //Buscar al usuario en la base de datos y verificar la contraseña (a esperas de que se termine la DB)
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).send({
            status: 'error',
            message: 'Usuario no encontrado',
        });
    }

    // Verificar contraseña actual
    if (user.password !== currentPassword) {
        return res.status(404).send({
            status: 'error',
            message: 'Contraseña actual incorrecta',
        });
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
