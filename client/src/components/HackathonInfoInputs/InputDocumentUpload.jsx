//Importar dependenias
import PropTypes from 'prop-types';

//Input de subida de documentos
const InputDocumentUpload = ({ formData, handleChangeFiles }) => {
    return (
        <>
            <legend className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Documento de reglas
            </legend>

            <label
                htmlFor="file"
                className="w-full px-4 py-2 my-3 font-semibold rounded-lg shadow-[6px_6px_5px_#191919] bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50"
            >
                {typeof formData.document === 'string'
                    ? formData.document
                    : formData.document?.name || 'Elige un documento'}{' '}
            </label>
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
