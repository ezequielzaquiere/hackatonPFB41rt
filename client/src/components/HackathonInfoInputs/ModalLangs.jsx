// Importar dependencias
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

// Modal que permite seleccionar los lenguajes de programación
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
            {/* Etiqueta */}
            <label
                htmlFor="modal"
                className="block text-base font-semibold text-white"
            >
                Lenguaje | Lenguajes *
            </label>

            {/* Botón para abrir el modal */}
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                }}
                className="hover:scale-105 transition w-full py-2 my-3 rounded-lg text-center shadow-lg bg-[#7a3e8f] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] focus:ring-opacity-50"
            >
                Selecciona los lenguajes
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-[#191919] bg-opacity-50 p-4"
                    onClick={() => setIsModalOpen(false)} // Cierra al hacer clic fuera
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-lg lg:max-w-4xl mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Encabezado del modal */}
                        <div className="flex bg-[#242424] items-center justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-white">
                                Elige un lenguaje
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="flex justify-center bg-[#242424] max-h-screen overflow-hidden">
                            <div className="w-full p-4 max-h-[80vh] overflow-y-auto">
                                <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                    {hackathonLangs.map((lang) => {
                                        const isChecked =
                                            selectedLangs.includes(lang.id);
                                        return (
                                            <li
                                                key={lang.id}
                                                className={`hover:scale-105 w-full border text-sm rounded-lg transition-all duration-300
                                                ${isChecked ? 'bg-[#7a3e8f] border-[#7a3e8f] text-white' : 'bg-[#242424] border border-[#7a3e8f] text-white hover:bg-[#444]'}
                                                p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f]`}
                                            >
                                                <label
                                                    htmlFor={
                                                        lang.programmingLang
                                                    }
                                                    className="cursor-pointer flex flex-col items-center justify-center p-2"
                                                >
                                                    {/* Icono ajustado para mobile y `lg` */}
                                                    <img
                                                        src={`/src/assets/languages/${lang.programmingLang}.svg`}
                                                        alt={
                                                            lang.programmingLang
                                                        }
                                                        className="w-12 h-12 object-contain lg:w-16 lg:h-16"
                                                    />

                                                    {/* Nombre del lenguaje */}
                                                    <span className="text-center text-sm">
                                                        {lang.programmingLang}
                                                    </span>

                                                    {/* Checkbox oculto */}
                                                    <input
                                                        type="checkbox"
                                                        name={
                                                            lang.programmingLang
                                                        }
                                                        id={
                                                            lang.programmingLang
                                                        }
                                                        value={lang.id}
                                                        checked={isChecked}
                                                        onChange={
                                                            handleChangeProgrammingLang
                                                        }
                                                        className="hidden"
                                                    />
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Validación de props
ModalLang.propTypes = {
    setIsModalOpen: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    hackathonLangs: PropTypes.array.isRequired,
    handleChangeProgrammingLang: PropTypes.func.isRequired,
    selectedLangs: PropTypes.array.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default ModalLang;
