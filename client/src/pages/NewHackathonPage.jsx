//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:AÑADIR LOS DE VACIAR CAMPOS?
//TODO:MIRARA PORQUE EL BORDE DEL INPUT ES AMARILLO SUPUESTAMENTE AUTOFILL PERO NO SE CAMBIA?
//TODO:AÑADIR QUE SI NO ES ADMIN NO PUEDA ENTRAR ? CREO QUE ESTA?
//TODO PROBAR SI SOLO EL ADMIN PUEDE ENTRAR
//TODO: PORQUE NO ME SALE EL TOAST
//TODO: PUEDE SALIR EL TOAST DE UNA PAGINA A OTRA
//TODO:PREGUNTAR SI HACER EL OTRO SELECT OTRO MODAL
//TODO AÑADIR A LOS LENGUAJES LO DE QUESE VEAN EN EL BOTON

//Importamoslas dependencias

import { useNavigate, Navigate } from 'react-router-dom';

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
    console.log(formData.startingDate);

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
            <main className=" bg-[#191919] text-[#9A4EAE] w-screen p-10">
                <h2 className="text-xl mb-4">Crea tu hackathon</h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#191919] flex flex-col justify-center gap-2 my-6"
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
                        />
                    </fieldset>
                    {/***************************************************
                     *** Input hackathon detalis (para futuro html?) ****
                     ****************************************************/}
                    <fieldset className="mt-8">
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Detalles del Hackathon
                        </legend>
                        <label htmlFor="details" hidden>
                            Detalles del hackathon
                        </label>
                        <DetailTextEditor
                            onChange={handleChangeDetails}
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
