//Dependencias
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

//Hooks
import useBestHackathonesList from '../hooks/useBestHackathonesList';
import useHackathonesFromToday from '../hooks/useHackathonesFromToday';

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
    //Traer del backend los 3 mejores hackathones según rating
    const bestHackathones = useBestHackathonesList();

    //Traer del backend los hackathones a partir de la fecha de solicitud
    const hackathonesFromToday = useHackathonesFromToday();

    //Función para imprimir estrellas según avgRating
    const printStars = (avgRating) => {
        const fullStars = Math.floor(avgRating);
        const emptyStars = 5 - fullStars;
        const starsString = '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);

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
            <section className="w-screen bg-black text-white text-center flex flex-col flex-center py-10">
                <h2 className="w-screen text-xl font-bold text-center">
                    Mejor Valorados
                </h2>

                <p className="mb-5">
                    A la espera de un grafismo para adornar aquí debajo
                </p>

                <div className="space-y-8">
                    {bestHackathones.data?.bestHackathones?.map(
                        (hackathon, index) => (
                            <div
                                key={index}
                                className="hackathonCard flex flex-col items-center gap-4"
                            >
                                <p className="text-pink-500 text-2xl font-bold">
                                    #{index + 1}
                                </p>

                                <img
                                    src={hackathon.image}
                                    alt={hackathon.name}
                                    className="w-56 h-28 rounded-lg object-cover"
                                />

                                <p>
                                    Número de participantes:{' '}
                                    {hackathon.participantCount}
                                </p>
                                <div>{printStars(hackathon.avgRating)}</div>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* Próximos Eventos */}
            <section className="bg-black text-white px-10 py-10">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold">Próximos Eventos</h2>

                    <div className="relative mt-6 overflow-hidden">
                        {/* Contenedor scrollable */}
                        <div
                            ref={scrollContainerRef}
                            className="flex flex-center gap-4 overflow-x-auto scrollbar-hide"
                        >
                            {hackathonesFromToday.data?.hackathones?.map(
                                (hackathon, index) => (
                                    <div
                                        key={index}
                                        className="min-w-[225px] bg-white p-4 rounded-lg shadow-md text-black"
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
                                            {hackathon.startingDate}
                                        </p>
                                        <p className="text-sm">
                                            {hackathon.startingDate}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Botón Izquierda */}
                        <button
                            onClick={handleScrollLeft}
                            className="absolute left-0 top-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                        >
                            <ChevronLeft className="text-white w-5 h-5" />
                        </button>

                        {/* Botón Derecha */}
                        <button
                            onClick={handleScrollRight}
                            className="absolute right-0 top-1/2 -translate-x-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                        >
                            <ChevronRight className="text-white w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="bg-black text-white px-10 py-10">
                <div>
                    <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
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
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </div>

                                {/* Respuesta (solo se muestra si está activo) */}
                                {activeIndex === index && (
                                    <p className="mt-2 text-sm text-gray-300">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
