import { format } from 'date-fns';
import { useState, useEffect } from 'react';
const { VITE_API_URL } = import.meta.env;

const HackathonsPage = () => {
    const [filters, setFilters] = useState({
        title: '',
        programmingLang: '',
        startingDate: '',
        location: '',
        type: '',
    });

    const [hackathons, setHackathons] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const fetchHackathons = async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(
                `${VITE_API_URL}/api/hackathon/hackathones/filter?${queryParams}`
            );
            const data = await response.json();
            if (data.success) {
                setHackathons(data.data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error al obtener los hackathones:', error);
        }
    };

    useEffect(() => {
        fetchHackathons();
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
        fetchHackathons();
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Hackathones</h1>

            <form onSubmit={handleSubmit} className="p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium">
                            Título
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={filters.title}
                            onChange={handleFilterChange}
                            placeholder="Buscar por título"
                            className="mt-1 block w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Lenguaje de programación
                        </label>
                        <input
                            type="text"
                            name="programmingLang"
                            value={filters.programmingLang}
                            onChange={handleFilterChange}
                            placeholder="Buscar por lenguaje"
                            className="mt-1 block w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Fecha de inicio
                        </label>
                        <input
                            type="date"
                            name="startingDate"
                            value={filters.startingDate}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Ubicación
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            placeholder="Buscar por ubicación"
                            className="mt-1 block w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Tipo
                        </label>
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full px-3 py-2"
                        >
                            <option value="">Todos</option>
                            <option value="online">Online</option>
                            <option value="presencial">Presencial</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="px-4 py-2"
                    >
                        Limpiar Filtros
                    </button>
                    <button type="submit" className="px-4 py-2">
                        Filtrar
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hackathons.length > 0 ? (
                    hackathons.map((hackathon) => (
                        <div key={hackathon.id} className="p-6">
                            <h2 className="text-xl font-semibold mb-2">
                                {hackathon.title}
                            </h2>
                            <p>
                                <span className="font-medium">Tipo:</span>{' '}
                                {hackathon.type}
                            </p>
                            <p>
                                <span className="font-medium">
                                    Fecha de inicio:
                                </span>{' '}
                                {format(hackathon.startingDate, 'dd-MM-yyyy')}
                            </p>
                            {hackathon.location && (
                                <p>
                                    <span className="font-medium">
                                        Ubicación:
                                    </span>{' '}
                                    {hackathon.location}
                                </p>
                            )}
                            <p>
                                <span className="font-medium">Lenguajes:</span>{' '}
                                {hackathon.programmingLangs
                                    ? hackathon.programmingLangs
                                          .split(',')
                                          .join(', ')
                                    : 'No especificado'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full">
                        No se encontraron hackathones con esos filtros.
                    </p>
                )}
            </div>
        </div>
    );
};

export default HackathonsPage;
