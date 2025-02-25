import imageExample from '../assets/imageExample.jpg';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

const events = [
    {
        title: 'THE WAVE HACKATHON 2025',
        date: '18 - 19 Febrero 2025',
        img: imageExample,
    },
    {
        title: 'MADRID HACKATHON',
        date: 'Hackathon Web3 más grande de España',
        img: imageExample,
    },
    {
        title: 'Hackathon Cámara',
        date: 'Detalles del evento...',
        img: imageExample,
    },
];

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
    // Para controlar la pregunta activa
    const [activeIndex, setActiveIndex] = useState(null);

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

    return (
        <>
            {/* Mejor valorados */}
            <section className="w-screen bg-black text-white text-center flex flex-col flex-center py-10">
                <h2 className="w-screen text-xl font-bold text-center">
                    Mejor Valorados
                </h2>

                <div className="space-y-8">
                    <div className="flex flex-col items-center gap-4 ">
                        <span className="text-pink-500 text-2xl font-bold">
                            #1
                        </span>

                        <img
                            src={imageExample}
                            alt="Evento 1"
                            className="w-56 h-28 rounded-lg object-cover"
                        />

                        <div className="text-center  text-sm">
                            <p className="text-pink-400 text-lg">⭐⭐⭐⭐⭐</p>
                            <p>Número de participantes: 250</p>
                            <p>Número de votos: 195</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 ">
                        <span className="text-pink-500 text-2xl font-bold">
                            #2
                        </span>

                        <img
                            src={imageExample}
                            alt="Evento 1"
                            className="w-56 h-28 rounded-lg object-cover"
                        />

                        <div className="text-center text-sm">
                            <p className="text-pink-400 text-lg">⭐⭐⭐⭐☆</p>
                            <p>Número de participantes: 220</p>
                            <p>Número de votos: 160</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 ">
                        <span className="text-pink-500 text-2xl font-bold">
                            #3
                        </span>

                        <img
                            src={imageExample}
                            alt="Evento 1"
                            className="w-56 h-28 rounded-lg object-cover"
                        />

                        <div className="text-center  text-sm">
                            <p className="text-pink-400 text-lg">⭐⭐⭐☆☆</p>
                            <p>Número de participantes: 250</p>
                            <p>Número de votos: 195</p>
                        </div>
                    </div>
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
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className="min-w-[225px] bg-white p-4 rounded-lg shadow-md text-black"
                                >
                                    <img
                                        src={event.img}
                                        alt={event.title}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                    <h3 className="mt-3 text-lg font-semibold">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm">{event.date}</p>
                                </div>
                            ))}
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

            <section className="bg-black text-white px-10 py-10">
                {/* Preguntas Frecuentes */}
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
