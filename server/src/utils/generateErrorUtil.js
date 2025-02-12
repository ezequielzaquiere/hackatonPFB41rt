//Funcion generadora de errores
const generateErrorUtil = (code, msg) => {
    const err = new Error(msg);
    err.httpStatus = code;
    throw err;
};

export default generateErrorUtil;
