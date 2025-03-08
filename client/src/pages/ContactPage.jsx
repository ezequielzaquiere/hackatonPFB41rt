const Contact = () => {
    return (
        <div className="bg-[#191919] text-white min-h-screen flex flex-col items-center py-10 px-10 text-center">
            <section className="w-screen flex justify-start px-10 py-5">
                <div className="flex flex-col gap-10">
                    <div className="flex justify-center">
                        <img src="/logo.png" className="w-20" />
                    </div>
                    <h1 className="text-2xl mt-3 text-center">Contáctanos</h1>
                    <p className="text-base ml-10">
                        ¿Tienes dudas, sugerencias o necesitas ayuda? En
                        Hackverse estamos aquí para escucharte y brindarte el
                        soporte que necesites.
                    </p>

                    <h2 className="text-xl mt-10">Información de Contacto</h2>
                    <p className="text-base ml-10">
                        📧 Correo Electrónico:{' '}
                        <a
                            href="mailto:hackverse.hackathones@gmail.com"
                            className="text-blue-400 hover:underline"
                        >
                            hackverse.hackathones@gmail.com
                        </a>
                    </p>

                    <p className="text-base ml-10">
                        Para cualquier consulta, escríbenos a nuestro correo
                        electrónico y te responderemos lo antes posible.
                    </p>

                    <p className="text-base mt-10 ml-10">
                        Estamos aquí para ayudarte y construir juntos una
                        comunidad de innovación. ¡No dudes en contactarnos!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Contact;
