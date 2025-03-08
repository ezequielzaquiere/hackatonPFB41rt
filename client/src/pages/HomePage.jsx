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
        question: '¿Quién puede participar en un hackathon?',
        answer: 'Cualquier persona interesada en la tecnología y la innovación puede participar. Aunque suelen estar orientados a programadores, también pueden participar diseñadores, especialistas en negocios y emprendedores.',
    },
    {
        question: '¿Se necesita experiencia para participar en un hackathon?',
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
            `${formattedRating} ` +
            '⭐'.repeat(fullStars) +
            '☆'.repeat(emptyStars);

        return starsString;
    };

    // Referencia al contenedor del carrusel
    const scrollContainerRef = useRef(null);

    // Funciones para desplazar el carrusel
    const handleScrollLeft = () => {
        scrollContainerRef.current?.scrollBy({
            left: -350,
            behavior: 'smooth',
        });
    };

    const handleScrollRight = () => {
        scrollContainerRef.current?.scrollBy({
            left: 350,
            behavior: 'smooth',
        });
    };

    // Para controlar la pregunta activa
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <>
            <div className="relative w-full min-h-[450px] h-full bg-[#191919] bg-center flex flex-col justify-center items-center gap-3">
                {/* Imagen centrada */}
                <img
                    src="/hackVerse.png"
                    alt="Logo de HackVerse"
                    className="w-[300px] mx-auto object-center"
                />

                {/* Texto en la parte inferior */}
                <div className="text-white">
                    <p className="px-5 text-lg text-center">
                        ¡Bienvenido a las mejores competiciones de código!
                    </p>
                </div>
            </div>

            {/* Próximos Eventos */}
            <section className="bg-[#191919] text-white p-10 relative">
                <div className="mb-4">
                    <h2 className="text-2xl md:text-2xl">Próximos Eventos</h2>

                    <img
                        src="/nextEventsGraphismPink.png"
                        alt="Adorno del título Próximos Eventos"
                        className="w-screen max-w-30 pt-2 pb-5 md:max-w-40"
                    />

                    <div className="relative mt-6 overflow-hidden">
                        {/* Contenedor scrollable */}
                        <div
                            ref={scrollContainerRef}
                            className="w-screen flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory md:gap-4 md:overflow-hidden md:min-h-[185px]"
                        >
                            {hackathonesFromToday.data?.hackathones?.map(
                                (hackathon, index) => (
                                    <div
                                        key={index}
                                        className="relative flex flex-col justify-between min-w-[112px] min-h-[185px] bg-[#212121] bg-center p-2 rounded-lg text-white text-center snap-start md:min-w-[200px] md:min-h-[250px] md:p-3"
                                    >
                                        {/* Capa negra sobre el fondo */}
                                        <div className="absolute bg-black/5 rounded-lg"></div>

                                        {/* Contenido encima de la capa negra */}
                                        <div className="relative">
                                            <img
                                                src={hackathon.image}
                                                alt=""
                                                className="w-full h-20 object-cover object-[50%_25%] rounded-md md:h-32"
                                            />
                                            <h3 className="mt-2 text-xs md:text-lg font-semibold ">
                                                {hackathon.title}
                                            </h3>
                                            <p className="text-xs">
                                                {formatDate(
                                                    hackathonesFromToday.data
                                                        .hackathones[0]
                                                        .createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    {/* Botón Izquierda */}
                    <button
                        onClick={handleScrollLeft}
                        className="absolute left-[16px] bottom-1/3 p-2 rounded-full bg-[#191919] hover:bg-gray-700 transition md:p-4"
                    >
                        <ChevronLeft className="text-[#9A4EAE] w-5 h-5 md:w-7 md:h-7" />
                    </button>

                    {/* Botón Derecha */}
                    <button
                        onClick={handleScrollRight}
                        className="absolute right-[16px] bottom-1/3 p-2 rounded-full bg-[#191919] hover:bg-gray-700 transition md:p-4"
                    >
                        <ChevronRight className="text-[#9A4EAE] w-5 h-5 md:w-7 md:h-7" />
                    </button>
                </div>
            </section>

            {/* Mejor valorados */}

            <section className="max-w-screen p-10  bg-[#191919] text-white flex flex-col">
                <h2 className="w-full text-2xl pb-2">Los mejores valorados</h2>

                <img
                    src="/HomePageGraphism1.png"
                    alt="Adorno debajo del título"
                    className="w-screen max-w-20 mb-8 md:max-w-32"
                />

                <div className="w-full flex flex-col justify-center items-center gap-15 md:flex-wrap">
                    {bestHackathones.data?.bestHackathones?.map(
                        (hackathon, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-full gap-4"
                            >
                                <p className="text-[#9A4EAE] text-3xl font-bold pl-2 text-center md:p-6">
                                    #{index + 1}
                                </p>

                                {/* Tarjeta contenedora */}
                                <div className="w-[280px] h-[150px] md:w-[480px] md:h-[200px] md:mb-10 bg-[#212121] text-white text-center rounded-lg flex overflow-hidden gap-3">
                                    {/* Imagen en la izquierda (50% de la tarjeta) */}
                                    <div className="w-1/2 h-full">
                                        <img
                                            src={hackathon.image}
                                            alt={hackathon.name}
                                            className="w-full h-full object-cover"
                                            onClick={() =>
                                                handleImageClick(hackathon.id)
                                            }
                                        />
                                    </div>

                                    {/* Contenido en la derecha (50% de la tarjeta) */}
                                    <div className="w-1/2 h-full flex flex-col justify-center items-center gap-2">
                                        <p className="text-xs md:text-base">
                                            Participantes:{' '}
                                            {hackathon.participantCount}
                                        </p>
                                        <div>
                                            {printStars(hackathon.avgRating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="bg-[#191919] text-white px-10 py-10">
                <div>
                    <h2 className="text-2xl">Preguntas Frecuentes</h2>
                    <img
                        src="/faqGraphism.png"
                        alt="Adorno del título Preguntas frecuentes"
                        className="w-screen max-w-20 my-3 md:max-w-32"
                    />
                    <div className="mt-6 md:max-w-screen flex flex-col items-center justify-center">
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
                                    <span className="md:text-lg">
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
                                            ? 'max-h-80 opacity-100 mt-2'
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
