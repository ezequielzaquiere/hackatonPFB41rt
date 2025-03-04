//Importar dependencias
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

//Modal que permite selccionar los programingLangs
const ModalLang = ({
    hackathonLangs,
    isModalOpen,
    setIsModalOpen,
    handleCloseModal,
    handleChangeProgrammingLang,
    selectedLangs,
}) => {
    return (
        <div className="w-full">
            <label
                htmlFor="modal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Selecciona uno o varios lenguajes
            </label>
            {/* Botón para abrir el modal */}
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                }}
                className="flex w-full items-center justify-center px-4 py-2 text-white 
                                bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg cursor-pointer 
                                focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
            >
                Elige los lenguajes
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
                    onClick={() => setIsModalOpen(false)} // Cierra al hacer clic fuera
                >
                    <div
                        className="bg-white rounded-lg shadow-sm w-full max-w-4xl mx-4"
                        onClick={(e) => e.stopPropagation()} //
                    >
                        {/* Encabezado del modal */}
                        <div className="flex bg-[#191919] items-center justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Elige un lenguaje
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 sm:w-10 sm:h-10 inline-flex justify-center items-center"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="flex justify-center bg-[#191919]">
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 w-full p-4">
                                {hackathonLangs.map((lang) => {
                                    const isChecked = selectedLangs.includes(
                                        lang.id
                                    );
                                    return (
                                        <li
                                            key={lang.id}
                                            className={`w-full border text-sm rounded-lg transition-all
                                                                    ${
                                                                        isChecked
                                                                            ? 'bg-blue-100 border-blue-500 text-blue-900 dark:bg-blue-900 dark:border-blue-400 dark:text-white'
                                                                            : 'bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                                                    }
                                                                    hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-blue-500 focus:border-blue-500`}
                                        >
                                            <label
                                                htmlFor={lang.programmingLang}
                                                className="w-full h-full flex items-center justify-between cursor-pointer p-2"
                                            >
                                                {lang.programmingLang}
                                                <input
                                                    type="checkbox"
                                                    name={lang.programmingLang}
                                                    id={lang.programmingLang}
                                                    value={lang.id}
                                                    checked={isChecked}
                                                    onChange={
                                                        handleChangeProgrammingLang
                                                    }
                                                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-transparent border-gray-300 rounded 
                                                                focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                                />
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

//Validadcion de props
ModalLang.propTypes = {
    setIsModalOpen: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    hackathonLangs: PropTypes.array.isRequired,
    handleChangeProgrammingLang: PropTypes.func.isRequired,
    selectedLangs: PropTypes.array.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default ModalLang;
