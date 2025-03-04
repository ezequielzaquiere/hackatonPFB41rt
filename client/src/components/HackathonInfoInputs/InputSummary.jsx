//Importar dependencias
import PropTypes from 'prop-types';

//Input de textarea de  los detalles
const InputSummary = ({ formData, handleChangeGeneral }) => {
    return (
        <>
            <label
                htmlFor="summary"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Descripcion del evento
            </label>
            <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChangeGeneral}
                placeholder="Una breve descripcion del evento..."
                maxLength="140"
                rows="4"
                required
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:autofill:focus:border-blue-500 autofill:focus:border-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
        </>
    );
};

//Validadcion de props
InputSummary.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};

export default InputSummary;
