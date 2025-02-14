//Importar dependencias
import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';

//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función para cambiar contraseña
const changePasswordController = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        //Buscar al usuario por su mail
        const [users] = await getPool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return generateErrorUtil(404, 'Usuario no encontrado');
        }

        const user = users[0];

        //Verificar la contraseña actual
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return generateErrorUtil(400, 'Contraseña actual incorrecta');
        }

        //Hashear la nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // 4. Actualizar la contraseña en la base de datos
        await getPool.query('UPDATE users SET password = ? WHERE email = ?', [
            hashedPassword,
            email,
        ]);

        res.status(200).send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        generateErrorUtil(500, 'Error al cambiar la contraseña', error);
    }
};

export default changePasswordController;
