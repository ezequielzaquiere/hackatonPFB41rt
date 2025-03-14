import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="bg-[#191919] shadow-sm px-20 py-10">
                <div className="bg-[#191919] w-full">
                    <div className="flex flex-col justify-between ">
                        <a href="#" className="mb-4 flex items-center">
                            <img
                                src="/logo.png"
                                className="h-8"
                                alt="Flowbite Logo"
                            />
                            <span className="text-white text-2xl pl-2 self-center ">
                                HackVerse®
                            </span>
                        </a>
                        <ul
                            className="text-[white] text-sm mt-2 flex flex-col gap-3 md:mt-5 md:flex-row md:justify-around
                        "
                        >
                            <li className="transition hover:scale-115">
                                <Link to="/about">Sobre nosotros</Link>
                            </li>
                            <li className="transition hover:scale-115">
                                <Link to="/privacy-policy">
                                    Política de privacidad
                                </Link>
                            </li>
                            <li className="transition hover:scale-115">
                                <Link to="/cookies-policy">
                                    Política de cookies
                                </Link>
                            </li>
                            <li className="transition hover:scale-115">
                                <Link to="/terms-and-conditions">
                                    Términos y condiciones
                                </Link>
                            </li>
                            <li className="transition hover:scale-115">
                                <Link to="/contact">Contacto</Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="border-t border-[#ffffff] mt-6 mb-3 text-center" />
                    <span className="block text-white text-center w-full text-sm ">
                        © 2025 HackVerse . All Rights Reserved.
                    </span>
                </div>
            </footer>
        </>
    );
};
export default Footer;
