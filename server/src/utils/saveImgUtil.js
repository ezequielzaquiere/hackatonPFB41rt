//Importar dependencias
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

//Importar middlewares
import generateErrorUtil from './generateErrorUtil.js';

const saveImgUtil = async (img, width) => {
    try {
        const pathUpload = path.join(process.cwd(), process.env.UPLOADS_DIR);

        //Path upload avatar
        const pathUploadAvatar = path.join(pathUpload, 'avatar');

        //Path upload banner
        const pathUploadBanner = path.join(pathUpload, 'banner');

        //Comprobamos si existen las carpetas, si no las creamos
        try {
            await fs.access(pathUploadAvatar);
        } catch {
            await fs.mkdir(pathUploadAvatar, { recursive: true });
        }

        try {
            await fs.access(pathUploadBanner);
        } catch {
            await fs.mkdir(pathUploadBanner, { recursive: true });
        }

        //Le damos un nombre aleatorio a las imagen
        const imgName = `${crypto.randomUUID()}.png`;

        //Creamos un objeto tipo sharp con la imagen
        const sharpImg = sharp(img.data);

        //Cambiamos el tamaño de la imagen avatar
        sharpImg.resize(width);

        if (width === 400) {
            const imgPathAvatar = path.join(pathUploadAvatar, imgName);
            //Guardamos la imagen
            await sharpImg.toFile(imgPathAvatar);
        } else {
            const imgPathBanner = path.join(pathUploadBanner, imgName);

            await sharpImg.toFile(imgPathBanner);
        }

        return imgName;
    } catch (err) {
        console.error(err);

        generateErrorUtil(500, 'Error al guardar el archivo');
    }
};

export default saveImgUtil;
