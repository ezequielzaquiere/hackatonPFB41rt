//Importar modelos
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserProfileModel from '../../models/users/updateUserProfileModel.js';

//Importar útiles
import saveImgUtil from '../../utils/saveImgUtil.js';
import removeImgUtil from '../../utils/removeImgUtil.js';

//función controladora que actualiza datos del usuario.
const updateUserProfileController = async (req, res, next) => {
    try {
        const { username, email, firstName, lastName } = req.body;

        const avatar = req.files?.avatar;

        let avatarName;

        if (avatar) {
            const user = await selectUserByIdModel(req.user.id);

            user.avatar && (await removeImgUtil(user.avatar, 'avatar'));

            avatarName = await saveImgUtil(avatar, 400, 'avatar');
        }

        await updateUserProfileModel({
            username,
            firstName,
            lastName,
            email,
            avatarName,
            userId: req.user.id,
        });

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: {
                user: {
                    username,
                    firstName,
                    lastName,
                    email,
                    avatar: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserProfileController;
