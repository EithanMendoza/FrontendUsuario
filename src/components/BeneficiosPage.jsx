import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardCheck, FaBell, FaHistory, FaMoneyBillWave, FaArrowLeft, FaShieldAlt, FaTools, FaFan, FaSnowflake, FaWrench } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BeneficiosPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" ref={scrollRef}>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaArrowLeft className="mr-2" />
            Volver a la página principal
          </motion.button>
          <div className="flex space-x-4">
            {['proceso', 'servicios', 'precios', 'garantia'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-24">
        <motion.h1
          className="text-4xl lg:text-5xl font-bold text-blue-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Beneficios de Contratar Nuestros Servicios
        </motion.h1>

        <motion.p
          className="text-xl text-blue-700 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Descubre cómo nuestros servicios de mantenimiento y reparación de aires acondicionados y refrigeradores pueden hacer tu vida más fácil y cómoda.
        </motion.p>

        <div className="space-y-16">
          <Section
            id="proceso"
            title="Proceso Simplificado"
            icon={<FaClipboardCheck className="text-5xl text-blue-600 mb-4" />}
            content={[
              "Contrata un servicio fácilmente a través de nuestro formulario en línea.",
              "Un técnico capacitado aceptará tu solicitud de servicio rápidamente.",
              "Recibe actualizaciones en tiempo real sobre el progreso de tu servicio.",
              "Accede a un apartado de notificaciones para estar siempre informado.",
              "Consulta tu historial de servicios en cualquier momento."
            ]}
          />

          <Section
            id="servicios"
            title="Servicios Ofrecidos"
            icon={<FaTools className="text-5xl text-blue-600 mb-4" />}
            content={[
              { icon: <FaFan className="text-2xl text-blue-600 mr-2" />, text: "Mantenimiento de aires acondicionados" },
              { icon: <FaWrench className="text-2xl text-blue-600 mr-2" />, text: "Reparación de aires acondicionados" },
              { icon: <FaSnowflake className="text-2xl text-blue-600 mr-2" />, text: "Mantenimiento de refrigeradores" },
              { icon: <FaWrench className="text-2xl text-blue-600 mr-2" />, text: "Reparación de refrigeradores" },
              { icon: <FaTools className="text-2xl text-blue-600 mr-2" />, text: "Servicio realizado por técnicos altamente capacitados y certificados" }
            ]}
          />

          <Section
            id="precios"
            title="Precios Transparentes"
            icon={<FaMoneyBillWave className="text-5xl text-blue-600 mb-4" />}
            content={[
              "Tarifa fija de $850 por servicio, sin sorpresas ni costos ocultos.",
              "Ofrecemos descuentos especiales para clientes frecuentes.",
              "Pago seguro y conveniente a través de nuestra plataforma.",
              "Recibe una factura detallada por cada servicio realizado.",
              "Ofertas y promociones exclusivas para nuestros clientes."
            ]}
          />

          <Section
            id="garantia"
            title="Garantía y Seguridad"
            icon={<FaShieldAlt className="text-5xl text-blue-600 mb-4" />}
            content={[
              "Garantía de un mes en todos nuestros servicios.",
              "Técnicos verificados y de confianza.",
              "Seguimiento post-servicio para asegurar tu satisfacción.",
              "Atención al cliente disponible para resolver cualquier duda o problema.",
              "Compromiso con la calidad y la excelencia en cada servicio."
            ]}
          />
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Contratar Servicio
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ id, title, icon, content }) => {
  return (
    <motion.div
      id={id}
      className="scroll-section bg-white rounded-lg shadow-lg p-8 transition-all duration-300 ease-in-out hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-3 mr-4">
          {icon}
        </div>
        <h2 className="text-3xl font-semibold text-blue-800">{title}</h2>
      </div>
      <ul className="space-y-4">
        {content.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {item.icon ? (
              <>
                {item.icon}
                <span className="text-gray-700">{item.text}</span>
              </>
            ) : (
              <>
                <span className="text-blue-600 mr-2 text-lg">•</span>
                <span className="text-gray-700">{item}</span>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default BeneficiosPage;

