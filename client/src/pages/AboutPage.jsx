import { Link } from 'react-router-dom';

// Inicializamos el componente.
const About = () => {
    return (
        <div className="bg-[#191919] text-white min-h-screen flex flex-col items-center py-12 px-6">
          <div className="grid grid-cols-3 gap-6 mb-12">
            {["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg", "user5.jpg", "user6.jpg"].map((img, index) => (
              <img
                key={index}
                src={`/images/${img}`}
                alt={`Miembro ${index + 1}`}
                className="w-24 h-24 md:w-32 md:h-32"
              />
            ))}
          </div>

          <div className="max-w-3xl text-center">
             <h2 className="text-3xl font-bold mb-4">¿Quiénes somos?</h2>
             <p className="mb-6 text-white">
                Hackverse es una plataforma innovadora dedicada a la organización y promoción de hackatones. Creemos en el poder de la colaboración, 
                la creatividad y la tecnología para resolver problemas del mundo real.
            </p>

             <h3 className="text-2xl font-semibold mt-6 mb-3">¿Qué es un Hackatón?</h3>
             <p className="mb-6 text-white">
             Un hackatón es un evento de programación intensivo donde equipos multidisciplinarios trabajan en la creación de soluciones innovadoras 
             en un tiempo limitado.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Beneficios de Participar en un Hackatón</h3>
            <ul className="text-white text-left mx-auto w-fit list-disc list-inside">
                <li>Aprendizaje acelerado y mejora de habilidades.</li>
                <li>Networking con profesionales del sector.</li>
                <li>Exploración de ideas creativas e innovadoras.</li>
                <li>Premios y reconocimiento profesional.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Nuestra Plataforma</h3>
            <p className="mb-6 text-white">
            Hackverse facilita la organización y participación en hackatones de manera sencilla. Regístrate y explora eventos de todo el mundo.
            </p>

           <p className="text-lg font-semibold mt-8">Descubre. Crea. Innova. ¡Bienvenido a Hackverse!</p>
          </div>
        </div> 
      );
    };
      



export default About;
