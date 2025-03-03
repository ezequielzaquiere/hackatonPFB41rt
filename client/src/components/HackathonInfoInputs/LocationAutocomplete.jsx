import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Componente que autocompletara la direccion

// Recibe onSlect para que se ejecute cuando se selecciona la ubicacion
// Recibe isDisabled para que se active o desactive el input

const LocatioAutocomplete = ({ onSelect, isDisabled, location }) => {
    // Guarda la consulta del usuario
    const [query, setQuery] = useState('');

    //Si hay una localizacion la cambiamos
    useEffect(() => {
        if (location) {
            setQuery(location);
        }
    }, [location]);

    // Guarda la lista de resultados al consultar la API
    const [suggestion, setSuggestions] = useState([]);

    // Funcion que busca en Nominatim (como google maps pero gratuito)
    const handleSearch = async () => {
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
            <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Localizacion
            </label>
            <div className="relative w-full">
                {/* Input de búsqueda */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="¿Dónde tendrá lugar?"
                    className="mb-2 bg-[#333] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                    disabled={isDisabled}
                    required={!isDisabled}
                />
                <div className="flex gap-2 mt-2">
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isDisabled}
                        className="bg-[#9A4EAE] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                    >
                        Enviar
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-[#9A4EAE] border border-[#9A4EAE] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A4EAE] transition hover:ring-2 hover:ring-[#9A4EAE]"
                        disabled={isDisabled}
                    >
                        Limpiar
                    </button>
                </div>

                {/* Sugerencias de búsqueda */}
                {suggestion.length > 0 && (
                    <ul
                        className="absolute left-0 right-0 w-full bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg shadow-lg overflow-hidden 
                        bottom-full mb-1 z-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-y-auto max-h-60"
                    >
                        {suggestion.map((location) => (
                            <li
                                key={location.place_id}
                                onClick={() => handleSelect(location)}
                                className="cursor-pointer p-3 hover:bg-purple-600 transition"
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
    isDisabled: PropTypes.bool.isRequired,
    location: PropTypes.string,
};

export default LocatioAutocomplete;
