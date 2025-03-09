//Importar dependencias
import PropTypes from 'prop-types';

//Input select de las tematicas de un hackathon
const InputSelectThemes = ({
    formData,
    handleChangeGeneral,
    hackathonThemes,
}) => {
    return (
        <div className="mb-5">
            {/* Etiqueta */}
            <legend className="block text-base font-semibold text-white">
                Temática *
            </legend>

            <label htmlFor="themeId" hidden>
                Selecciona una temática
            </label>

            <div className="flex justify-center">
                <select
                    value={formData.themeId}
                    onChange={handleChangeGeneral}
                    name="themeId"
                    id="themeId"
                    required
                    className="hover:scale-105 transition focus:bg-[#7A3E8F] w-full px-4 py-2 my-3 
                    rounded-lg shadow-[6px_6px_5px_#191919] bg-[#7a3e8f] text-white 
                    hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] 
                    focus:ring-opacity-50 text-center"
                >
                    {/* Opción por defecto (deshabilitada para que no se seleccione) */}
                    <option
                        value=""
                        disabled
                        selected={!formData.themeId}
                        className="w-full text-center bg-[#222]"
                    >
                        Selecciona una temática
                    </option>

                    {/* Opciones dinámicas */}
                    {hackathonThemes.map((theme) => (
                        <option
                            key={theme.id}
                            value={theme.id}
                            className="hover:bg-[#9a4eae]"
                        >
                            {theme.theme}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

//Validadcion de props
InputSelectThemes.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    hackathonThemes: PropTypes.array.isRequired,
};

export default InputSelectThemes;
