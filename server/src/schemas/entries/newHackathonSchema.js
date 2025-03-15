// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../user/joiErrorMessages.js';

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newHackathonSchema = joi
    .object({
        title: joi.string().min(5).max(200).required().messages({
            'any.required': 'El hackathon necesita tener un título',
        }),
        summary: joi.string().min(3).max(140).required().messages({
            'any.required':
                'El hackathon necesita tener una pequeña descripción.',
        }),
        startingDate: joi.date().required().messages({
            'any.required': 'El hackathon necesita tener una fecha de inicio.',
        }),
        deadline: joi.date().required().messages({
            'any.required':
                'El hackathon necesita tener una fecha de finalización.',
        }),
        type: joi.string().valid('online', 'presencial').required().messages({
            'any.only': 'El campo "{#key}" debe ser "online" o "presencial".',
        }),
        location: joi.string().min(2).max(200),
        details: joi.string().allow(''),
        themeId: joi.number().required().messages({
            'any.required': 'El hackathon necesita tener una temática.',
            'number.base': 'El hackathon necesita tener una temática.',
        }),
        image: joi
            .object({
                // Validar la imagen
                originalname: joi.string().required(),
                mimetype: joi
                    .string()
                    .valid('image/jpeg', 'image/png', 'image/gif')
                    .required(), // Solo permitir JPEG, PNG o GIF
                size: joi
                    .number()
                    .max(5 * 1024 * 1024)
                    .required(),
            })
            .optional(),
        document: joi
            .object({
                // Validar el documento
                originalname: joi.string().required(),
                mimetype: joi.string().valid('application/pdf').required(),
                size: joi
                    .number()
                    .max(10 * 1024 * 1024)
                    .required(),
            })
            .optional(),
        programmingLangId: joi
            .array()
            .items(joi.number())
            .min(1)
            .required()
            .messages({
                'any.required': 'Tienes que seleccionar un lenguaje.',
                'number.base':
                    'Selecciona por lo menos un lenguaje de programación.',
            }),
    })
    .messages(joiErrorMessages);
export default newHackathonSchema;
