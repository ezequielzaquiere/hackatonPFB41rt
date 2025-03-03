//Dependencias
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

//Hooks
import useBestHackathonesList from '../hooks/useBestHackathonesList';
import useHackathonesFromToday from '../hooks/useHackathonesFromToday';
import formatDate from '../utils/formatedDate.js';

//FAQ
const faqs = [
    {
        question: '¿Qué es un hackathon?',
        answer: 'Un hackathon es un evento en el que programadores, diseñadores y otros profesionales de la tecnología colaboran para desarrollar soluciones innovadoras en un tiempo limitado, generalmente entre 24 y 48 horas.',
    },
    {
        question: '¿Quién puede participar en un Hackathon?',
        answer: 'Cualquier persona interesada en la tecnología y la innovación puede participar. Aunque suelen estar orientados a programadores, también pueden participar diseñadores, especialistas en negocios y emprendedores.',
    },
    {
        question: '¿Se necesita experiencia para participar en un Hackathon?',
        answer: 'No es obligatorio. Hay hackathones para todos los niveles, desde principiantes hasta expertos. Lo más importante es la creatividad, el trabajo en equipo y la disposición para aprender.',
    },
    {
        question: '¿Qué se puede ganar en un hackathon?',
        answer: 'Depende del evento. Algunos hackathones ofrecen premios en efectivo, becas, oportunidades de empleo o mentoría con expertos. Otros simplemente brindan la experiencia de aprendizaje y networking.',
    },
    {
        question: '¿Cómo se forma un equipo para un hackathon?',
        answer: 'Puedes unirte con amigos antes del evento o formar un equipo en el mismo hackathon. Muchos organizadores tienen sesiones de networking previas para ayudar a los participantes a encontrar compañeros de equipo.',
    },
];

const HomePage = () => {
    const navigate = useNavigate();
    const handleImageClick = (id) => {
        navigate(`/details/${id}`); // Redirige a la página de detalles ***
    };

    //Traer del backend los 3 mejores hackathones según rating
    const bestHackathones = useBestHackathonesList();
    console.log(bestHackathones);
    //Traer del backend los hackathones a partir de la fecha de solicitud
    const hackathonesFromToday = useHackathonesFromToday();

    //Función para imprimir estrellas según avgRating
    const printStars = (avgRating) => {
        const numericRating = Number(avgRating);
        const formattedRating = numericRating.toFixed(1); // Redondea a 1 decimal
        const fullStars = Math.floor(avgRating);
        const emptyStars = 5 - fullStars;
        const starsString =
            `${formattedRating}` +
            '⭐'.repeat(fullStars) +
            '☆'.repeat(emptyStars);

        return starsString;
    };

    // Referencia al contenedor del carrusel
    const scrollContainerRef = useRef(null);

    // Funciones para desplazar el carrusel
    const handleScrollLeft = () => {
        scrollContainerRef.current?.scrollBy({
            left: -242,
            behavior: 'smooth',
        });
    };

    const handleScrollRight = () => {
        scrollContainerRef.current?.scrollBy({
            left: 242,
            behavior: 'smooth',
        });
    };

    // Para controlar la pregunta activa
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <>
            <div className="hidden lg:block relative w-full">
                {/* Imagen de fondo */}
                <img
                    src="/landingPanoramic.png"
                    alt="Portada"
                    className="w-full object-cover"
                />

                {/* Degradado en el bottom */}
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>

                {/* Contenido sobre la imagen */}
                <div className="absolute bottom-10 left-10 text-white">
                    <h1 className="text-4xl font-bold">HackVerse®</h1>
                    <p className="text-lg">
                        ¡Bienvenido a las mejores competiciones de código!
                    </p>
                </div>
            </div>

            {/* Mejor valorados */}

            <section className="max-w-screen p-10 lg:px-20 lg:py-20 bg-[#191919] text-white flex flex-col">
                <h2 className="w-screen text-xl font-bold mb-2 md:text-2xl">
                    Mejor Valorados
                </h2>

                <img
                    src="/HomePageGraphism1.png"
                    alt="Adorno debajo del título"
                    className="w-screen max-w-20 mb-8 md:max-w-32"
                />

                <div className="max-w-80 flex flex-col gap-2 space-y-12 mt-3 md:flex-row md:flex-wrap md:max-w-screen md:justify-around md:px-40">
                    {bestHackathones.data?.bestHackathones?.map(
                        (hackathon, index) => (
                            <div
                                key={index}
                                className="bg-[#191919] text-white text-center rounded-lg flex flex-col items-center gap-4 py-3 font-bold 
                    shadow-[0px_0px_20px_#9A4EAE] md:min-w-lg md:max-w-xs md:py-6 md:flex-row"
                            >
                                <p className="text-[#9A4EAE] text-xl font-bold md:p-6">
                                    #{index + 1}
                                </p>

                                <img
                                    src={hackathon.image}
                                    alt={hackathon.name}
                                    className="w-56 h-28 rounded-lg object-cover object-[50%_20%] md:w-64 md:h-36"
                                    onClick={() =>
                                        handleImageClick(hackathon.id)
                                    }
                                />

                                <div className="md:flex-col">
                                    <p className="text-s md:text-base">
                                        Participantes:{' '}
                                        {hackathon.participantCount}
                                    </p>

                                    <div className="">
                                        {printStars(hackathon.avgRating)}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* Próximos Eventos */}
            <section className="bg-[#9A4EAE] text-[#191919] p-10 lg:px-20 lg:py-20">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold md:text-3xl">
                        Próximos Eventos
                    </h2>

                    <img
                        src="/nextEventsGraphism.png"
                        alt="Adorno del título Próximos Eventos"
                        className="w-screen max-w-30 my-2 md:max-w-40"
                    />

                    <div className="relative mt-6 overflow-hidden">
                        {/* Contenedor scrollable */}
                        <div
                            ref={scrollContainerRef}
                            className="w-screen flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory md:gap-8 md:overflow-hidden"
                        >
                            {hackathonesFromToday.data?.hackathones?.map(
                                (hackathon, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-around min-w-[225px] min-h-[350px] bg-[#191919] p-4 rounded-lg text-white snap-start md:min-w-[300px] md:p-6"
                                    >
                                        <img
                                            src={hackathon.image}
                                            alt=""
                                            className="w-full h-40 object-cover object-[50%_25%] rounded-md md:h-48"
                                        />
                                        <h3 className="mt-3 text-lg font-semibold md:text-xl">
                                            {hackathon.title}
                                        </h3>
                                        <p className="text-sm md:text-base">
                                            {formatDate(
                                                hackathonesFromToday.data
                                                    .hackathones[0].createdAt
                                            )}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Botón Izquierda */}
                        <button
                            onClick={handleScrollLeft}
                            className="absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#191919] hover:bg-gray-700 transition md:p-4"
                        >
                            <ChevronLeft className="text-[#9A4EAE] w-5 h-5 md:w-7 md:h-7" />
                        </button>

                        {/* Botón Derecha */}
                        <button
                            onClick={handleScrollRight}
                            className="absolute right-3.75 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#191919] hover:bg-gray-700 transition md:p-4"
                        >
                            <ChevronRight className="text-[#9A4EAE] w-5 h-5 md:w-7 md:h-7" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="bg-[#191919] text-white px-10 py-10 md:px-20 md:py-16 lg:py-20">
                <div>
                    <h2 className="text-2xl font-bold md:text-3xl">
                        Preguntas Frecuentes
                    </h2>
                    <img
                        src="/faqGraphism.png"
                        alt="Adorno del título Preguntas frecuentes"
                        className="w-screen max-w-20 my-3 md:max-w-32"
                    />
                    <div className="mt-6 md:max-w-screen mg:mt-10 flex flex-col items-center justify-center">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-white p-4 rounded-md mb-2 md:p-6"
                            >
                                {/* Pregunta */}
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() =>
                                        setActiveIndex(
                                            index === activeIndex ? null : index
                                        )
                                    }
                                >
                                    <span className="md:text-lg lg:text-xl">
                                        {faq.question}
                                    </span>
                                    {activeIndex === index ? (
                                        <Minus className="min-w-5 min-h-5 md:w-6 md:h-6" />
                                    ) : (
                                        <Plus className="min-w-5 min-h-5 md:w-6 md:h-6" />
                                    )}
                                </div>

                                {/* Respuesta con transición */}
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${
                                        activeIndex === index
                                            ? 'max-h-40 opacity-100 mt-2'
                                            : 'max-h-0 opacity-0'
                                    } md:text-base`}
                                >
                                    <p className="text-large text-gray-300">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
