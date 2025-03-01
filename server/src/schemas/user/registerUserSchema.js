import joi from 'joi';

import joiErrorMessages from './joiErrorMessages.js';

// Expresión regular para solo letras (mayúsculas y minúsculas, con espacios opcionales)
const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

// Creamos el esquema.
const registerUserSchema = joi
    .object()
    .keys({
        username: joi.string().alphanum().min(2).max(20).required(),
        firstName: joi
            .string()
            .min(2)
            .max(40)
            .regex(nameRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'El campo "{#key}" solo puede contener letras y espacios.',
            }),
        lastName: joi.string().min(2).max(70).required().messages({
            'string.pattern.base':
                'El campo "{#key}" solo puede contener letras y espacios.',
        }),
        email: joi.string().email().max(70).required(),
        password: joi.string().min(8).max(100).required().messages({
            'string.pattern.base':
                'El campo "{#key}" debe contener mínimo 8 digitos,una letra,un número y un símbolo.',
        }),
    })
    .messages(joiErrorMessages);

export default registerUserSchema;
