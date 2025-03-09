// Importar dependencias
import PropTypes from 'prop-types';

// Input radio de dónde tendrá lugar el evento
const InputRadioLocation = ({ formData, handleChangeGeneral }) => {
    return (
        <div className="flex flex-col gap-2">
            {/* Título */}
            <legend className="block text-base font-semibold text-white pt-4">
                ¿Es online o presencial? *
            </legend>

            <ul className="text-sm font-medium flex flex-col items-center gap-2">
                {/* Opción Online */}
                <li className="mb-2 flex-1">
                    <label
                        htmlFor="online"
                        className={`min-w-[250px] max-w-[250px] flex items-center justify-center w-full p-3 rounded-md cursor-pointer transition-all duration-300
                            ${
                                formData.type === 'online'
                                    ? 'bg-[#7A3E8F] text-white' // Seleccionado
                                    : 'bg-[#444] text-gray-300 hover:bg-[#9A4EAE] hover:text-white' // No seleccionado
                            }`}
                    >
                        <input
                            type="radio"
                            name="type"
                            id="online"
                            value="online"
                            checked={formData.type === 'online'}
                            onChange={handleChangeGeneral}
                            hidden
                        />
                        <span className="text-sm font-medium">Online</span>
                    </label>
                </li>

                {/* Opción Presencial */}
                <li className="flex-1 mb-5">
                    <label
                        htmlFor="presencial"
                        className={`min-w-[250px] max-w-[250px] flex items-center justify-center w-full p-3 rounded-md cursor-pointer transition-all duration-300
                            ${
                                formData.type === 'presencial'
                                    ? 'bg-[#7A3E8F] text-white' // Seleccionado
                                    : 'bg-[#444] text-gray-300 hover:bg-[#9A4EAE] hover:text-white' // No seleccionado
                            }`}
                    >
                        <input
                            type="radio"
                            name="type"
                            id="presencial"
                            value="presencial"
                            checked={formData.type === 'presencial'}
                            onChange={handleChangeGeneral}
                            hidden
                        />
                        <span className="text-sm font-medium">Presencial</span>
                    </label>
                </li>
            </ul>
        </div>
    );
};

// Validación de props
InputRadioLocation.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
};

export default InputRadioLocation;
