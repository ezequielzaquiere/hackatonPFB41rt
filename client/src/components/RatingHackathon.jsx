// Dependencia que valida las props.
import PropTypes from 'prop-types';

// Hooks.
import { useState } from 'react';

// Función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';

// Obtenemos las variables de entorno necesarias.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const RatingHackathon = ({
    updateRatingHackathonState,
    hackathonId,
    authToken,
    loading,
    setLoading,
}) => {
    // Declaramos en el State una variable para almacenar el valor del input.
    const [rating, setRating] = useState('');

    // Función que maneja el envío del formulario.
    const handleAddRating = async (e) => {
        try {
            // Comprobamos que la opción seleccionada sea válida.
            if (rating > 0 && rating < 6) {
                e.preventDefault();
                setLoading(true);

                // Obtenemos una respuesta.
                const res = await fetch(
                    `${VITE_API_URL}/api/hackathon/${hackathonId}/ratings`,
                    {
                        method: 'post',
                        headers: {
                            Authorization: authToken,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            value: rating,
                        }),
                    }
                );

                // Obtenemos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Actualizamos en el State la media de votos.
                updateRatingHackathonState(body.data.hackathon.avgRating);

                // Mostramos un mensaje al usuario para indicar que todo ha ido bien.
                toast.success(body.message, {
                    id: 'getHackathon',
                });
            } else {
                throw new Error('Por favor, selecciona un valor entre 1 y 5');
            }
        } catch (err) {
            toast.error(err.message, {
                id: 'getHackathon',
            });
        } finally {
            setLoading(false);
            // Vaciamos el contenido del input.
            setRating('');
        }
    };

    return (
        <form onSubmit={handleAddRating}>
            <select
                id="ratings"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
            >
                <option value="">--Seleccionar--</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>

            <button disabled={loading}>Valorar</button>
        </form>
    );
};

// Validamos las props.
RatingHackathon.propTypes = {
    updateRatingHackathonState: PropTypes.func.isRequired,
    hackathonId: PropTypes.number.isRequired,
    authToken: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default RatingHackathon;
