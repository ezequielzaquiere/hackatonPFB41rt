//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:AÑADIR LOS DE VACIAR CAMPOS?
//TODO:EDITAR EL CALENDARIO DE LA FECHA Y HORA ? CREO QUE NO SE PUEDE?
//TODO:MIRARA PORQUE EL BORDE DEL INPUT ES AMARILLO SUPUESTAMENTE AUTOFILL PERO NO SE CAMBIA?
//TODO:AÑADIR QUE SI NO ES ADMIN NO PUEDA ENTRAR ? CREO QUE ESTA?
//TODO PROBAR SI SOLO EL ADMIN PUEDE ENTRAR
//TODO: PORQUE NO ME SALE EL TOAST
//TODO: PUEDE SALIR EL TOAST DE UNA PAGINA A OTRA
//TODO:PREGUNTAR SI HACER EL OTRO SELECT OTRO MODAL

//Importamoslas dependencias

import { useNavigate, Navigate } from 'react-router-dom';

//Dependencia fecha
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours } from 'date-fns';

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
import LocatioAutocomplete from '../components/LocationAutocomplete';
import DetailTextEditor from '../components/DetailsTextEditor';
import ModalLang from '../components/ModalLangs';

const NewHackathonPage = () => {
    const now = new Date();

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
        console.log(files[0]);
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
            <main className=" bg-[#191919]">
                <h2>Formulario crear hackathon</h2>

                <form onSubmit={handleSubmit} className="bg-[#191919]">
                    {/***************************************
                     ********* Input text del title *********
                     ****************************************/}
                    <div className="mb-6">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Titulo
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChangeGeneral}
                            required
                            placeholder="Aqui va el título"
                            autoFocus
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 dark:autofill:focus:border-blue-500 autofill:focus:border-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/**************************************
                     ****** Input textarea del summary ******
                     ****************************************/}
                    <label
                        htmlFor="summary"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Descripcion del evento
                    </label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChangeGeneral}
                        placeholder="Una breve descripcion del evento..."
                        maxLength="140"
                        rows="4"
                        required
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:autofill:focus:border-blue-500 autofill:focus:border-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                    <fieldset>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fecha y hora de inicio y finalizacion
                        </legend>

                        {/****************************************************
                         ****** Input datepicker de la fecha de inicio  ******
                         ****************************************************/}

                        {/** SI DA ERROR ES QUE FALTAN LAS HORAS Y CAMBIAR EL FORMATO PARA INCLUIRLAS */}
                        <DatePicker
                            selectsStart
                            isClearable
                            minDate={addHours(now, 24)}
                            selected={formData.startingDate}
                            onChange={(date) => {
                                handleChangeDate('startingDate', date);
                            }}
                            startDate={formData.startingDate}
                            dateFormat="dd-MM-yyyy"
                            id="startingDate"
                            placeholderText="Fecha de inicio"
                            openToDate={now}
                            required
                            withPortal
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            wrapperClassName="w-full"
                            popperClassName="responsive-datepicker"
                            calendarClassName="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />

                        {/****************************************************
                         *** Input datepicker de la fecha de fnalizacion  ****
                         ****************************************************/}

                        <DatePicker
                            selectsEnd
                            isClearable
                            selected={formData.deadline}
                            onChange={(date) => {
                                handleChangeDate('deadline', date);
                            }}
                            endDate={formData.deadline}
                            minDate={formData.startingDate}
                            placeholderText="Fecha de finalizacion"
                            dateFormat="dd-MM-yyyy"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:autofill:focus:border-blue-500 autofill:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            openToDate={
                                formData.startingDate
                                    ? formData.startingDate
                                    : now
                            }
                            popperClassName="responsive-datepicker"
                            withPortal
                        />
                    </fieldset>
                    <fieldset>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Es online o presencial?
                        </legend>

                        {/****************************************************************
                         *** Input radio del tipo de hackathon (presencial u online)  ****
                         *****************************************************************/}
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {/* Opción Online */}
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
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
                            <li className="w-full dark:border-gray-600">
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
                        {/*************************************
                         *** Input text de la localizacion ****
                         **************************************/}
                        <label
                            htmlFor="location"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Localizacion
                        </label>
                        <LocatioAutocomplete
                            isDisabled={isDisabled}
                            onSelect={handleChangeLocation}
                        />
                    </fieldset>
                    {/***************************************************
                     *** Input hackathon detalis (para futuro html?) ****
                     ****************************************************/}
                    <fieldset>
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
                    <fieldset>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Imagen del banner
                        </legend>

                        <label
                            htmlFor="image"
                            className="group flex items-center justify-center px-4 py-2 text-white 
                                bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg cursor-pointer 
                                focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
                        >
                            {formData.image
                                ? formData.image.name
                                : 'Elige una imagen'}
                        </label>

                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChangeFiles}
                            className="hidden"
                        />
                    </fieldset>
                    {/***************************************************
                     ***** Input que maneja la subida de documentos  ****
                     ****************************************************/}
                    <fieldset>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Documento de reglas
                        </legend>

                        <label
                            htmlFor="file"
                            className="group flex items-center justify-center px-4 py-2 text-white 
                                bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg cursor-pointer 
                                focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
                        >
                            {formData.document
                                ? formData.document.name
                                : 'Elige un documento'}
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="document"
                            accept=".pdf,application/pdf"
                            onChange={handleChangeFiles}
                            className="hidden"
                        />
                    </fieldset>
                    {/********************************************************************
                     ***** Input select que permite elegir los temas de un hackathon  ****
                     *********************************************************************/}
                    <fieldset>
                        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Selecciona una tematica
                        </legend>
                        <label htmlFor="themeId" hidden>
                            Selecciona una tematica
                        </label>
                        <select
                            value={formData.themeId}
                            onChange={handleChangeGeneral}
                            name="themeId"
                            id="themeId"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option key="" selected hidden>
                                --Selecciona una opcion--
                            </option>
                            {hackathonThemes.map((theme) => (
                                <option key={theme.id} value={theme.id}>
                                    {theme.theme}
                                </option>
                            ))}
                        </select>
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

                    <button type="submit" disabled={loading}>
                        Enviar
                    </button>
                </form>
            </main>
        </>
    );
};

export default NewHackathonPage;
