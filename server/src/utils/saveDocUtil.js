//Import dependencias
import fs from 'fs-extra';
import path from 'path';

//Import utils
import generateErrorUtil from './generateErrorUtil.js';

//Funcion que gestiona los documentos
const saveDocUtil = async (document) => {
    try {
        //Comprobamos si es un formato valido
        if (document.mimetype !== 'application/pdf') {
            generateErrorUtil(415, 'Solo se admiten archivos en formato pdf');
        }

        const pathUploadDoc = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            'documents'
        );

        //Comprobamos si existe la ruta, si no la creamos
        try {
            await fs.access(pathUploadDoc);
        } catch {
            await fs.mkdir(pathUploadDoc, { recursive: true });
        }

        //Le damos un nombre aleatorio al documento
        const docName = `${crypto.randomUUID()}.pdf`;

        const docPath = path.join(pathUploadDoc, docName);

        //Guardamos el archivo
        await document.mv(docPath);

        return docName;
    } catch (error) {
        console.error(error);

        generateErrorUtil(500, 'Error al guardar el documento');
    }
};

export default saveDocUtil;
