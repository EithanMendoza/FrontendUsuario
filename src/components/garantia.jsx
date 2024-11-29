import React from 'react';
import { ArrowLeft, Shield, Clock, Phone, Mail, MessageSquare, MapPin } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Garantia = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-16 flex-grow">
        <h1 className="text-5xl font-bold text-blue-900 mb-12 text-center">
          Nuestra Garantía de Servicio
        </h1>
        
        {/* Información de la garantía */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-12 border border-blue-100 transform hover:scale-105 transition-transform duration-300">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-blue-600" />
            </div>
            <p className="text-xl text-gray-700 mb-6 text-center">
              En Air Tec, tu satisfacción es nuestra prioridad. Respaldamos nuestro compromiso con la calidad a través de nuestra sólida garantía de servicio.
            </p>
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-12 h-12 text-blue-500 mr-4" />
              <p className="text-2xl font-semibold text-blue-800">
                Garantía de 1 mes en todos nuestros servicios
              </p>
            </div>
            <p className="text-lg text-gray-600 mb-6 text-center">
              Todos los servicios realizados por nuestros técnicos expertos están cubiertos por una garantía completa durante un mes después del servicio.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-md text-blue-800">
                Si experimentas algún inconveniente con los servicios realizados, no dudes en contactarnos. Nuestro equipo de soporte está listo para asistirte y resolver cualquier problema de manera rápida y eficiente.
              </p>
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-12 border border-blue-100">
          <div className="p-8">
            <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">¿Necesitas ayuda? Estamos aquí para ti</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ContactItem icon={Phone} label="Teléfono" value="+52 9993487512" />
              <ContactItem icon={Mail} label="Correo Electrónico" value="contacto@airtecs.com" />
              <ContactItem icon={MessageSquare} label="Atención inmediata" value="soporte@airtecs.com" />
              <ContactItem icon={MapPin} label="Dirección" value="Calle 60 123 Col. Centro, Mérida, Yucatán" />
            </div>
          </div>
        </div>
      </div>

      {/* Botón para regresar */}
      <div className="fixed top-24 left-4 z-10">
        <button
          onClick={() => window.history.back()}
          className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full shadow-md transition duration-300 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Regresar
        </button>
      </div>

      <Footer />
    </div>
  );
}

const ContactItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
    <Icon className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="text-blue-600">{value}</p>
    </div>
  </div>
);

export default Garantia;

