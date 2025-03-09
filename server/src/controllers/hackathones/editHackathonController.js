//Importar models
import selectHackathonDetailsByIdModel from '../../models/hackathones/selectHackathonDetailsByIdModel.js';
import editHackathonModel from '../../models/hackathones/editHackathonModel.js';
import editHackathonLangsModel from '../../models/hackathones/editHackathonLangsModel.js';

//Importar utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import removeImgUtil from '../../utils/removeImgUtil.js';
import saveImgUtil from '../../utils/saveImgUtil.js';
import saveDocUtil from '../../utils/saveDocUtil.js';
import removeDocUtil from '../../utils/removeDocUtil.js';
import validateDatesUtil from '../../utils/validateDatesUtil.js';

//Funcion que permite actualizar la informacion de un hackathon
const editHackathonController = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;

        //Obtenemos los balores del body
        const {
            title,
            summary,
            startingDate,
            deadline,
            type,
            location,
            themeId,
            programmingLangId,
            details,
        } = req.body;

        const image = req.files?.image;
        const attachedFile = req.files?.document;

        //Obtenemos los datos del hackathon
        const hackathon = await selectHackathonDetailsByIdModel(hackathonId);

        //Manejo de documentos e imagenes
        let imgName = hackathon.image || '';
        let docName = hackathon.attachedFile || '';

        //Si nos envian una imagen
        if (image) {
            hackathon.image &&
                (await removeImgUtil(hackathon.image, 'imgHack'));

            imgName = await saveImgUtil(image, null, 'imgHack');
        }

        //Si nos envian un documento
        if (attachedFile) {
            hackathon.attachedFile &&
                (await removeDocUtil(hackathon.attachedFile));

            docName = await saveDocUtil(attachedFile);
        }
        //Convertimos el array de lenguajes a numero (recibimos los numeros en string)
        if (programmingLangId && programmingLangId.length > 0) {
            let programmingLangIdArray = programmingLangId.map(Number);

            await editHackathonLangsModel(hackathonId, programmingLangIdArray);
        }

        //Comprobamos las fechas
        let formatedStartingDate = hackathon.startingDate || '';
        let formatedDeadline = hackathon.deadline || '';

        if (startingDate && deadline) {
            ({ formatedStartingDate, formatedDeadline } = validateDatesUtil(
                startingDate,
                deadline
            ));
        } else if (deadline) {
            ({ formatedStartingDate, formatedDeadline } = validateDatesUtil(
                formatedStartingDate,
                deadline
            ));
        } else if (startingDate) {
            ({ formatedStartingDate, formatedDeadline } = validateDatesUtil(
                startingDate,
                deadline
            ));
        }

        //Comprobamos si se cambia el tipo
        if (
            type === 'presencial' &&
            (location === null || location === 'En todas partes')
        ) {
            generateErrorUtil(400, 'Faltan campo de localizacion');
        }

        await editHackathonModel({
            title,
            summary,
            formatedStartingDate,
            formatedDeadline,
            type,
            themeId,
            location,
            details,
            docName,
            imgName,
            hackathonId,
        });

        res.status(200).send({
            status: 'ok',
            message: 'Informacion del hackathon actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default editHackathonController;
