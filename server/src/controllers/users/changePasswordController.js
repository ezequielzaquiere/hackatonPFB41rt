//Importar modelos necesarios

//Autenticar al usuario mediante JWT

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
    const isCurrentPasswordValid = true;

    if (!isCurrentPasswordValid) {
        return res.status(401).send({
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
