//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:AÑADIR LOS DE VACIAR CAMPOS
//TODO:AÑADIR QUE SI NO ES ADMIN NO PUEDA ENTRAR
//TODO EVITAR QUE PUEDA EDITAR EL HACKATHON SI YA HA PASADO LA FECHA
//Importamoslas dependencias
import toast from 'react-hot-toast';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

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
import useHackathon from '../hooks/useHackathon';

// Importar componentes
import LocatioAutocomplete from '../components/LocationAutocomplete';
import DetailTextEditor from '../components/DetailsTextEditor';

const EditHackathonPage = () => {
    const now = new Date();
    let navigate = useNavigate();

    //Obtenemos el id del hackathon
    const { hackathonId } = useParams();

    //Obtenemos el token de autorizacion
    const { authToken, authUser } = useContext(AuthContext);

    //Obtenemos la info del hackathon a usar
    const { hackathon } = useHackathon(hackathonId);

    //Si no existe devolvemos a la pagina principal
    if (!hackathon) {
        navigate('/');
    }

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
            formDataToSend.append('details', formData.details);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }
            if (formData.document) {
                formDataToSend.append('document', formData.document);
            }

            //Comenzamos con el envio al backend
            setLoading(true);

            const res = await fetch(
                `${VITE_API_URL}/api/hackathon/${hackathonId}`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwNjg4MDIwLCJleHAiOjE3NDEyOTI4MjB9.8mIR895iujfH1mCIJRiPxTcp7RwUX08S0FHDAzfrSyE',
                    },
                    body: formDataToSend,
                }
            );
            const body = await res.json();

            if (body) {
                // Mostramos un mensaje al usuario indicando que todo ha ido bien.
                toast.success(body.message, {
                    id: 'register',
                });
            }

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }
        } catch (err) {
            toast.error(err.message, {
                id: 'register',
            });
        } finally {
            setLoading(false);
            navigate(`/details/${hackathonId}`);
        }
    };
    console.log(formData);

    /*if (!authUser) {
        return <Navigate to="/" />;
    }*/

    return (
        <>
            <main className="container 2xl">
                <h2>Formulario crear hackathon</h2>

                <form onSubmit={handleCreationHackathon}>
                    <div className="bg-black text-white flex flex-col gap-2">
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
                            <legend>
                                Fecha y hora de inicio y finalizacion
                            </legend>
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
                            {/* Input text de la localizacion */}
                            <label htmlFor="location">Localizacion</label>
                            <LocatioAutocomplete
                                isDisabled={isDisabled}
                                onSelect={handleChangeLocation}
                                location={formData.location}
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
                                value={formData.details}
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

export default EditHackathonPage;
