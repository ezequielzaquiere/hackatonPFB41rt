//Importar dependenias
import PropTypes from 'prop-types';

//Input de subida de documentos
const InputDocumentUpload = ({ formData, handleChangeFiles }) => {
    return (
        <>
            <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Documento de reglas
            </legend>

            <label
                htmlFor="file"
                className="group flex items-center justify-center px-4 py-2 text-white 
                                bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg cursor-pointer 
                                focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
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
