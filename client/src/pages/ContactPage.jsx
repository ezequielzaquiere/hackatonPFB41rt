import { Link } from 'react-router-dom';

// Inicializamos el componente.
const Contact = () => {
    return (

          <div className="max-w-3xl text-center">
             <h2 className="text-3xl font-bold mb-4">Contáctanos - Hackverse</h2>
             <p className="mb-6 text-white">
             ¿Tienes dudas, sugerencias o necesitas ayuda? En Hackverse estamos aquí para escucharte y brindarte el soporte que necesites.
            </p>

             <h3 className="text-2xl font-semibold mt-6 mb-3">Información de Contacto</h3>
             <p className="mb-6 text-white">
             📧Correo Electrónico:[correo@hackverse.com]
            </p>
            <p className="text-lg font-semibold mt-8">Para cualquier consulta, escríbenos a nuestro correo electrónico y te responderemos lo antes posible.</p>
            

           <p className="text-lg font-semibold mt-8">Estamos aquí para ayudarte y construir juntos una comunidad de innovación. ¡No dudes en contactarnos!</p>
          </div>
        
      );
    };
      



export default Contact;