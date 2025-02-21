// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../user/joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newHackathonSchema = joi
    .object({
        title: joi.string().min(5).max(200).required(),
        summary: joi.string().min(3).max(30).required(),
        startingDate: joi.date().required(),
        deadline: joi.date().required(),
        type: joi.string().valid('online', 'presencial').required().messages({
            'any.only': 'El campo "{#key}" debe ser "online" o "dual".',
        }),
        location: joi.string().min(2).max(200),
        details: joi.string().max(1000),
        themeId: joi.number().required(),
        programmingLangId: joi.array().items(joi.number()).required(),
    })
    .messages(joiErrorMessages);
export default newHackathonSchema;
