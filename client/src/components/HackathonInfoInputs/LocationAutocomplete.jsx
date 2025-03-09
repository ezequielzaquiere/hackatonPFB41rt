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
        <div>
            <label
                htmlFor="location"
                className={`mb-2 block text-base font-semibold ${isDisabled ? 'text-[#555]' : 'text-white'}`}
            >
                {isDisabled ? 'Localización' : 'Localización *'}
            </label>
            <div className="relative w-full">
                {/* Input de búsqueda */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="¿Dónde tendrá lugar?"
                    className=" focus:placeholder-transparent bg-[#333] border border-[#7a3e8f] w-full text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] focus:bg-[#7a3e8f] transition enabled:hover:ring-2 enabled:hover:ring-[#7a3e8f] disabled:bg-[#555] disabled:border-[#777] disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={isDisabled}
                    required={!isDisabled}
                />
                <div className="flex gap-2 w-full">
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isDisabled}
                        className="bg-[#7a3e8f] flex-1 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] transition enabled:hover:ring-2 enabled:hover:ring-[#9A4EAE] hover:bg-[#9A4EAE] disabled:bg-[#7A3E8F] disabled:border-[#7A3E8F] hover:scale-105 disabled:text-gray-300 disabled:cursor-not-allowed mt-3"
                    >
                        Buscar
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="bg-[#7a3e8f] flex-1 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a3e8f] transition hover:bg-[#9A4EAE] hover:scale-105 disabled:bg-[#7A3E8F] disabled:border-[#7A3E8F] disabled:text-gray-300 disabled:cursor-not-allowed mt-3"
                        disabled={isDisabled}
                    >
                        Limpiar
                    </button>
                </div>

                {/* Sugerencias de búsqueda */}
                {suggestion.length > 0 && (
                    <ul
                        className="absolute left-0 right-0 w-full bg-[#333] border border-gray-600 
                                    text-white text-sm rounded-lg shadow-lg overflow-hidden 
                                    bottom-full z-50 overflow-y-auto max-h-60"
                        x
                    >
                        {suggestion.map((location) => (
                            <li
                                key={location.place_id}
                                onClick={() => handleSelect(location)}
                                className="cursor-pointer p-3 hover:bg-[#9A4EAE] transition"
                            >
                                {location.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

//Validadcion de props
LocatioAutocomplete.propTypes = {
    onSelect: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    location: PropTypes.string,
};

export default LocatioAutocomplete;
