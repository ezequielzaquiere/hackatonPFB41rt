import { Link } from 'react-router-dom';

// Inicializamos el componente.
const Cookies = () => {
    return (

          <div className="max-w-3xl text-center">
             <h2 className="text-3xl font-bold mb-4">Política de Cookies de Hackverse</h2>
             <p className="mb-6 text-white">
             Fecha de entrada en vigor: 12 de Marzo de 2025.
            </p>
            <p className="mb-6 text-white">
            Hackverse utiliza cookies y tecnologías similares para mejorar la experiencia del usuario en nuestra plataforma. Esta Política de Cookies explica qué son las cookies, cómo las usamos y cómo puede gestionarlas.
            </p>

             <h3 className="text-2xl font-semibold mt-6 mb-3">1. ¿Qué son las cookies?</h3>
             <p className="mb-6 text-white">
             Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan para recordar información sobre su visita y mejorar su experiencia de navegación.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-3">2. Tipos de cookies que utilizamos</h3>
            <ul className="text-white text-left mx-auto w-fit list-disc list-inside">
                <li>Cookies esenciales:Necesarias para el funcionamiento de la plataforma y para permitirle navegar y utilizar sus funciones.</li>
                <li>Cookies de rendimiento:Recopilan información sobre cómo los usuarios interactúan con la plataforma para mejorar su funcionamiento.</li>
                <li>Cookies de funcionalidad:Permiten recordar sus preferencias y personalizar su experiencia.</li>
                <li>Cookies de publicidad y terceros:Utilizadas para mostrar anuncios relevantes y medir la efectividad de las campañas publicitarias.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">3. Cómo utilizamos las cookies</h3>
            <p className="mb-6 text-white">
            Utilizamos cookies para:
            </p>
            <ul className="text-white text-left mx-auto w-fit list-disc list-inside">
                <li>Mejorar la seguridad y funcionalidad de la plataforma.</li>
                <li>Personalizar la experiencia del usuario.</li>
                <li>Analizar el tráfico y optimizar nuestros servicios.</li>
                <li>Mostrar contenido y publicidad relevante.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">4. Gestión de cookies</h3>
            <p className="mb-6 text-white">
            Puede gestionar sus preferencias de cookies a través de la configuración de su navegador. Tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de la plataforma.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-3">5. Cambios en la Política de Cookies</h3>
            <p className="mb-6 text-white">
            Podemos actualizar esta política en cualquier momento. Le notificaremos sobre cambios importantes a través de nuestra plataforma.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-3">6. Contacto</h3>
            <p className="mb-6 text-white">
            Si tiene preguntas sobre esta Política de Cookies, puede contactarnos en: [Correo electrónico de contacto].
            </p>

           <p className="text-lg font-semibold mt-8">Al utilizar nuestra plataforma, usted acepta los términos de esta Política de Privacidad.</p>
          </div>
        
      );
    };
      



export default Cookies;