import { useEffect } from 'react';
const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-[#191919] text-white min-h-screen flex flex-col items-center py-10 px-10">
            <section className="min-w-screen flex justify-start px-20 py-5">
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl mt-3">
                        Política de Privacidad de Hackverse
                    </h2>
                    <p className="ml-10">
                        Fecha de entrada en vigor: 12 de Marzo de 2025.
                    </p>
                    <p className="ml-10">
                        Hackverse se compromete a proteger la privacidad de sus
                        usuarios. Esta Política de Privacidad describe cómo
                        recopilamos, usamos, compartimos y protegemos su
                        información cuando accede a nuestra plataforma para
                        participar en hackatones.
                    </p>

                    <h3 className="text-xl mt-10">
                        1. Información que recopilamos
                    </h3>
                    <p className="ml-10">
                        Podemos recopilar los siguientes tipos de información:
                    </p>
                    <ul className="ml-10 w-fit list-disc">
                        <li>
                            Datos personales: Nombre, correo electrónico,
                            teléfono, perfil en redes sociales y otra
                            información que nos proporcione al registrarse en la
                            plataforma.
                        </li>
                        <li>
                            Información de uso: Datos sobre su actividad en
                            nuestra plataforma, incluyendo eventos en los que
                            participa y su interacción con otros usuarios.
                        </li>
                        <li>
                            Datos técnicos: Dirección IP, tipo de navegador,
                            sistema operativo y otras informaciones recopiladas
                            a través de cookies y tecnologías similares.
                        </li>
                    </ul>

                    <h3 className="text-xl mt-10">
                        2. Cómo utilizamos su información
                    </h3>
                    <p className="ml-10">
                        Utilizamos la información recopilada para:
                    </p>
                    <ul className="ml-10 w-fit list-disc">
                        <li>
                            Gestionar su registro y participación en hackatones.
                        </li>
                        <li>
                            Enviar comunicaciones relacionadas con eventos y
                            actualizaciones.
                        </li>
                        <li>
                            Mejorar nuestra plataforma y la experiencia del
                            usuario.
                        </li>
                        <li>
                            Cumplir con obligaciones legales y de seguridad.
                        </li>
                    </ul>

                    <h3 className="text-xl mt-10">
                        3. Compartición de información
                    </h3>
                    <p className="ml-10">
                        No compartimos su información personal con terceros,
                        salvo en los siguientes casos:
                    </p>
                    <ul className="ml-10 w-fit list-disc">
                        <li>
                            Con organizadores de hackatones para la gestión del
                            evento.
                        </li>
                        <li>
                            Con proveedores de servicios que nos ayudan a operar
                            la plataforma.
                        </li>
                        <li>
                            Cuando sea requerido por ley o para proteger
                            nuestros derechos.
                        </li>
                    </ul>

                    <h3 className="text-xl mt-10">
                        4. Seguridad de la información
                    </h3>
                    <p className="ml-10">
                        Implementamos medidas de seguridad para proteger su
                        información. Sin embargo, no podemos garantizar la
                        seguridad absoluta de los datos transmitidos por
                        Internet.
                    </p>

                    <h3 className="text-2xl mt-10">5. Sus derechos</h3>
                    <p className="ml-10">Usted tiene derecho a:</p>
                    <ul className="ml-10 w-fit list-disc">
                        <li>
                            Acceder, corregir o eliminar su información
                            personal.
                        </li>
                        <li>
                            Retirar su consentimiento para el procesamiento de
                            datos.
                        </li>
                        <li>
                            Presentar una queja ante la autoridad de protección
                            de datos correspondiente.
                        </li>
                    </ul>

                    <h3 className="text-xl mt-10">
                        6. Cambios en la Política de Privacidad
                    </h3>
                    <p className="ml-10">
                        Podemos actualizar esta Política de Privacidad en
                        cualquier momento. Le notificaremos sobre cambios
                        importantes a través de nuestra plataforma o por correo
                        electrónico.
                    </p>

                    <h3 className="text-xl mt-10">7. Contacto</h3>
                    <p className="ml-10">
                        Si tiene preguntas sobre esta Política de Privacidad,
                        puede contactarnos en: hackverse.hackathones@gmail.com.
                    </p>

                    <p className="mt-10 ml-10">
                        Al utilizar nuestra plataforma, usted acepta los
                        términos de esta Política de Privacidad.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
