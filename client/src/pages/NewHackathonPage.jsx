//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:AÑADIR LOS DE VACIAR CAMPOS
//TODO:AÑADIR QUE SI NO ES ADMIN NO PUEDA ENTRAR
//TODO:EDITAR EL CALENDARIO DE LA FECHA Y HORA
//TODO:MIRARA PORQUE EL BORDE DEL INPUT ES AMARILLO SUPUESTAMENTE AUTOFILL PERO NO SE CAMBIA?
//TODO NO CONSIGO QUE ME FUNCIONE NINGUN HOVER
//Importamoslas dependencias
import toast from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';

//Dependencia fecha
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours, format } from 'date-fns';

//Imports de React
import { useState, useContext, useEffect } from 'react';

//Importamos la direccion de la api
const { VITE_API_URL } = import.meta.env;

//Importamos el contexto
import { AuthContext } from '../contexts/AuthContext';

//Importamos los hooks
import useHackathonThemes from '../hooks/useHackathonThemes';
import useHackathonLangs from '../hooks/useHackathonLang';

// Importar componentes
import LocatioAutocomplete from '../components/LocationAutocomplete';
import DetailTextEditor from '../components/DetailsTextEditor';

const NewHackathonPage = () => {
    const now = new Date();

    //Obtenemos el token de autorizacion
    const { authToken, authUser } = useContext(AuthContext);

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

    //Funcion que maneja los cambios de las checkboxes de los lenguajes
    let [selectedLangs, setSelectedLangs] = useState([]);
    useEffect(() => {
        setSelectedLangs(formData.programmingLangId || []);
    }, [formData.programmingLangId]); // Se ejecuta cuando `formData` cambia

    const handleChangeProgrammingLang = (e) => {
        const langId = Number(e.target.value); // Asegura que el ID es un número
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
            programmingLangId: selectedLangs, // Actualiza el formData con los lenguajes seleccionados
        }));
        setIsModalOpen(false); // Cierra el modal
    };

    //Funcion que maneja los cambios en el input programingLangs
    /*const handleChangeProgrammingLangs = (e) => {
        const programmingLangsSelected = Array.from(
            e.target.selectedOptions,
            (option) => {
                return Number(option.value);
            }
        );
        //Tiene que ser asi porque si no no se actualiza bien el array
        setFormData((formData) => ({
            ...formData,
            programmingLangId: programmingLangsSelected,
        }));
    };*/

    //Funcion que maneja el envio de formulario
    const [loading, setLoading] = useState(false);

    const handleCreationHackathon = async (e) => {
        let body;
        try {
            e.preventDefault();

            //Creamos el formData para enviar
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('summary', formData.summary);
            formDataToSend.append(
                'startingDate',
                format(formData.startingDate, 'yyyy-MM-dd HH:mm:ss')
            );
            formDataToSend.append(
                'deadline',
                format(formData.deadline, 'yyyy-MM-dd HH:mm:ss')
            );
            formDataToSend.append('type', formData.type);
            if (formData.type === 'presencial') {
                formDataToSend.append('location', formData.location);
            }
            formDataToSend.append('themeId', formData.themeId);
            selectedLangs.forEach((lang) => {
                formDataToSend.append('programmingLangId', lang);
            });
            /*formData.programmingLangId.forEach((lang) => {
                formDataToSend.append('programmingLangId', lang);
            });*/
            formDataToSend.append('details', formData.details);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }
            if (formData.document) {
                formDataToSend.append('document', formData.document);
            }

            //Comenzamos con el envio al backend
            setLoading(true);

            const res = await fetch(`${VITE_API_URL}/api/hackathon/new`, {
                method: 'post',
                headers: {
                    Authorization:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQxMDMwMjE3LCJleHAiOjE3NDE2MzUwMTd9.-5Yxppcjd0GXXLCs0q3-Ciz3oL1I26UTm4N2cW2535U',
                },
                body: formDataToSend,
            });
            body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Mostramos un mensaje al usuario indicando que todo ha ido bien.
            toast.success(body.message, {
                id: 'createHackathon',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'createHackathon',
            });
        } finally {
            setLoading(false);
            navigate(`/details/${body.data.id}`);
        }
    };
    console.log(formData);

    //Si no esta logueado vuelve a la main
    /*if (!authUser) {
        return <Navigate to="/" />;
    }*/

    return (
        <>
            <main className="container 2xl">
                <h2>Formulario crear hackathon</h2>
                {/*"dark:bg-black"*/}
                <form onSubmit={handleCreationHackathon} className="bg-white">
                    {/**************************************
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
                    {/* Input select que permite elegir los lenguajes de un hackathon */}
                    {/*<fieldset>
                        <legend>Selecciona un lenguaje de programacion</legend>
                        <label htmlFor="programmingLangId" hidden>
                            Selecciona los lenguajes
                        </label>
                        <select
                            value={formData.programmingLangId}
                            onChange={handleChangeProgrammingLangs}
                            multiple
                            size={5}
                            name="programmingLangId"
                            id="programmingLangId"
                            required
                        >
                            <option key="" hidden>
                                --Elige lenguajes--
                            </option>
                            {hackathonLangs.map((lang) => (
                                <option key={lang.id} value={lang.id}>
                                    {lang.programmingLang}
                                </option>
                            ))}
                        </select>
                    </fieldset>*/}
                    {/***********************************
                     *********** MODAL ******************
                     ************************************/}
                    <div>
                        {/* Botón para abrir el modal */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
                                    onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
                                >
                                    {/* Encabezado del modal */}
                                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Elige un lenguaje
                                        </h3>
                                        <button
                                            onClick={handleCloseModal}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 sm:w-10 sm:h-10 inline-flex justify-center items-center"
                                        >
                                            &times;
                                        </button>
                                    </div>

                                    {/* Cuerpo del modal */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {hackathonLangs.map((lang) => {
                                            return (
                                                <div
                                                    key={lang.id}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <label
                                                        htmlFor={
                                                            lang.programmingLang
                                                        }
                                                        className="text-sm sm:text-base font-medium text-gray-900"
                                                    >
                                                        {lang.programmingLang}
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name={
                                                            lang.programmingLang
                                                        }
                                                        id={
                                                            lang.programmingLang
                                                        }
                                                        value={lang.id}
                                                        checked={selectedLangs.includes(
                                                            lang.id
                                                        )} // Verifica si el ID está en el estado
                                                        onChange={
                                                            handleChangeProgrammingLang
                                                        } // Maneja los cambios
                                                        className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <button type="submit" disabled={loading}>
                        Enviar
                    </button>
                </form>
            </main>
        </>
    );
};

export default NewHackathonPage;
