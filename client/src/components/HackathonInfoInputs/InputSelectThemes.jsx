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
            <legend className="block mb-2 text-base font-semibold text-white">
                Temática *
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
                className="w-full px-4 py-2 my-3 rounded-lg shadow-[6px_6px_5px_#191919] 
                bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none 
                focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50 
                appearance-none text-center"
            >
                <option
                    key=""
                    hidden
                    className="text-gray-500 text-center bg-[#222]"
                >
                    ▽ Selecciona una temática
                </option>
                {hackathonThemes.map((theme) => (
                    <option
                        key={theme.id}
                        value={theme.id}
                        className=" hover:bg-[#9A4EAE] hover:text-white"
                    >
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
    formData: PropTypes.object.isRequired,
    hackathonThemes: PropTypes.array.isRequired,
};

export default InputSelectThemes;
