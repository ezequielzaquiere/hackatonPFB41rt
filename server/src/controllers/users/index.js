//Importar funciones controladoras
import registerUserController from './registerUserController.js';
import changePasswordController from './changePasswordController.js';
import loginUserController from './loginUserController.js';
import privateUserProfileController from './privateUserProfileController.js';
import updateActivateUserController from './updateActivateUserController.js';
import sendRecoveryPassEmailController from './sendRecoveryPassEmailController.js';
import useRecoveryPassCodeController from './useRecoveryPassCodeController.js';

//Exportar las funciones en un solo objeto
export {
    registerUserController,
    loginUserController,
    changePasswordController,
    privateUserProfileController,
    updateActivateUserController,
    sendRecoveryPassEmailController,
    useRecoveryPassCodeController,
};
