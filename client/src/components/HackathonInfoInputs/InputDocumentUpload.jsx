//Importar dependenias
import PropTypes from 'prop-types';

//Input de subida de documentos
const InputDocumentUpload = ({ formData, handleChangeFiles }) => {
    return (
        <>
            {/* Título */}
            <legend className="block text-base font-bold text-[white]">
                Documento de Reglas
            </legend>

            {/* Botón estilizado para subir documentos */}
            <label
                htmlFor="file"
                className="w-full flex items-center justify-center px-6 py-2 my-3 rounded-lg shadow-lg bg-[#7A3E8F] text-white font-semibold cursor-pointer 
            hover:bg-[#9A4EAE] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] focus:ring-opacity-50"
            >
                {' '}
                {typeof formData.document === 'string'
                    ? formData.document
                    : formData.document?.name || 'Elige un documento'}
            </label>

            {/* Input oculto */}
            <input
                type="file"
                id="file"
                name="document"
                accept=".pdf,application/pdf"
                onChange={handleChangeFiles}
                className="hidden"
            />
        </>
    );
};
//Validadcion de props
InputDocumentUpload.propTypes = {
    handleChangeFiles: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};
export default InputDocumentUpload;
