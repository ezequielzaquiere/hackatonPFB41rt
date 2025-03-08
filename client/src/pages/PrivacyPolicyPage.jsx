import { Link } from 'react-router-dom';

// Inicializamos el componente.
const Privacy = () => {
    return (

          <div className="max-w-3xl text-center">
             <h2 className="text-3xl font-bold mb-4">Política de Privacidad de Hackverse</h2>
             <p className="mb-6 text-white">
             Fecha de entrada en vigor: 12 de Marzo de 2025.
            </p>
            <p className="mb-6 text-white">
            Hackverse se compromete a proteger la privacidad de sus usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos su información cuando accede a nuestra plataforma para participar en hackatones.
            </p>

             <h3 className="text-2xl font-semibold mt-6 mb-3">1. Información que recopilamos</h3>
             <p className="mb-6 text-white">
             Podemos recopilar los siguientes tipos de información:
            </p>
            <ul className="text-white text-left mx-auto w-fit list-disc list-inside">
                <li>Datos personales: Nombre, correo electrónico, teléfono, perfil en redes sociales y otra información que nos proporcione al registrarse en la plataforma.</li>
                <li>Información de uso: Datos sobre su actividad en nuestra plataforma, incluyendo eventos en los que participa y su interacción con otros usuarios.</li>
                <li>Datos técnicos: Dirección IP, tipo de navegador, sistema operativo y otras informaciones recopiladas a través de cookies y tecnologías similares.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">2. Cómo utilizamos su información</h3>
            <p className="mb-6 text-white">
            Utilizamos la información recopilada para:
            </p>
            <ul className="text-white text-left mx-auto w-fit list-disc list-inside">
                <li>Gestionar su registro y participación en hackatones.</li>
                <li>Enviar comunicaciones relacionadas con eventos y actualizaciones.</li>
                <li>Mejorar nuestra plataforma y la experiencia del usuario.</li>
                <li>Cumplir con obligaciones legales y de seguridad.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">3. Compartición de información</h3>
            <p className="mb-6 text-white">
            No compartimos su información personal con terceros, salvo en los siguientes casos:
            </p>
            <ul className="text-white text-left mx-auto w-fit list-disc list-inside">
                <li>Con organizadores de hackatones para la gestión del evento.</li>
                <li>Con proveedores de servicios que nos ayudan a operar la plataforma.</li>
                <li>Cuando sea requerido por ley o para proteger nuestros derechos.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">4. Seguridad de la información</h3>
            <p className="mb-6 text-white">
            Implementamos medidas de seguridad para proteger su información. Sin embargo, no podemos garantizar la seguridad absoluta de los datos transmitidos por Internet.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-3">5. Sus derechos</h3>
            <p className="mb-6 text-white">
            Usted tiene derecho a:
            </p>
            <ul className="text-white text-left mx-auto w-fit list-disc list-inside">
                <li>Acceder, corregir o eliminar su información personal.</li>
                <li>Retirar su consentimiento para el procesamiento de datos.</li>
                <li>Presentar una queja ante la autoridad de protección de datos correspondiente.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">6. Cambios en la Política de Privacidad</h3>
            <p className="mb-6 text-white">
            Podemos actualizar esta Política de Privacidad en cualquier momento. Le notificaremos sobre cambios importantes a través de nuestra plataforma o por correo electrónico.
            </p>

            <h3 className="text-2xl font-semibold mt-6 mb-3">7. Contacto</h3>
            <p className="mb-6 text-white">
            Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos en: [Correo electrónico de contacto].
            </p>

           <p className="text-lg font-semibold mt-8">Al utilizar nuestra plataforma, usted acepta los términos de esta Política de Privacidad.</p>
          </div>
        
      );
    };
      



export default Privacy;