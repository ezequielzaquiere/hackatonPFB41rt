//Importar dependencias
import PropTypes from 'prop-types';

//Input radio de donde tendra lugar el evento
const InputRadioLocation = ({ formData, handleChangeGeneral }) => {
    return (
        <>
            <legend className="block mb-2 text-sm font-medium text-[#9A4EAE]">
                ¿Es online o presencial?
            </legend>

            <ul className="items-center w-full text-sm font-medium ">
                {/* Opción Online */}
                <li className="mb-2 bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]">
                    <label
                        htmlFor="online"
                        className="flex items-center w-full ps-3 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="type"
                            id="online"
                            value="online"
                            checked={formData.type === 'online'}
                            onChange={handleChangeGeneral}
                            required
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <span className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Online
                        </span>
                    </label>
                </li>

                {/* Opción Presencial */}
                <li className="mb-8 bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]">
                    <label
                        htmlFor="presencial"
                        className="flex items-center w-full ps-3 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="type"
                            id="presencial"
                            value="presencial"
                            checked={formData.type === 'presencial'}
                            onChange={handleChangeGeneral}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <span className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
