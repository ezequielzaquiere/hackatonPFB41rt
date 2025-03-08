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
                className="block mb-2 text-base font-semibold text-white"
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
                className="w-full px-4 py-2 my-3 rounded-lg  text-center shadow-[6px_6px_5px_#191919] bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50"
            >
                Selecciona los lenguajes
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
                    onClick={() => setIsModalOpen(false)} // Cierra al hacer clic fuera
                >
                    <div
                        className="bg-white rounded-lg shadow-sm w-full max-w-4xl mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Encabezado del modal */}
                        <div className="flex bg-[#191919] items-center justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-white">
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
                        <div className="flex justify-center bg-[#191919] max-h-screen overflow-hidden">
                            <div className="w-full p-4 max-h-[80vh] overflow-y-auto">
                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                                    {hackathonLangs.map((lang) => {
                                        const isChecked =
                                            selectedLangs.includes(lang.id);
                                        return (
                                            <li
                                                key={lang.id}
                                                className={`w-full border text-sm rounded-lg transition-all
                                                ${isChecked ? 'bg-[#9A4EAE] border-[#9A4EAE] text-white hover:bg-[#7A3E8F]' : 'bg-[#333] border border-[#9A4EAE] text-white hover:bg-[#444]'}
                                                p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE]`}
                                            >
                                                <label
                                                    htmlFor={
                                                        lang.programmingLang
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <article className="flex flex-col items-center justify-center p-2">
                                                        <header className="mb-2">
                                                            <img
                                                                src={`/src/assets/languages/${lang.programmingLang}.svg`}
                                                                alt={
                                                                    lang.programmingLang
                                                                }
                                                                className="w-17 h-17 object-contain"
                                                            />
                                                        </header>
                                                        <footer className="flex items-center justify-center w-full">
                                                            <span className="text-center text-sm">
                                                                {
                                                                    lang.programmingLang
                                                                }
                                                            </span>
                                                            <input
                                                                type="checkbox"
                                                                name={
                                                                    lang.programmingLang
                                                                }
                                                                id={
                                                                    lang.programmingLang
                                                                }
                                                                value={lang.id}
                                                                checked={
                                                                    isChecked
                                                                }
                                                                onChange={
                                                                    handleChangeProgrammingLang
                                                                }
                                                                className="hidden"
                                                            />
                                                        </footer>
                                                    </article>
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
