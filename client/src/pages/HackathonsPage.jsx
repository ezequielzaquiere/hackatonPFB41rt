import { format } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;

const HackathonsPage = () => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/details/${id}`); // Redirige a la página de detalles
    };

    const [isFormVisible, setIsFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario

    const [filters, setFilters] = useState({
        title: '',
        programmingLang: '',
        startingDate: '',
        location: '',
        type: '',
    });

    const [hackathons, setHackathons] = useState([]);
    const [locations, setLocations] = useState([]); // Estado para almacenar las localizaciones
    const [lenguajes, setLangs] = useState([]); // Estado para almacenar los lenguajes

    const hasFetched = useRef(false); // Usamos useRef para controlar si ya se ha hecho la primera carga

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const fetchHackathons = async (filters = {}, showSuccessToast = true) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(
                `${VITE_API_URL}/api/hackathon/hackathones/filter?${queryParams}`
            );
            const data = await response.json();

            if (data.success) {
                setHackathons(data.data);
                if (showSuccessToast && !hasFetched.current) {
                    toast.success('Hackathones cargados correctamente.');
                    hasFetched.current = true; // Marcamos que ya se ha mostrado el toast
                }
            } else {
                console.error(data.message);
                toast.error('Error al cargar los hackathones.');
            }
        } catch (error) {
            console.error('Error al obtener los hackathones:', error);
            toast.error('Error de red al cargar los hackathones.');
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL}/api/hackathon/hackathones/location`
            );
            const data = await response.json();

            if (data) {
                setLocations(data.data); // Almacenamos las localizaciones
            } else {
                console.error(data.message);
                toast.error('Error al cargar las localizaciones.');
            }
        } catch (error) {
            console.error('Error al obtener las localizaciones:', error);
            toast.error('Error de red al cargar las localizaciones.');
        }
    };
    const fetchLangs = async () => {
        try {
            const response = await fetch(
                `${VITE_API_URL}/api/hackathon/hackathones/langs`
            );
            const data = await response.json();

            if (data) {
                setLangs(data.data); // Almacenamos los lenguajes
            } else {
                console.error(data.message);
                toast.error('Error al cargar los lenguajes.');
            }
        } catch (error) {
            console.error('Error al obtener los lenguajes.:', error);
            toast.error('Error de red al cargar los lenguajes.');
        }
    };

    useEffect(() => {
        fetchHackathons();
        fetchLocations(); // Cargamos las localizaciones al montar el componente
        fetchLangs();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchHackathons(filters);
    };

    const clearFilters = () => {
        setFilters({
            title: '',
            programmingLang: '',
            startingDate: '',
            location: '',
            type: '',
        });

        fetchHackathons({}, false); // No mostrar el toast de éxito
        toast.success('Filtros limpiados correctamente.');
    };

    return (
        <div className="bg-[#191919] text-white min-h-screen p-10">
            {/* Título */}
            <h1 className="text-3xl text-[#9a4eae] text-center mt-10 mb-10">
                Hackathones
            </h1>

            {/* Botón para mostrar/ocultar el formulario */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="hover:scale-105 transition  bg-[#7A3E8F] text-white px-4 py-2 rounded-md hover:bg-[#9a4eae]"
                >
                    {isFormVisible ? (
                        'Ocultar Filtros'
                    ) : (
                        <div className="flex gap-2 ">
                            <p>Filtrar</p>
                            <img src="/filter.png" className="w-6" />
                        </div>
                    )}
                </button>
            </div>

            {/* Formulario de filtros */}
            {isFormVisible && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#212121] p-6 rounded-lg shadow-lg mb-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Título */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium mb-2"
                            >
                                Título
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={filters.title}
                                onChange={handleFilterChange}
                                className="focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition  hover:ring-2 hover:ring-[#7A3E8F]"
                            />
                        </div>

                        {/* Lenguaje de programación */}
                        <div>
                            <label
                                htmlFor="programmingLang"
                                className="block text-sm font-medium mb-2"
                            >
                                Lenguaje de programación
                            </label>
                            <select
                                id="programmingLang" // Cambia el id para que coincida con el name
                                name="programmingLang" // Asegúrate de que el name coincida con la clave en el estado
                                value={filters.programmingLang} // Usa la clave correcta del estado
                                onChange={handleFilterChange}
                                className="focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                            >
                                <option value="">Selecciona un lenguaje</option>
                                {lenguajes.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.programmingLang}
                                    >
                                        {item.programmingLang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fecha de inicio */}
                        <div>
                            <label
                                htmlFor="startingDate"
                                className="block text-sm font-medium mb-2"
                            >
                                Fecha de inicio
                            </label>
                            <input
                                type="date"
                                id="startingDate"
                                name="startingDate"
                                value={filters.startingDate}
                                onChange={handleFilterChange}
                                className="focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition  hover:ring-2 hover:ring-[#7A3E8F]"
                            />
                        </div>

                        {/* Tipo */}
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium mb-2"
                            >
                                Tipo
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                            >
                                <option value="">Selecciona un tipo</option>
                                <option value="Presencial">Presencial</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>

                        {/* Ubicación */}
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium mb-2"
                            >
                                Ubicación
                            </label>
                            <select
                                id="location"
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="focus:placeholder-transparent bg-[#333] mb-4 border border-[#7A3E8F] focus:bg-[#7A3E8F] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7A3E8F] transition hover:ring-2 hover:ring-[#7A3E8F]"
                            >
                                <option value="">Selecciona una ciudad</option>
                                {locations.slice(1).map((item, index) => (
                                    <option key={index} value={item.location}>
                                        {item.location}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="submit"
                            className="bg-[#7B3A8E] text-white px-4 py-2 rounded-md hover:bg-[#9A4EAE] hover:scale-105 transition"
                        >
                            Filtrar
                        </button>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="hover:scale-105 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </form>
            )}

            {/* Lista de hackathones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hackathons.length > 0 ? (
                    hackathons.map((hackathon) => (
                        <div
                            key={hackathon.id}
                            className="bg-[#242424] hover:bg-[#303030] p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center hover:scale-105 hover:rounded-2xl transition-all duration-300 ease-in-out"
                            onClick={() => handleClick(hackathon.id)}
                        >
                            {/* Contenido de la tarjeta */}
                            <div className="flex-1 ">
                                <h2 className="text-xl font-bold text-[#9A4EAE] mb-2">
                                    {hackathon.title}
                                </h2>
                                <p className="text-gray-300">
                                    <strong>Tipo</strong> {hackathon.type}
                                </p>
                                <p className="text-gray-300">
                                    <strong>Fecha de inicio</strong>{' '}
                                    {format(
                                        hackathon.startingDate,
                                        'dd-MM-yyyy'
                                    )}
                                </p>
                                {hackathon.location && (
                                    <p className="text-gray-300">
                                        <strong>Ubicación</strong>{' '}
                                        {hackathon.location}
                                    </p>
                                )}
                                <p className="text-gray-300">
                                    <strong>Lenguajes</strong>{' '}
                                    {hackathon.programmingLangs
                                        ?.split(',')
                                        .join(', ') || 'No especificado'}
                                </p>
                            </div>

                            {/* Imagen */}
                            <img
                                src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                                alt={hackathon.title}
                                className="w-42 h-32 object-cover rounded-2xl mt-2 md:mb-0 md:ml-4 py-1"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300 text-center col-span-full">
                        No se encontraron hackathones con esos filtros.
                    </p>
                )}
            </div>
        </div>
    );
};

export default HackathonsPage;
