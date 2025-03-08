const Footer = () => {
    return (
        <>
            <footer className="bg-[#191919] shadow-sm p-4">
                <div className="bg-[#191919] rounded-xl w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a
                            href="#"
                            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src="/logo.png"
                                className="h-8"
                                alt="Flowbite Logo"
                            />
                            <span className=" text-white self-center text-2xl font-semibold whitespace-nowrap">
                                HackVerse®
                            </span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm text-[white] sm:mb-0">
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline me-4 md:me-6"
                                >
                                    Sobre nosotros
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline me-4 md:me-6"
                                >
                                    Política de Privacidad
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline me-4 md:me-6"
                                >
                                    Política de Cookies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Términos y Condiciones
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                    <hr className="border-t border-[#191919] my-6 lg:my-8" />
                    <span className="block text-sm text-white sm:text-center">
                        © 2025{' '}
                        <a
                            href="https://flowbite.com/"
                            className="hover:underline"
                        >
                            HackVerse
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </footer>
        </>
    );
};
export default Footer;
