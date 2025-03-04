//Importar dependenias
import PropTypes from 'prop-types';

//Input de subida de imagens del banner
const InputBannerUpload = ({ formData, handleChangeFiles }) => {
    console.log(
        'Valor de formData.image:',
        formData.image,
        'Tipo:',
        typeof formData.image
    );

    return (
        <>
            <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Imagen del banner
            </legend>

            <label
                htmlFor="image"
                className="group flex items-center justify-center px-4 py-2 text-white 
                                bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg cursor-pointer 
                                focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
            >
                {typeof formData.image === 'string'
                    ? formData.image // Si es un string, muestra el nombre
                    : formData.image?.name || 'Elige una imagen'}
            </label>

            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChangeFiles}
                className="hidden"
            />
        </>
    );
};

//Validadcion de props
InputBannerUpload.propTypes = {
    handleChangeFiles: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};
export default InputBannerUpload;
