//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:ACORDARSE DEL E.PREVENTDEFAULT
//TODO:AÑADIR LOS DE VACIAR CAMPOS
//TODO:AÑADIR QUE SI NO ES ADMIN NO PUEDA ENTRAR

//Importamoslas dependencias
import toast from 'react-hot-toast';

//Dependencia fecha
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
            formDataToSend.append('details', formData.themedetailsId);
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
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNjg4MDIwLCJleHAiOjE3NDEyOTI4MjB9.8mIR895iujfH1mCIJRiPxTcp7RwUX08S0FHDAzfrSyE',
                },
                body: formDataToSend,
            });
            const body = await res.json();

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
        }
    };
    console.log(formData);

    return (
        <>
            <h2>Formulario crear hackathon</h2>

            <form onSubmit={handleCreationHackathon}>
                {/* Input text del title */}
                <label htmlFor="title">Titulo</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChangeGeneral}
                    placeholder="escribe un titulo"
                    required
                    autoFocus
                />

                {/* Input textarea del summary */}
                <label htmlFor="summary">Descripcion del evento</label>
                <textarea
                    name="summary"
                    id="summary"
                    value={formData.summary}
                    onChange={handleChangeGeneral}
                    placeholder="escribe una breve descripcion del evento"
                    maxLength="140"
                    rows="3"
                    required
                />

                <fieldset>
                    <legend>Fecha y hora de inicio y finalizacion</legend>
                    {/* Input datepicker de la fecha de inicio */}

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
                    />

                    {/* Input datepicker de la fecha de finalizacion */}

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
                        required
                    />
                </fieldset>

                <fieldset>
                    <legend>Es online o presencial?</legend>

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
                </fieldset>
                {formData.type === 'presencial' && (
                    <>
                        {/* Input text de la localizacion */}
                        <label htmlFor="location">Localizacion</label>
                        <LocatioAutocomplete onSelect={handleChangeLocation} />
                    </>
                )}

                {/* Input hackathon detalis (para futuro html?) */}
                <label htmlFor="details">Detalles del hackathon</label>
                <DetailTextEditor onChange={handleChangeDetails} id="details" />

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
                {/* Input select que permite elegir los temas de un hackathon */}
                <label htmlFor="themeId">Selecciona una tematica</label>
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

                {/* Input select que permite elegir los lenguajes de un hackathon */}
                <label htmlFor="programmingLangId">
                    Selecciona los lenguajes
                </label>
                <select
                    value={formData.programmingLangId}
                    onChange={handleChangeProgrammingLangs}
                    multiple
                    size={10}
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
                <button type="submit" disabled={loading}>
                    Enviar
                </button>
            </form>
        </>
    );
};

export default NewHackathonPage;
