//Importar dependencias
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

//Importar middlewares
import generateErrorUtil from './generateErrorUtil.js';

const saveImgUtil = async (img, width, type) => {
    try {
        //Lanzamos error si no hay tipo o si no es valido
        if (!['avatar', 'imgHack'].includes(type)) {
            generateErrorUtil(400, 'Tipo de imagen no valido');
        }

        const pathUpload = path.join(process.cwd(), process.env.UPLOADS_DIR);

        //Indicamos la ruta de las carpetas
        const folders = {
            avatar: path.join(pathUpload, 'avatar'),
            imgHack: path.join(pathUpload, 'imgHack'),
        };

        //Comprobamos si existen las carpetas, si no las creamos

        try {
            await fs.access(folders[type]);
        } catch {
            await fs.mkdir(folders[type], { recursive: true });
        }

        //Le damos un nombre aleatorio a las imagen
        const imgName = `${crypto.randomUUID()}.png`;

        //Creamos un objeto tipo sharp con la imagen
        const sharpImg = sharp(img.data);

        //Cambiamos el tamaño de la imagen
        if (width) {
            sharpImg.resize(width);
        }

        const imgPath = path.join(folders[type], imgName);

        await sharpImg.toFile(imgPath);

        return imgName;
    } catch (err) {
        console.error(err);

        generateErrorUtil(500, 'Error al guardar el archivo');
    }
};

export default saveImgUtil;
