import PropTypes from 'prop-types';

//Input de texto del titulo
const InputTitle = ({ formData, handleChangeGeneral }) => {
    return (
        <div className="mb-6">
            <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Titulo
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChangeGeneral}
                required
                placeholder="Aqui va el título"
                autoFocus
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 dark:autofill:focus:border-blue-500 autofill:focus:border-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        </div>
    );
};

//Validadcion de props
InputTitle.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};
export default InputTitle;
