import React from 'react';

import Navbar from './navbar';
import Footer from './footer';

const TerminosYCondiciones = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-6">Términos y Condiciones</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
          <p className="mb-4">
            Al utilizar los servicios de Air Tecs, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestros servicios.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Servicios Ofrecidos</h2>
          <p className="mb-4">
            Air Tecs ofrece servicios técnicos relacionados con el mantenimiento y reparación de aires acondicionados y refrigeradores. Nos reservamos el derecho de modificar o cancelar servicios en cualquier momento.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. Responsabilidad del Usuario</h2>
          <p className="mb-4">
            El usuario es responsable de proporcionar información precisa y actualizada. Air Tecs no se hace responsable de ningún daño o pérdida derivada de información incorrecta o inexacta proporcionada por el usuario.
          </p>

          <h2 className="text-2xl font-semibold mb-4">4. Pagos</h2>
          <p className="mb-4">
            Todos los pagos por los servicios deben realizarse a través de los métodos de pago aceptados. El usuario acepta pagar todas las tarifas y cargos asociados a los servicios solicitados.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Política de Cancelación</h2>
          <p className="mb-4">
            El usuario puede cancelar un servicio programado con al menos 24 horas de antelación. Si se cancela menos de 24 horas antes de la cita, nos reservamos el derecho de cobrar una tarifa de cancelación.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Limitación de Responsabilidad</h2>
          <p className="mb-4">
            En ningún caso Air Tecs será responsable por daños indirectos, incidentales o consecuentes que resulten del uso de nuestros servicios.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. Modificaciones de los Términos</h2>
          <p className="mb-4">
            Air Tecs se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor una vez publicadas en esta página.
          </p>

          <h2 className="text-2xl font-semibold mb-4">8. Ley Aplicable</h2>
          <p className="mb-4">
            Estos términos y condiciones se rigen por las leyes del país en el que opera Air Tecs.
          </p>

          <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
          <p className="mb-4">
            Si tienes alguna pregunta sobre estos términos, puedes contactarnos a través de nuestro correo electrónico: contacto@airtecs.com.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerminosYCondiciones;
