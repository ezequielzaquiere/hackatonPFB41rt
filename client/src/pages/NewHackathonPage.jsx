//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:AÑADIR LOS DE VACIAR CAMPOS?
//TODO:MIRARA PORQUE EL BORDE DEL INPUT ES AMARILLO SUPUESTAMENTE AUTOFILL PERO NO SE CAMBIA?
//TODO:AÑADIR QUE SI NO ES ADMIN NO PUEDA ENTRAR ? CREO QUE ESTA?
//TODO PROBAR SI SOLO EL ADMIN PUEDE ENTRAR
//TODO: PORQUE NO ME SALE EL TOAST
//TODO: PUEDE SALIR EL TOAST DE UNA PAGINA A OTRA
//TODO AÑADIR A LOS LENGUAJES LO DE QUESE VEAN EN EL BOTON

//Importamoslas dependencias

import { useNavigate, Navigate, useLocation } from 'react-router-dom';

//Dependencia fecha

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

const NewHackathonPage = () => {
    //Obtenemos el token de autorizacion
    const { authToken, authUser } = useContext(AuthContext);
    console.log(authUser);
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

    //Obtenemos el id si existe
    const location = useLocation();

    const hackathonId = location.state?.hackathonId || null;

    //Si existe el hackathonId obtenemos los datos d eese hackathon

    const { hackathon } = useHackathon(hackathonId);
    console.log(hackathon);
    //Si venimos para crear un hackatghon nuevo con datos de otro
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
    //Obtenemos la funcion navigate
    let navigate = useNavigate();

    //Creamos un state para controlar el abrir y cerrar del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        console.log(formData);
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

    console.log(formData);

    //Enviamos los datos del hackathon, en este caso post
    const handleSubmit = async (e) => {
        await sendingHackathonInfo({
            e,
            formData,
            selectedLangs,
            authToken,
            navigate,
            setLoading,
        });
    };
    //Si no esta logueado o no es adminvuelve a la main
    if (!authUser || authUser.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <>
            <main className="bg-[#191919] min-h-screen flex flex-col justify-center items-center px-4 md:px-4 lg:px-6 py-10 text-sm md:text-base">
                <div className="flex items-center justify-center gap-4">
                    {/* Imagen de la izquierda */}
                    <img
                        src="/HomePageGraphism1.png"
                        alt="Adorno del título Crear Hackathon"
                        className="max-w-30 pt-2 pb-5 md:max-w-40"
                    />

                    {/* Título */}
                    <h2 className="text-2xl md:text-3xl  text-center text-[#9A4EAE] mb-6 md:mb-8 lg:mb-10">
                        Crea tu Hackathon
                    </h2>

                    {/* Imagen de la derecha */}
                    <img
                        src="/InvertedHomePageGraphism1.png"
                        alt="Adorno del título Crear Hackathon"
                        className="max-w-30 pt-2 pb-5 md:max-w-40"
                    />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#222] text-white p-4 md:p-4 lg:p-6 rounded-lg shadow-lg w-full max-w-full md:max-w-2xl flex flex-col gap-4"
                >
                    {/***************************************
                     ********* Input text del title *********
                     ****************************************/}
                    <InputTitle
                        formData={formData}
                        handleChangeGeneral={handleChangeGeneral}
                    />
                    {/***************************************
                     ****** Input textarea del summary ******
                     ****************************************/}
                    <InputSummary
                        formData={formData}
                        handleChangeGeneral={handleChangeGeneral}
                    />

                    {/*****************************************************
                     ****** Input daterange de inicio y finalizacion ******
                     ******************************************************/}
                    <InputDateRange
                        formData={formData}
                        handleChangeDate={handleChangeDate}
                    />

                    {/********************************************************************
                     ***** Input select que permite elegir los temas de un hackathon  ****
                     *********************************************************************/}
                    <fieldset>
                        <InputSelectThemes
                            formData={formData}
                            handleChangeGeneral={handleChangeGeneral}
                            hackathonThemes={hackathonThemes}
                        />
                    </fieldset>

                    {/*******************************************************************
                     *********** MODAL Input para elegir el lenguaje/s ******************
                     ******************************************************************/}
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

                    <fieldset>
                        {/****************************************************************
                         *** Input radio del tipo de hackathon (presencial u online)  ****
                         *****************************************************************/}
                        <InputRadioLocation
                            formData={formData}
                            handleChangeGeneral={handleChangeGeneral}
                        />

                        {/*************************************
                         *** Input text de la localizacion ****
                         **************************************/}

                        <LocatioAutocomplete
                            isDisabled={isDisabled}
                            onSelect={handleChangeLocation}
                            location={formData.location}
                        />
                    </fieldset>
                    {/***************************************************
                     *** Input hackathon detalis (para futuro html?) ****
                     ****************************************************/}
                    <fieldset className="mt-8">
                        <legend className="block mb-2 text-sm font-medium text-[#9A4EAE]">
                            Detalles del Hackathon
                        </legend>
                        <label htmlFor="details" className="hidden">
                            Detalles del hackathon
                        </label>
                        <DetailTextEditor
                            onChange={handleChangeDetails}
                            value={formData.details}
                            id="details"
                        />
                    </fieldset>
                    {/***************************************************
                     ***** Input quer maneja la subida de imagenes  *****
                     ****************************************************/}
                    <fieldset className="mb-4">
                        <InputBannerUpload
                            formData={formData}
                            handleChangeFiles={handleChangeFiles}
                        />
                    </fieldset>
                    {/***************************************************
                     ***** Input que maneja la subida de documentos  ****
                     ****************************************************/}
                    <fieldset className="mb-4">
                        <InputDocumentUpload
                            formData={formData}
                            handleChangeFiles={handleChangeFiles}
                        />
                    </fieldset>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-40 mt-15 px-4 py-2 my-3 font-semibold rounded-lg shadow-[6px_6px_5px_#191919] bg-[#9A4EAE] text-white hover:bg-[#7A3E8F] focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] focus:ring-opacity-50"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default NewHackathonPage;
