import { useEffect } from 'react';
const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-[#191919] text-white min-h-screen flex flex-col items-center py-10 px-10">
            <section className="w-screen flex justify-start px-20 py-5">
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl mt-3">
                        Términos y Condiciones de Hackverse
                    </h1>
                    <p className="text-base ml-10">
                        Fecha de entrada en vigor: 12 de Marzo de 2025.
                    </p>
                    <p className="text-base ml-10">
                        Bienvenido a Hackverse. Estos Términos y Condiciones
                        regulan el acceso y uso de nuestra plataforma. Al
                        registrarse y utilizar Hackverse, usted acepta estos
                        términos en su totalidad.
                    </p>

                    <h2 className="text-xl mt-10">1. Definiciones</h2>
                    <ul className="text-base ml-10 w-fit list-disc">
                        <li>Plataforma: Sitio web y servicios de Hackverse.</li>
                        <li>
                            Usuario: Cualquier persona que acceda y utilice
                            Hackverse.
                        </li>
                        <li>
                            Organizador: Entidad o persona que crea y gestiona
                            hackatones en la plataforma.
                        </li>
                        <li>Participante: Usuario inscrito en un hackatón.</li>
                    </ul>

                    <h2 className="text-xl mt-10">2. Uso de la Plataforma</h2>
                    <ul className="text-base ml-10 w-fit list-disc">
                        <li>
                            Hackverse proporciona un espacio para la
                            organización y participación en hackatones.
                        </li>
                        <li>
                            Los usuarios deben proporcionar información veraz y
                            mantener la confidencialidad de sus credenciales.
                        </li>
                        <li>
                            Se prohíbe el uso de la plataforma para actividades
                            ilegales o que infrinjan derechos de terceros.
                        </li>
                    </ul>

                    <h2 className="text-xl mt-10">
                        3. Registro y Participación en Hackatones
                    </h2>
                    <ul className="text-base ml-10 w-fit list-disc">
                        <li>
                            Para participar en un hackatón, los usuarios deben
                            registrarse y aceptar las reglas del evento.
                        </li>
                        <li>
                            Los organizadores pueden establecer requisitos
                            adicionales para sus eventos.
                        </li>
                    </ul>

                    <h2 className="text-xl mt-10">4. Propiedad Intelectual</h2>
                    <ul className="text-base ml-10 w-fit list-disc">
                        <li>
                            Los participantes conservan los derechos sobre sus
                            proyectos, salvo que el hackatón indique lo
                            contrario.
                        </li>
                        <li>
                            Los organizadores pueden solicitar permisos para
                            utilizar los proyectos desarrollados en sus eventos.
                        </li>
                    </ul>

                    <h2 className="text-xl mt-10">5. Responsabilidades</h2>
                    <ul className="text-base ml-10 w-fit list-disc">
                        <li>
                            Hackverse no se hace responsable por disputas entre
                            participantes y organizadores.
                        </li>
                        <li>
                            No garantizamos la disponibilidad continua de la
                            plataforma.
                        </li>
                    </ul>

                    <h2 className="text-xl mt-10">
                        6. Modificaciones a los Términos
                    </h2>
                    <p className="text-base ml-10">
                        Podemos actualizar estos términos en cualquier momento.
                        Los cambios serán notificados a través de la plataforma.
                    </p>

                    <h2 className="text-xl mt-10">7. Contacto</h2>
                    <p className="text-base ml-10">
                        Para consultas, contáctenos en:
                        hackverse.hackathones@gmail.com.
                    </p>

                    <p className="text-base mt-10 ml-10">
                        Al utilizar Hackverse, usted acepta estos Términos y
                        Condiciones.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Terms;
