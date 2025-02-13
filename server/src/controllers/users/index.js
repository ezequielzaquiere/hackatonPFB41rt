//Importar funciones controladoras
import registerUserController from './registerUserController.js';
import changePasswordController from './changePasswordController.js';
import loginUserController from './loginUserController.js';
import privateUserProfileController from './privateUserProfileController.js';
import activateUserController from './activateUserController.js';

//Exportar las funciones en un solo objeto
export {
    registerUserController,
    loginUserController,
    changePasswordController,
    privateUserProfileController,
    activateUserController,
};
