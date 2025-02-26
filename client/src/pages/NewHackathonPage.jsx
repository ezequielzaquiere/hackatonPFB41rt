//TODO:ELIMINAR LOS CONSOLE.LOG
//TODO:ACORDARSE DEL E.PREVENTDEFAULT
//TODO:AÑADIR LOS DE VACIAR CAMPOS

//Dependencia fecha
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours } from 'date-fns';
import { useState, useEffect } from 'react';

// Importar componentes
import LocatioAutocomplete from '../components/LocationAutocomplete';
import DetailTextEditor from '../components/DetailsTextEditor';

const NewHackathonPage = () => {
    const now = new Date();

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

    //Funcion para manejar los cambios en general
    const handleChangeGeneral = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Funcion que vacia los campos en general
    const clearGeneral = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Funcion para manejar los cambios de hora
    const handleChangeDate = (field, date) => {
        setFormData({ ...formData, [field]: date });
        console.log(formData);
    };

    //Funcion para manejar los cambios de imagen
    const clearImg = (e) => {
        setFormData({ ...formData, image: null });
    };

    //Funcion para vaciar el cmapo de las imagenes y documentos
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

    console.log(formData);

    return (
        <>
            <h2>Formulario crear hackathon</h2>

            <form>
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
            </form>
        </>
    );
};

export default NewHackathonPage;
