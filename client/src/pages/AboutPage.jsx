import { useEffect } from 'react';
const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-[#191919] text-white min-h-screen flex flex-col items-center py-10 px-10">
            <section className="flex flex-wrap justify-center gap-10 mb-15 mt-10">
                {[
                    'ezequiel.png',
                    'cris.png',
                    'nacho.png',
                    'santi.png',
                    'jesus.png',
                    'liss.png',
                ].map((image) => (
                    <img
                        key={image}
                        src={`/${image}`}
                        className="min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] md:w-32 md:h-32"
                    />
                ))}
            </section>

            <section className="w-screen flex justify-start px-10 py-5">
                <div className="flex flex-col gap-5 md:justify-">
                    <h2 className="text-3xl mt-3">¿Quiénes somos?</h2>
                    <p className="text-white ml-10 ">
                        Hackverse es una plataforma innovadora dedicada a la
                        organización y promoción de hackatones. Creemos en el
                        poder de la colaboración, la creatividad y la tecnología
                        para resolver problemas del mundo real.
                    </p>

                    <h3 className="text-2xl mt-10">¿Qué es un Hackathon?</h3>
                    <p className=" text-white ml-10 ">
                        Un hackathon es un evento de programación intensivo
                        donde equipos multidisciplinarios trabajan en la
                        creación de soluciones innovadoras en un tiempo
                        limitado.
                    </p>

                    <h3 className="text-2xl mt-10">
                        Beneficios de Participar en un Hackathon
                    </h3>
                    <ul className="text-white text-left ml-10 w-fit list-disc">
                        <li>Aprendizaje acelerado y mejora de habilidades.</li>
                        <li>Networking con profesionales del sector.</li>
                        <li>Exploración de ideas creativas e innovadoras.</li>
                        <li>Premios y reconocimiento profesional.</li>
                    </ul>

                    <h3 className="text-2xl mt-10">Nuestra Plataforma</h3>
                    <p className="text-white ml-10 ">
                        Hackverse facilita la organización y participación en
                        hackatones de manera sencilla. Regístrate y explora
                        eventos de todo el mundo.
                    </p>

                    <p className="text-lg mt-10 ml-10 ">
                        Descubre. Crea. Innova. ¡Bienvenido a Hackverse!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
