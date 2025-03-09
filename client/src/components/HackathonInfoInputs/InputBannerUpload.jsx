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
            {/* Título */}
            <legend className="block mb-4 text-base font-bold text-[white]">
                Imagen del Banner
            </legend>

            {/* Contenedor del botón */}
            <label
                htmlFor="image"
                className="w-full flex items-center justify-center px-6 py-2 mb-2 rounded-lg shadow-lg bg-[#7A3E8F] text-white font-semibold cursor-pointer 
            hover:bg-[#9A4EAE] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] focus:ring-opacity-50"
            >
                📂{' '}
                {typeof formData.image === 'string'
                    ? formData.image
                    : formData.image?.name || 'Elige una imagen'}
            </label>

            {/* Input oculto */}
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
    formData: PropTypes.object.isRequired,
};
export default InputBannerUpload;
