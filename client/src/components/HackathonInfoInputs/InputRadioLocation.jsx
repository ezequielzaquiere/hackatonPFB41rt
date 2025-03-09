//Importar dependencias
import PropTypes from 'prop-types';

//Input radio de donde tendra lugar el evento
const InputRadioLocation = ({ formData, handleChangeGeneral }) => {
    return (
        <div className="flex flex-col gap-2">
            <legend className="block text-base font-semibold text-white pt-4">
                ¿Es online o presencial? *
            </legend>

            <ul className="w-full text-sm font-medium flex flex-col md:flex-row gap-1">
                <div className="flex gap-2 mb-5">
                    {/* Opción Online */}
                    <li className=" bg-[#7a3e8f] flex-1  text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] transition hover:scale-105 hover:bg-[#9A4EAE]">
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
                                hidden
                                className="w-4 h-4 text-blue-600  focus:ring-0 bg-gray-600 "
                            />
                            <span
                                className={`w-full py-3 text-sm font-medium ${formData.type === 'online' ? 'text-white bg-[#7a3e8f] hover:bg-[#9A4EAE]' : 'text-gray-300 '} rounded-md flex justify-center items-center transition-all duration-200`}
                            >
                                Online
                            </span>
                        </label>
                    </li>

                    {/* Opción Presencial */}
                    <li className=" bg-[#7a3e8f] hover:bg-[#9A4EAE] flex-1  text-white p-1 rounded-md transition hover:scale-105 ">
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
                                className="w-5 h-5  rounded-full bg-white focus:outline-none checked:bg-green-500 checked:border-green-500 relative"
                            />
                            <span
                                className={`w-full py-3 text-sm font-medium ${formData.type === 'presencial' ? 'text-white bg-[#7a3e8f] hover:bg-[#9A4EAE]' : 'text-gray-300 '} rounded-md flex justify-center items-center transition-all duration-200`}
                            >
                                Presencial
                            </span>
                        </label>
                    </li>
                </div>
            </ul>
        </div>
    );
};

//Validadcion de props
InputRadioLocation.propTypes = {
    handleChangeGeneral: PropTypes.func.isRequired,
    formData: PropTypes.array.isRequired,
};

export default InputRadioLocation;
