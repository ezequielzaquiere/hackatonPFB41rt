//Importamos dependencias
import path from 'path';
import fs from 'fs-extra';

//Importamos utils
import generateErrorUtil from './generateErrorUtil.js';

//Obtenemos el directorio de descargas
const { UPLOADS_DIR } = process.env;

//Funcion que elimina una imagen del hackaton
const removeImgUtil = async (imgName, type) => {
    try {
        if (!['avatar', 'imgHack'].includes(type)) {
            generateErrorUtil(400, 'Tipo de imagen no valido');
        }
        const pathUpload = path.join(process.cwd(), UPLOADS_DIR);

        //Indicamos la ruta de las carpetas
        const folders = {
            avatar: path.join(pathUpload, 'avatar'),
            imgHack: path.join(pathUpload, 'imgHack'),
        };

        //Creamos la direccion de la imagen
        const imgPath = path.join(folders[type], imgName);

        //Eliminamos al imagen
        await fs.remove(imgPath);
    } catch (err) {
        console.error(err);

        generateErrorUtil(500, 'Error al eliminar archivos en disco');
    }
};

export default removeImgUtil;
