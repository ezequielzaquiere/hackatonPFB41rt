//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:AÑADIR LOS DE VACIAR CAMPOS
//TODO:AÑADIR QUE SI NO ES ADMIN NO PUEDA ENTRAR
//TODO:EDITAR EL CALENDARIO DE LA FECHA Y HORA
//Importamoslas dependencias
import toast from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';

//Dependencia fecha
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css';
import { addHours, format } from 'date-fns';

//Imports de React
import { useState, useContext } from 'react';

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

    //Funcion que maneja los cambios en el input programingLangs
    const handleChangeProgrammingLangs = (e) => {
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
    };

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
            formData.programmingLangId.forEach((lang) => {
                formDataToSend.append('programmingLangId', lang);
            });
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
                    Authorization: authToken,
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
                id: 'register',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'register',
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

                <form onSubmit={handleCreationHackathon}>
                    <div className="bg-black text-white flex flex-col gap-2">
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        ></textarea>

                        <fieldset>
                            <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Fecha y hora de inicio y finalizacion
                            </legend>

                            {/****************************************************
                             ****** Input datepicker de la fecha de inicio  ******
                             ****************************************************/}

                            <DatePicker
                                selectsStart
                                showTimeSelect
                                isClearable
                                minDate={addHours(now, 24)}
                                selected={formData.startingDate}
                                onChange={(date) => {
                                    handleChangeDate('startingDate', date);
                                }}
                                startDate={formData.startingDate}
                                dateFormat="dd-MM-yyyy HH:mm"
                                id="startingDate"
                                placeholderText="Fecha de inicio"
                                required
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                calendarClassName="bg-gray-700 text-white rounded-lg shadow-lg border border-gray-600"
                                popperClassName="z-50"
                            />

                            {/****************************************************
                             *** Input datepicker de la fecha de fnalizacion  ****
                             ****************************************************/}

                            <DatePicker
                                selectsEnd
                                showTimeSelect
                                isClearable
                                selected={formData.deadline}
                                onChange={(date) => {
                                    handleChangeDate('deadline', date);
                                }}
                                endDate={formData.deadline}
                                minDate={formData.startingDate}
                                placeholderText="Fecha de finalizacion"
                                dateFormat="dd-MM-yyyy HH:mm"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </fieldset>

                        <fieldset>
                            <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Es online o presencial?
                            </legend>

                            <div>
                                {/* Input radio del tipo de hackathon (presencial u online */}
                                <label htmlFor="type">Online</label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="type"
                                    value="online"
                                    checked={formData.type === 'online'}
                                    onChange={handleChangeGeneral}
                                />
                                <label htmlFor="type">Presencial</label>
                                <input
                                    type="radio"
                                    name="type"
                                    id="type"
                                    value="presencial"
                                    checked={formData.type === 'presencial'}
                                    onChange={handleChangeGeneral}
                                />
                            </div>
                            {/* Input text de la localizacion */}
                            <label htmlFor="location">Localizacion</label>
                            <LocatioAutocomplete
                                isDisabled={isDisabled}
                                onSelect={handleChangeLocation}
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset>
                            <legend>Detalles del Hackathon</legend>
                            {/* Input hackathon detalis (para futuro html?) */}
                            <label htmlFor="details" hidden>
                                Detalles del hackathon
                            </label>
                            <DetailTextEditor
                                onChange={handleChangeDetails}
                                id="details"
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Imagen del banner</legend>

                            {/* Input quer maneja la subida de imagenes */}
                            <label htmlFor="image"></label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChangeFiles}
                            />
                        </fieldset>

                        {/* Input que maneja la subida de documentos */}
                        <fieldset>
                            <legend>Documento de reglas</legend>

                            {/* Input quer maneja la subida de imagenes */}
                            <label htmlFor="image"></label>
                            <input
                                type="file"
                                name="document"
                                accept="application/pdf"
                                onChange={handleChangeFiles}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>Selecciona una tematica</legend>
                            {/* Input select que permite elegir los temas de un hackathon */}
                            <label htmlFor="themeId" hidden>
                                Selecciona una tematica
                            </label>
                            <select
                                value={formData.themeId}
                                onChange={handleChangeGeneral}
                                name="themeId"
                                id="themeId"
                                required
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
                        <fieldset>
                            <legend>
                                Selecciona un lenguaje de programacion
                            </legend>
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
                        </fieldset>
                        <button type="submit" disabled={loading}>
                            Enviar
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default NewHackathonPage;
