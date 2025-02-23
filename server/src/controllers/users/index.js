//Importar funciones controladoras
import registerUserController from './registerUserController.js';
import loginUserController from './loginUserController.js';
import privateUserProfileController from './privateUserProfileController.js';
import updateActivateUserController from './updateActivateUserController.js';
import sendRecoveryPassEmailController from './sendRecoveryPassEmailController.js';
import useRecoveryPassCodeController from './useRecoveryPassCodeController.js';
import updateUserProfileController from './updateUserProfileController.js';
import updateUserPassController from './updateUserPassController.js';
import showUserInfoController from './showUserInfoController.js';
import listUserRegistrationsController from './listUserRegistrationsController.js';
//Exportar las funciones en un solo objeto
export {
    registerUserController,
    loginUserController,
    privateUserProfileController,
    updateActivateUserController,
    sendRecoveryPassEmailController,
    updateUserProfileController,
    updateUserPassController,
    useRecoveryPassCodeController,
    showUserInfoController,
    listUserRegistrationsController,
};
