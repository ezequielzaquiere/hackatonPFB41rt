import { useEffect } from 'react';
const Cookies = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-[#191919] text-white min-h-screen flex flex-col items-center py-15">
            <section className="w-screen flex justify-start px-20">
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl mt-3">
                        Política de Cookies de Hackverse
                    </h1>
                    <p className="text-base ml-10">
                        Fecha de entrada en vigor: 12 de Marzo de 2025.
                    </p>
                    <p className="text-base ml-10">
                        Hackverse utiliza cookies y tecnologías similares para
                        mejorar la experiencia del usuario en nuestra
                        plataforma. Esta Política de Cookies explica qué son las
                        cookies, cómo las usamos y cómo puede gestionarlas.
                    </p>

                    <h2 className="text-xl mt-10">1. ¿Qué son las cookies?</h2>
                    <p className="text-base ml-10">
                        Las cookies son pequeños archivos de texto que se
                        almacenan en su dispositivo cuando visita un sitio web.
                        Se utilizan para recordar información sobre su visita y
                        mejorar su experiencia de navegación.
                    </p>

                    <h2 className="text-xl mt-10">
                        2. Tipos de cookies que utilizamos
                    </h2>
                    <ul className="text-base ml-10 w-fit list-disc">
                        <li>
                            Cookies esenciales: Necesarias para el
                            funcionamiento de la plataforma y para permitirle
                            navegar y utilizar sus funciones.
                        </li>
                        <li>
                            Cookies de rendimiento: Recopilan información sobre
                            cómo los usuarios interactúan con la plataforma para
                            mejorar su funcionamiento.
                        </li>
                        <li>
                            Cookies de funcionalidad: Permiten recordar sus
                            preferencias y personalizar su experiencia.
                        </li>
                        <li>
                            Cookies de publicidad y terceros: Utilizadas para
                            mostrar anuncios relevantes y medir la efectividad
                            de las campañas publicitarias.
                        </li>
                    </ul>

                    <h2 className="text-xl mt-10">
                        3. Cómo utilizamos las cookies
                    </h2>
                    <p className="text-base ml-10">Utilizamos cookies para:</p>
                    <ul className="text-base ml-10 w-fit list-disc">
                        <li>
                            Mejorar la seguridad y funcionalidad de la
                            plataforma.
                        </li>
                        <li>Personalizar la experiencia del usuario.</li>
                        <li>
                            Analizar el tráfico y optimizar nuestros servicios.
                        </li>
                        <li>Mostrar contenido y publicidad relevante.</li>
                    </ul>

                    <h2 className="text-xl mt-10">4. Gestión de cookies</h2>
                    <p className="text-base ml-10">
                        Puede gestionar sus preferencias de cookies a través de
                        la configuración de su navegador. Tenga en cuenta que
                        deshabilitar ciertas cookies puede afectar la
                        funcionalidad de la plataforma.
                    </p>

                    <h2 className="text-xl mt-10">
                        5. Cambios en la Política de Cookies
                    </h2>
                    <p className="text-base ml-10">
                        Podemos actualizar esta política en cualquier momento.
                        Le notificaremos sobre cambios importantes a través de
                        nuestra plataforma.
                    </p>

                    <h2 className="text-xl mt-10">6. Contacto</h2>
                    <p className="text-base ml-10">
                        Si tiene preguntas sobre esta Política de Cookies, puede
                        contactarnos en: hackverse.hackathones@gmail.com.
                    </p>

                    <p className="text-base mt-10 ml-10">
                        Al utilizar nuestra plataforma, usted acepta los
                        términos de esta Política de Cookies.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Cookies;
