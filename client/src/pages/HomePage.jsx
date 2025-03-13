//Dependencias
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
//Hooks
import useBestHackathonesList from '../hooks/useBestHackathonesList';
import useHackathonesFromToday from '../hooks/useHackathonesFromToday';
import formatDate from '../utils/formatedDate.js';
const { VITE_API_URL } = import.meta.env;
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

    const text = '¡Bienvenido a las mejores competiciones de código!';
    return (
        <>
            <div className="relative w-full min-h-[450px] h-full bg-[#191919] flex flex-col justify-center items-center gap-3 overflow-hidden">
                {/* Video de fondo */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/bg-video.mp4" type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>

                {/* Capa de transparencia sobre el video */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0"></div>

                {/* Imagen centrada */}
                <img
                    src="/hackVerse.png"
                    alt="Logo de HackVerse"
                    className="w-[300px] mx-auto object-center relative z-10"
                />

                {/* Texto animado con Framer Motion */}
                <div className="text-white relative z-10">
                    <motion.p
                        className="px-5 text-lg text-center font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 0.3,
                            staggerChildren: 0.03,
                        }}
                    >
                        {text.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.p>
                </div>
            </div>

            {/* Próximos Eventos */}
            <section className="bg-[#191919] text-white p-20 relative">
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
                                        className="hover:scale-105 hover:rounded-2xl relative flex flex-col justify-between min-w-[112px] min-h-[185px] bg-[#242424] hover:bg-[#303030] bg-center p-2 rounded-lg text-white text-center snap-start md:min-w-[200px] md:min-h-[250px] md:p-3"
                                    >
                                        {/* Capa negra sobre el fondo */}
                                        <div className="absolute bg-black/5 rounded-lg"></div>

                                        {/* Contenido encima de la capa negra */}
                                        <div className="relative">
                                            <img
                                                src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                                                alt=""
                                                className="w-full h-20 object-cover object-[50%_25%] rounded-md md:h-32"
                                                onClick={() =>
                                                    handleImageClick(
                                                        hackathon.id
                                                    )
                                                }
                                            />
                                            <h3 className="mt-2 text-xs md:text-lg font-semibold ">
                                                {hackathon.title}
                                            </h3>
                                            <p className="text-xs">
                                                {formatDate(
                                                    hackathonesFromToday.data
                                                        .hackathones[index]
                                                        .startingDate
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

            <section className="max-w-screen p-20  bg-[#191919] text-white flex flex-col">
                <h2 className="w-full text-2xl pb-2">Los mejores valorados</h2>

                <img
                    src="/HomePageGraphism1.png"
                    alt="Adorno debajo del título"
                    className="w-screen max-w-20 mb-8 md:max-w-32"
                />

                <div className="flex flex-col lg:flex-row lg:min-w-full gap-15 mt-10">
                    {bestHackathones.data?.bestHackathones?.map(
                        (hackathon, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center w-full gap-4"
                            >
                                {/* Tarjeta contenedora */}
                                <div className="hover:scale-110 w-[280px] h-[150px] md:w-[430px] md:h-[180px] md:mb-10 bg-[#242424] hover:bg-[#303030] text-white text-center rounded-lg flex gap-3 relative">
                                    {/* Imagen en la izquierda (50% de la tarjeta) */}
                                    <p className="absolute bottom-0 left-[-30px] text-[white] text-7xl md:text-8xl lg:text-9xl font-extrabold text-center drop-shadow-[0px_0px_5px_#9A4EAE]">
                                        {index + 1}
                                    </p>
                                    <div className="w-1/2 h-full">
                                        <img
                                            src={`${VITE_API_URL}/imgHack/${hackathon.image}`}
                                            alt={hackathon.name}
                                            className="w-full h-full object-cover"
                                            onClick={() =>
                                                handleImageClick(hackathon.id)
                                            }
                                        />
                                    </div>

                                    {/* Contenido en la derecha (50% de la tarjeta) */}
                                    <div className="w-1/2 h-full flex flex-col justify-center items-center gap-2">
                                        <h2>{hackathon.title}</h2>
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
            <section className="bg-[#191919] text-white px-20 py-10">
                <div>
                    <h2 className="text-2xl">Preguntas Frecuentes</h2>
                    <img
                        src="/faqGraphism.png"
                        alt="Adorno del título Preguntas frecuentes"
                        className="w-screen max-w-20 mt- mb-15 md:max-w-32"
                    />
                    <div className="mt-6 md:max-w-screen flex flex-col items-center justify-center">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="hover:bg-[#303030] border border-white p-4 rounded-md mb-2 md:p-6"
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
