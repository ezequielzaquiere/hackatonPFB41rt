//Import dependencias
import fs from 'fs-extra';
import path from 'path';

//Import utils
import generateErrorUtil from './generateErrorUtil.js';

//Funcion que elimina un documento
const removeDocUtil = async (docName) => {
    try {
        //Ruta donde se encunetran los documentos
        const pathUploadDoc = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            'documents'
        );

        //Ruta donde se encuentra el documento específico
        const docPath = path.join(pathUploadDoc, docName);

        //Eliminamos el documento
        await fs.remove(docPath);
    } catch (err) {
        console.error(err);

        generateErrorUtil(500, 'Error al eliminar el documento');
    }
};

export default removeDocUtil;
