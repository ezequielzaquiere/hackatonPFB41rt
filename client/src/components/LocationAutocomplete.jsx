import { useState } from 'react';
import PropTypes from 'prop-types';

// Componente que autocompletara la direccion

// Recibe onSlect para que se ejecute cuando se selecciona la ubicacion

const LocatioAutocomplete = ({ onSelect }) => {
    // Guarda la consulta del usuario
    const [query, setQuery] = useState('');

    // Guarda la lista de resultados al consultar la API
    const [suggestion, setSuggestions] = useState([]);

    // Funcion que busca en Nominatim (como google maps pero gratuito)
    const handleSearch = async (e) => {
        if (query.length <= 2) {
            setSuggestions([]); // Limpiar sugerencias si el query es corto.
            return;
        }

        // Si se escriben mas de 2 letras realiza la consulta
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await res.json();

            // Almacenamos los posibles resultados
            setSuggestions(data);
        } catch (error) {
            console.error('error en location', error);
        }
    };
    //Funcion que vacia el input
    const handleClear = () => {
        //Vaciamos la consulta
        setQuery('');
        //Vaciamos las sugerencias
        setSuggestions([]);
    };

    //Funcion que maneja la seleccion de la ubicacion(recibe una ubicacion)
    const handleSelect = (place) => {
        //Muestra la direccion en el input
        setQuery(place.display_name);
        //Oculta las sugerencias
        setSuggestions([]);
        //Guarda la localizacion seleccionada (Completa con todos los datos)
        onSelect(place);
    };

    return (
        <>
            <div className="relative w-full">
                {/* Input de búsqueda */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="¿Dónde tendrá lugar?"
                    className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex gap-2 mt-2">
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        Buscar
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition"
                    >
                        Limpiar
                    </button>
                </div>

                {/* Sugerencias de búsqueda */}
                {suggestion.length > 0 && (
                    <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg overflow-hidden">
                        {suggestion.map((location) => (
                            <li
                                key={location.place_id}
                                onClick={() => handleSelect(location)}
                                className="cursor-pointer p-3 hover:bg-gray-100 transition"
                            >
                                {location.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

//Validadcion de props
LocatioAutocomplete.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default LocatioAutocomplete;
