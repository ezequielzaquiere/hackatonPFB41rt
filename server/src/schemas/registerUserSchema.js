import joi from 'joi';

import joiErrorMessages from './joiMessageErrors.js';

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
        password: joi
            .string()
            .min(8)
            .max(100)
            .regex(nameRegex)
            .regex(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~={}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~={}:";'<>¿?,.]{8,}$/
            )
            .messages({
                'string.pattern.base':
                    'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}".',
            })
            .required(),
        role: joi.string().valid('admin', 'dev').required().messages({
            'any.only': 'El valor de "{#key}" debe ser "admin" o "dev".',
        }),
    })
    .messages(joiErrorMessages);

export default registerUserSchema;
