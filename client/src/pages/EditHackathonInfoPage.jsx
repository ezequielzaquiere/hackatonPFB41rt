//Importamoslas dependencias
import { useParams, Navigate, useNavigate } from 'react-router-dom';

//Imports de React
import { useState, useContext, useEffect } from 'react';

//Importamos los utils
import sendingHackathonInfo from '../utils/sendingHackathonInfo';

//Importamos el contexto
import { AuthContext } from '../contexts/AuthContext';

//Importamos los hooks
import useHackathonThemes from '../hooks/useHackathonThemes';
import useHackathonLangs from '../hooks/useHackathonLang';
import useHackathon from '../hooks/useHackathon';

// Importar componentes
import InputTitle from '../components/HackathonInfoInputs/InputTitle';
import InputSummary from '../components/HackathonInfoInputs/InputSummary';
import InputDateRange from '../components/HackathonInfoInputs/InputDateRange';
import InputRadioLocation from '../components/HackathonInfoInputs/InputRadioLocation';
import LocatioAutocomplete from '../components/HackathonInfoInputs/LocationAutocomplete';
import DetailTextEditor from '../components/HackathonInfoInputs/DetailsTextEditor';
import InputBannerUpload from '../components/HackathonInfoInputs/InputBannerUpload';
import InputDocumentUpload from '../components/HackathonInfoInputs/InputDocumentUpload';
import InputSelectThemes from '../components/HackathonInfoInputs/InputSelectThemes';
import ModalLang from '../components/HackathonInfoInputs/ModalLangs';

const EditHackathonPage = () => {
    let navigate = useNavigate();

    //Obtenemos el id del hackathon
    const { hackathonId } = useParams();

    //Obtenemos el token de autorizacion
    const { authToken, authUser } = useContext(AuthContext);

    //Obtenemos la info del hackathon a usar
    const { hackathon } = useHackathon(hackathonId);

    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        startingDate: null,
        deadline: null,
        type: '',
        location: '',
        themeId: '',
        programmingLangId: [],
        details: '',
        image: null,
        document: null,
    });

    //Hacemos un useEffect para que se actualce el fomrdat
    useEffect(() => {
        if (hackathon) {
            setFormData({
                title: hackathon.title || '',
                summary: hackathon.summary || '',
                startingDate: hackathon.startingDate || null,
                deadline: hackathon.deadline || null,
                type: hackathon.type || '',
                location: hackathon.location || '',
                themeId: hackathon.themeId || '',
                programmingLangId: hackathon.programmingLangIds || [],
                details: hackathon.details || '',
                image: hackathon.image || null,
                document: hackathon.document || null,
            });
        }
    }, [hackathon]);

    //Comprobamos si el boton se va a desactivar
    const isDisabled = formData.type === 'presencial' ? false : true;

    //Hook para obtener el listado de los hackathones
    const hackathonThemes = useHackathonThemes();

    //Hook para obtener los lenguajes de programacion
    const hackathonLangs = useHackathonLangs();

    //Funcion para manejar los cambios en general
    const handleChangeGeneral = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Funcion para manejar los cambios de hora
    const handleChangeDate = (field, date) => {
        setFormData({ ...formData, [field]: date });
    };

    //Funcion para manejar los cambios de imagen
    const handleChangeFiles = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    //Funcion apara manejar los cambios de location (le pasamos place porqur es lo que nos da el onSelect)
    const handleChangeLocation = (place) => {
        setFormData({ ...formData, location: place.display_name });
    };

    //Funcion para manejar el cambio en los detalles
    const handleChangeDetails = (html) => {
        setFormData({ ...formData, details: html });
    };

    //Creamos un state para controlar el abrir y cerrar del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Funcion que maneja los cambios de las checkboxes de los lenguajes se ejecuta cuando formData cambia
    let [selectedLangs, setSelectedLangs] = useState([]);
    useEffect(() => {
        setSelectedLangs(formData.programmingLangId || []);
    }, [formData.programmingLangId]);

    const handleChangeProgrammingLang = (e) => {
        const langId = Number(e.target.value);
        const isChecked = e.target.checked;

        setSelectedLangs((prevLangs) =>
            isChecked
                ? [...prevLangs, langId]
                : prevLangs.filter((id) => id !== langId)
        );
    };

    //Funcion que maneja el cierre del modal
    const handleCloseModal = () => {
        setFormData((prev) => ({
            ...prev,
            programmingLangId: selectedLangs,
        }));
        // Cierra el modal
        setIsModalOpen(false);
    };

    //Funcion que maneja el envio de formulario
    const [loading, setLoading] = useState(false);

    //Enviamos los datos del hackathon, en este caso post
    const handleSubmit = async (e) => {
        await sendingHackathonInfo({
            e,
            formData,
            selectedLangs,
            authToken,
            navigate,
            setLoading,
            hackathonId,
        });
    };

    //Si no esta logueado o no es adminvuelve a la main
    if (!authUser || authUser.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <main className="bg-[#191919] min-h-screen flex flex-col justify-center items-center px-2 sm:px-6 lg:px-24 py-10 lg:py-20">
                {/* Encabezado con título */}
                <h2 className="text-3xl text-center text-[#9A4EAE] mb-10">
                    ¡Edita el Hackathon!
                </h2>

                {/* Formulario */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#222] text-white p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-2xl lg:max-w-3xl flex flex-col gap-5"
                >
                    {/* Input Title */}
                    <InputTitle
                        formData={formData}
                        handleChangeGeneral={handleChangeGeneral}
                    />

                    {/* Input Summary */}
                    <InputSummary
                        formData={formData}
                        handleChangeGeneral={handleChangeGeneral}
                    />

                    {/* Input Date Range */}
                    <InputDateRange
                        formData={formData}
                        handleChangeDate={handleChangeDate}
                    />

                    {/* Input Select Themes */}
                    <InputSelectThemes
                        formData={formData}
                        handleChangeGeneral={handleChangeGeneral}
                        hackathonThemes={hackathonThemes}
                    />

                    {/* Modal para selección de lenguajes */}
                    <ModalLang
                        hackathonLangs={hackathonLangs || []}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        handleCloseModal={handleCloseModal}
                        handleChangeProgrammingLang={
                            handleChangeProgrammingLang
                        }
                        selectedLangs={selectedLangs || []}
                    />

                    {/* Radio para tipo de hackathon */}
                    <InputRadioLocation
                        formData={formData}
                        handleChangeGeneral={handleChangeGeneral}
                    />

                    {/* Input de ubicación */}
                    <LocatioAutocomplete
                        isDisabled={isDisabled}
                        onSelect={handleChangeLocation}
                        location={formData.location}
                    />

                    {/* Detalles del Hackathon */}
                    <fieldset className="mt-6">
                        <legend className="block mb-2 text-base lg:text-lg font-semibold text-white">
                            Detalles del Hackathon
                        </legend>
                        <DetailTextEditor
                            onChange={handleChangeDetails}
                            value={formData.details}
                            id="details"
                        />
                    </fieldset>

                    {/* Subida de imágenes */}
                    <InputBannerUpload
                        formData={formData}
                        handleChangeFiles={handleChangeFiles}
                    />

                    {/* Subida de documentos */}

                    <InputDocumentUpload
                        formData={formData}
                        handleChangeFiles={handleChangeFiles}
                    />

                    {/* Botón de Enviar */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-40 lg:w-48 px-4 py-3 lg:px-5 lg:py-4 my-4 font-semibold rounded-lg shadow-lg bg-[#7a3e8f] text-white hover:bg-[#9A4EAE] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] focus:ring-opacity-50"
                            disabled={loading}
                        >
                            Editar
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default EditHackathonPage;
