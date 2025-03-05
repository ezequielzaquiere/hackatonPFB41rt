import PropTypes from 'prop-types'; // Dependencia que valida las props.
import { useState } from 'react'; // Hooks.
import toast from 'react-hot-toast'; // Función que muestra un mensaje al usuario.

const { VITE_API_URL } = import.meta.env; // Obtenemos las variables de entorno necesarias.

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
    const handleAddRating = async (e) => {
        try {
            e.preventDefault();

            // Convertir el valor de rating a número
            const numericRating = Number(rating);

            // Comprobamos que el valor esté en el rango correcto (1-5).
            if (numericRating >= 1 && numericRating <= 5) {
                setLoading(true);

                const res = await fetch(
                    `${VITE_API_URL}/api/hackathon/${hackathonId}/ratings`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: authToken,
                            'Content-Type': 'application/json', // Asegúrate de incluir este header
                        },
                        body: JSON.stringify({
                            value: numericRating, // Envía el valor como un número
                        }),
                    }
                );

                // Verifica si la respuesta es exitosa
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(
                        errorData.message || 'Error al valorar el hackathon'
                    );
                }

                const body = await res.json();

                // Actualizamos el estado con la media de las valoraciones.
                updateRatingHackathonState(body.data.hackathon.avgRating);

                toast.success(body.message, { id: 'getHackathon' });
            } else {
                throw new Error('Por favor, selecciona un valor entre 1 y 5');
            }
        } catch (err) {
            toast.error(err.message, { id: 'getHackathon' });
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
                onChange={(e) => setRating(e.target.value)} // Solo cambiamos el valor
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
