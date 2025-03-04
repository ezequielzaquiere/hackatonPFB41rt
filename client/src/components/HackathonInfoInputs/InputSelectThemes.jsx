//Importar dependencias
import PropTypes from 'prop-types';

//Input select de las tematicas de un hackathon
const InputSelectThemes = ({
    formData,
    handleChangeGeneral,
    hackathonThemes,
}) => {
    return (
        <>
            <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Selecciona una tematica
            </legend>
            <label htmlFor="themeId" hidden>
                Selecciona una tematica
            </label>
            <select
                value={formData.themeId}
                onChange={handleChangeGeneral}
                name="themeId"
                id="themeId"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option key="" selected hidden>
                    --Selecciona una opcion--
                </option>
                {hackathonThemes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                        {theme.theme}
                    </option>
                ))}
            </select>
        </>
    );
};

//Validadcion de props
InputSelectThemes.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
    hackathonThemes: PropTypes.array.isRequired,
};

export default InputSelectThemes;
