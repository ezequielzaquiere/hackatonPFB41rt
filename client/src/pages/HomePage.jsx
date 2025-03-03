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
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus bibendum imperdiet bibendum. Quisque sodales mi a neque gravida, quis volutpat ex accumsan.',
    },
    {
        question: '¿Quién puede participar en un Hackathon?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porta augue. Proin a ex et arcu maximus fringilla.',
    },
    {
        question: '¿Se necesita experiencia para participar en un Hackathon?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere ullamcorper elit at finibus. Duis bibendum, erat id ullamcorper laoreet, urna ante molestie ante, sed blandit est purus in tortor.',
    },
    {
        question: '¿Cómo se forma equipo para un Hackathon?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus, justo a auctor suscipit, massa purus laoreet nisl, sed blandit ipsum magna nec nisl.',
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
            {/* Mejor valorados */}
            <section className="w-screen bg-[#191919] text-white flex flex-col py-10 px-10 pb-25">
                <h2 className="w-screen text-xl font-bold mb-2">
                    Mejor Valorados
                </h2>

                <img
                    src="/HomePageGraphism1.png"
                    alt="Adorno debajo del título"
                    className="w-screen max-w-20 mb-8"
                ></img>

                <div className="flex flex-col gap-2 space-y-12 mt-3">
                    {bestHackathones.data?.bestHackathones?.map(
                        (hackathon, index) => (
                            <div
                                key={index}
                                className="bg-[#191919] text-white text-center rounded-lg hackathonCard flex flex-col items-center gap-4 py-3 font-bold 
                                shadow-[0px_0px_20px_#9A4EAE]"
                            >
                                <p className="text-[#9A4EAE] text-xl font-bold">
                                    #{index + 1}
                                </p>

                                <img
                                    src={hackathon.image}
                                    alt={hackathon.name}
                                    className="w-56 h-28 rounded-lg object-cover object-[50%_20%]"
                                    onClick={() =>
                                        handleImageClick(hackathon.id)
                                    } // Pasamos el id ***
                                />

                                <p className="text-s">
                                    Participantes: {hackathon.participantCount}
                                </p>

                                <div className="mr-5">
                                    {printStars(hackathon.avgRating)}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* Próximos Eventos */}
            <section className="bg-[#9A4EAE] text-[#191919] px-10 py-10">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold">Próximos Eventos</h2>

                    <img
                        src="/nextEventsGraphism.png"
                        alt="Adorno del título `Próximos Eventos`"
                        className="w-screen max-w-30 my-2 "
                    />

                    <div className="relative mt-6 overflow-hidden">
                        {/* Contenedor scrollable */}
                        <div
                            ref={scrollContainerRef}
                            className="w-screen flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
                        >
                            {hackathonesFromToday.data?.hackathones?.map(
                                (hackathon, index) => (
                                    <div
                                        key={index}
                                        className="min-w-[225px] bg-[#191919] p-4 rounded-lg shadow-md text-white snap-start"
                                    >
                                        <img
                                            src={hackathon.image}
                                            alt=""
                                            className="w-full h-40 object-cover rounded-md"
                                        />
                                        <h3 className="mt-3 text-lg font-semibold">
                                            {hackathon.title}
                                        </h3>
                                        <p className="text-sm">
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
                            className="absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#191919] hover:bg-gray-700 transition"
                        >
                            <ChevronLeft className="text-[#9A4EAE] w-5 h-5" />
                        </button>

                        {/* Botón Derecha */}
                        <button
                            onClick={handleScrollRight}
                            className="absolute right-3.75 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#191919] hover:bg-gray-700 transition"
                        >
                            <ChevronRight className="text-[#9A4EAE] w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="bg-[#191919] text-white px-10 py-10">
                <div>
                    <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
                    <img
                        src="/faqGraphism.png"
                        alt="Adorno del título `Preguntas frecuentes`"
                        className="w-screen max-w-20 my-3"
                    />
                    <div className="mt-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-white p-4 rounded-md mb-2"
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
                                    <span>{faq.question}</span>
                                    {activeIndex === index ? (
                                        <Minus className="min-w-5 min-h-5" />
                                    ) : (
                                        <Plus className="min-w-5 min-h-5" />
                                    )}
                                </div>

                                {/* Respuesta con transición */}
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${
                                        activeIndex === index
                                            ? 'max-h-40 opacity-100 mt-2'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-sm text-gray-300">
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
