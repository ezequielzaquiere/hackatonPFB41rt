import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import validateSchemaUtil from '../../utils/validateSchema.js';
import loginUserSchema from '../../schemas/user/loginUserSchema.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion controladora
const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validación con joi.
        await validateSchemaUtil(loginUserSchema, req.body);

        const user = await selectUserByEmailModel(email);

        //Creamos una variable que nos indicara si la contrasena es valida
        let validPass;

        if (user) {
            validPass = await bcrypt.compare(password, user.password);
        }
        if (!user || !validPass) {
            generateErrorUtil(403, 'Credenciales invalidas');
        }

        //Si el usuario no esta activo, lanzamos un error
        if (!user.active) {
            generateErrorUtil(403, 'Usuario pendiente de activar');
        }

        //Almacenamos la informacion que queremos agregar al token
        const tokenData = {
            id: user.id,
            role: user.role,
        };

        //Creamos el token
        const token = jwt.sign(tokenData, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: { token },
        });
    } catch (err) {
        next(err);
    }
};
export default loginUserController;
