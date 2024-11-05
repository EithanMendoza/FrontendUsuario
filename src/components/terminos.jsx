import React from 'react';

const TerminosYCondiciones = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">Términos y Condiciones</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">1. Generalidades</h2>
        <p className="text-gray-700 leading-relaxed">
          Este documento establece los términos y condiciones para el uso de los servicios técnicos de mantenimiento y reparación proporcionados por nuestra empresa.
          Al utilizar nuestros servicios, el cliente acepta estos términos en su totalidad.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">2. Descripción de los Servicios</h2>
        <p className="text-gray-700 leading-relaxed">
          Ofrecemos servicios de reparación, mantenimiento, instalación y asesoría técnica para equipos de aire acondicionado y refrigeración. 
          Nuestros técnicos están certificados y capacitados para trabajar con diversas marcas y modelos, asegurando la calidad en cada intervención.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">3. Obligaciones del Cliente</h2>
        <p className="text-gray-700 leading-relaxed">
          El cliente se compromete a proporcionar acceso adecuado al lugar donde se realizará el servicio y a informar cualquier problema previo en el equipo.
          Además, el cliente deberá seguir las recomendaciones de mantenimiento posterior que indique el técnico.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">4. Garantía de los Servicios</h2>
        <p className="text-gray-700 leading-relaxed">
          Todos los servicios de mano de obra están garantizados por un período de 30 días a partir de la fecha de finalización. 
          Las piezas reemplazadas cuentan con una garantía de hasta 1 año, dependiendo del fabricante. 
          La garantía no cubre daños ocasionados por mal uso o manipulación posterior del equipo.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">5. Política de Cancelación</h2>
        <p className="text-gray-700 leading-relaxed">
          El cliente puede cancelar o reprogramar el servicio sin costo adicional si la solicitud se realiza con al menos 24 horas de antelación. 
          Para cancelaciones o cambios dentro de las 24 horas previas al servicio, podrá aplicarse una tarifa por cancelación.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">6. Limitaciones de Responsabilidad</h2>
        <p className="text-gray-700 leading-relaxed">
          No nos hacemos responsables por daños indirectos o consecuentes que surjan del uso de nuestros servicios. 
          Nuestra responsabilidad se limita al valor del servicio contratado, salvo en casos de negligencia o mala conducta por parte de nuestros técnicos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">7. Modificación de Términos</h2>
        <p className="text-gray-700 leading-relaxed">
          Nos reservamos el derecho de modificar estos términos en cualquier momento. 
          Se notificará a los clientes sobre cambios significativos a través de nuestro sitio web o por correo electrónico.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">8. Contacto</h2>
        <p className="text-gray-700 leading-relaxed">
          Si tienes alguna pregunta o comentario sobre estos términos, no dudes en contactarnos a través de nuestro correo electrónico: contacto@airtecs.com.
        </p>
      </section>

      <p className="text-gray-500 mt-8 text-center">
        &copy; 2024 Air Tec's. Todos los derechos reservados.
      </p>
    </div>
  );
};

export default TerminosYCondiciones;
