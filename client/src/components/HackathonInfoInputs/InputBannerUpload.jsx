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
            <legend className="block mb-4 text-sm font-medium text-[#9A4EAE]">
                Imagen del banner
            </legend>

            <label
                htmlFor="image"
                className="w-full px-4 py-2 my-3 rounded-lg shadow-[6px_6px_5px_#191919] bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50"
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
