//Importamos dependencias
import toast from 'react-hot-toast';
import { format } from 'date-fns';

//Importamos la direccionde la api
const { VITE_API_URL } = import.meta.env;

//Funcion que maneja el envio o modificacion de datos de un Hackathon
const sendingHackathonInfo = async ({
    e,
    formData,
    selectedLangs,
    authToken,
    navigate,
    setLoading,
    hackathonId,
}) => {
    let body;
    const isCreating = !hackathonId;

    try {
        e.preventDefault();

        //Creamos el formData para enviar
        const formDataToSend = new FormData();

        //Añadimos a formDataToSend los datos a enviar
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
            isCreating
                ? `${VITE_API_URL}/api/hackathon/new`
                : `${VITE_API_URL}/api/hackathon/${hackathonId}`,
            {
                method: isCreating ? 'post' : 'PATCH',
                headers: {
                    Authorization: authToken,
                },
                body: formDataToSend,
            }
        );
        body = await res.json();

        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
            throw new Error(body.message);
        }

        // Mostramos un mensaje al usuario indicando que todo ha ido bien.
        toast.success(body.message, {
            id: 'infoHackathon',
        });
    } catch (err) {
        toast.error(err.message, {
            id: 'infoHackathon',
        });
    } finally {
        setLoading(false);
        navigate(`/details/${body.data.id}`);
    }
};

export default sendingHackathonInfo;
