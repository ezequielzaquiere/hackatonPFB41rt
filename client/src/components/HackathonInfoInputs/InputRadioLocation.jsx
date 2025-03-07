//Importar dependencias
import PropTypes from 'prop-types';

//Input radio de donde tendra lugar el evento
const InputRadioLocation = ({ formData, handleChangeGeneral }) => {
    return (
        <>
            <legend className="block mb-2 text-base font-semibold text-white pt-4">
                ¿Es online o presencial? *
            </legend>

            <ul className="w-full text-sm font-medium flex flex-col md:flex-row gap-1">
                {/* Opción Online */}
                <li className="mb-2 bg-[#333] border flex-1 border-[#9A4EAE] text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]">
                    <label
                        htmlFor="online"
                        className="flex items-center w-full cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="type"
                            id="online"
                            value="online"
                            checked={formData.type === 'online'}
                            onChange={handleChangeGeneral}
                            required
                            hidden
                            className="w-4 h-4 text-blue-600  focus:ring-0 bg-gray-600 "
                        />
                        <span
                            className={`w-full py-3 text-sm font-medium box-border border-2 ${formData.type === 'online' ? 'text-white bg-[#9A4EAE] border-[#9A4EAE]' : 'text-gray-300 border-transparent'} rounded-md flex justify-center items-center transition-all duration-200`}
                        >
                            Online
                        </span>
                    </label>
                </li>

                {/* Opción Presencial */}
                <li className="mb-2 bg-[#333] flex-1 border border-[#9A4EAE] text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]">
                    <label
                        htmlFor="presencial"
                        className="flex items-center w-full cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="type"
                            id="presencial"
                            value="presencial"
                            checked={formData.type === 'presencial'}
                            onChange={handleChangeGeneral}
                            hidden
                            className="w-5 h-5 border-2 border-gray-400 rounded-full bg-white focus:outline-none checked:bg-green-500 checked:border-green-500 relative"
                        />
                        <span
                            className={`w-full py-3 text-sm font-medium box-border border-2 ${formData.type === 'presencial' ? 'text-white bg-[#9A4EAE] border-[#9A4EAE]' : 'text-gray-300 border-transparent'} rounded-md flex justify-center items-center transition-all duration-200`}
                        >
                            Presencial
                        </span>
                    </label>
                </li>
            </ul>
        </>
    );
};

//Validadcion de props
InputRadioLocation.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};

export default InputRadioLocation;
