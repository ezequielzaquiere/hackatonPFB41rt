// Importamos los modelos necesarios.
import insertUserModel from '../../models/users/insertUserModel.js';

// Importamos la función que genera un error.
import validateSchemaUtil from '../../utils/validateSchema.js';
import registerUserSchema from '../../schemas/user/registerUserSchema.js';

// Función controladora que registra un nuevo usuario.
const registerUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { username, firstName, lastName, email, password, role } =
            req.body;

        // Validación con joi.
        await validateSchemaUtil(registerUserSchema, req.body);

        // Insertamos al usuario en la bd.
        await insertUserModel(
            username,
            firstName,
            lastName,
            email,
            password,
            role
        );

        res.status(201).send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, activa tu usuario en el email de verificación que recibirás en tu correo',
        });
    } catch (err) {
        next(err);
    }
};

export default registerUserController;
