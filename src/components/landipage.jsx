import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTools, FaSnowflake, FaFan, FaThermometerHalf, FaFacebook, FaInstagram, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { FaShieldAlt } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import navbar from '../assets/navbar-logo.png';
import tecnico from '../assets/tecnico.png';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const navigate = useNavigate();

  const sectionRefs = {
    inicio: useRef(null),
    servicios: useRef(null),
    'sobre-nosotros': useRef(null),
    'preguntas-frecuentes': useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const currentPosition = window.scrollY + 100;
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current && ref.current.offsetTop <= currentPosition && 
            ref.current.offsetTop + ref.current.offsetHeight > currentPosition) {
          setActiveSection(key);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId].current;
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Cuál es el tiempo promedio de respuesta para una solicitud de servicio?",
      answer: "Nuestro tiempo promedio de respuesta es de 2 a 4 horas hábiles. Para emergencias, contamos con un servicio de atención prioritaria."
    },
    {
      question: "¿Ofrecen garantía en sus servicios?",
      answer: "Sí, todos nuestros servicios cuentan con una garantía de 30 días en mano de obra y hasta 1 año en piezas reemplazadas, dependiendo del fabricante."
    },
    {
      question: "¿Trabajan con todas las marcas de aires acondicionados y refrigeradores?",
      answer: "Sí, nuestros técnicos están capacitados para trabajar con todas las marcas principales del mercado. Si tienes alguna marca específica, no dudes en consultarnos."
    },
    {
      question: "¿Cuál es el costo de una visita técnica?",
      answer: "El costo de la visita técnica varía según la ubicación y el tipo de servicio requerido. Sin embargo, si decides proceder con el servicio, el costo de la visita se descuenta del total."
    },
    {
      question: "¿Ofrecen servicios de mantenimiento preventivo?",
      answer: "Sí, ofrecemos planes de mantenimiento preventivo personalizados para hogares y empresas. Estos planes ayudan a prolongar la vida útil de tus equipos y prevenir costosas reparaciones."
    }
  ];

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img src={navbar} alt="Air Tec's Logo" className="w-44 h-16 object-contain" />
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-10">
            {['Inicio', 'Servicios', 'Sobre Nosotros', 'Preguntas Frecuentes'].map((item, index) => (
              <motion.a
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className={`text-gray-800 font-semibold hover:text-blue-600 transition duration-300 text-base cursor-pointer
                            ${activeSection === item.toLowerCase().replace(' ', '-') ? 'text-blue-600' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:flex space-x-4">
            <motion.button
              onClick={() => navigate('/login')} // Redirige a Login
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Sesión
            </motion.button>
          </div>

          <button
            className="lg:hidden text-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="lg:hidden bg-white/95 backdrop-blur-sm shadow-lg py-6 absolute top-full w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center space-y-4">
                {['Inicio', 'Servicios', 'Sobre Nosotros', 'Preguntas Frecuentes'].map((item) => (
                  <a
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className={`text-gray-800 font-semibold hover:text-blue-600 transition duration-300 cursor-pointer
                                ${activeSection === item.toLowerCase().replace(' ', '-') ? 'text-blue-600' : ''}`}
                  >
                    {item}
                  </a>
                ))}
                <div className="w-full px-4 space-y-3 pt-4">
                  <button 
                    onClick={() => navigate('/login')} // Redirige a Login
                    className="w-full px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={() => navigate('/login')} // Redirige a Login también
                    className="w-full px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
                  >
                    Contratar Servicio
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={sectionRefs.inicio} className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-20">
            <motion.div
              className="text-center lg:text-left mb-10 lg:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-bold text-4xl lg:text-6xl leading-tight mb-6 text-blue-900">
                Servicios técnicos confiables y de calidad
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Encuentra profesionales capacitados para reparar y mantener tus equipos de aire acondicionado y refrigeración. ¡La mejor calidad y rapidez, a tu disposición!
              </p>
              <motion.button
                onClick={() => navigate('/login')} // Redirige a Login
                className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Que la chupe Avila
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img 
                src={tecnico} 
                alt="Técnico de Air Tec's" 
                className="w-full h-auto max-w-md mx-auto object-contain" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={sectionRefs['sobre-nosotros']} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-semibold text-lg mb-4 block">Por qué elegirnos</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-4">Características de Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">La confianza y experiencia que necesitas para mantener tus equipos funcionando perfectamente</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Transparencia", icon: <AiOutlineEye size={50} className="text-blue-600" />, desc: "Condiciones claras y justas en cada servicio." },
              { title: "Confiabilidad", icon: <FaShieldAlt size={50} className="text-blue-600" />, desc: "Profesionales con experiencia comprobada." },
              { title: "Eficiencia", icon: <IoMdSpeedometer size={50} className="text-blue-600" />, desc: "Servicios rápidos para tu comodidad." },
            ].map(({ title, icon, desc }, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
                    {icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRefs.servicios} className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-semibold text-lg mb-4 block">Nuestros Servicios</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-4">Soluciones Profesionales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Expertos en mantenimiento y reparación de sistemas de climatización</p>
          </motion.div>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Mantenimiento de Aires Acondicionados", desc: "Mantenimiento preventivo y correctivo de sistemas de aire acondicionado.", icon: <FaFan size={40} className="text-blue-600" /> },
              { title: "Reparación de Aires Acondicionados", desc: "Servicio especializado en reparación de equipos de aire acondicionado.", icon: <FaTools size={40} className="text-blue-600" /> },
              { title: "Mantenimiento de Refrigeradores", desc: "Servicios de mantenimiento para mantener refrigeradores en óptimas condiciones.", icon: <FaSnowflake size={40} className="text-blue-600" /> },
              { title: "Reparación de Refrigeradores", desc: "Reparaciones rápidas y efectivas para refrigeradores.", icon: <FaThermometerHalf size={40} className="text-blue-600" /> },
              { title: "Instalación de Equipos", desc: "Instalación profesional de aires acondicionados y sistemas de refrigeración.", icon: <FaTools size={40} className="text-blue-600" /> },
              { title: "Asesoría Técnica", desc: "Consultoría experta para la elección y uso eficiente de equipos.", icon: <AiOutlineEye size={40} className="text-blue-600" /> },
            ].map(({ title, desc, icon }, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                    {icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">{title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={sectionRefs['preguntas-frecuentes']} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-semibold text-lg mb-4 block">Dudas Comunes</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Encuentra respuestas a las preguntas más comunes sobre nuestros servicios</p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg text-blue-900 bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {activeFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-4 rounded-b-lg border-t border-blue-100"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* CTA Section */}
<section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
  <div className="container mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl lg:text-5xl font-bold mb-6">¿Listo para mejorar tu confort?</h2>
      <p className="text-xl mb-8 text-blue-100">Contrata nuestros servicios y disfruta de la mejor atención técnica</p>
      <motion.button
        onClick={() => navigate('/login')} // Redirige a la página de login
        className="px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-full shadow-lg hover:bg-blue-50 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Solicitar Servicio
      </motion.button>
    </motion.div>
  </div>
</section>


{/* Footer */}
<footer className="bg-blue-900 text-white py-16">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <img src={navbar} alt="Air Tec's Logo" className="w-44 h-16 object-contain mb-6" />
        <p className="text-blue-200 mb-6 leading-relaxed">
          Encuentra técnicos confiables para mantenimiento y reparaciones en tu hogar o negocio. ¡Estamos aquí para ayudarte!
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-blue-200 hover:text-white transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-blue-200 hover:text-white transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-blue-200 hover:text-white transition duration-300">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/3 mb-8 md:mb-0">
        <h4 className="text-xl font-semibold mb-6">Enlaces Rápidos</h4>
        <ul className="space-y-3">
          {['Inicio', 'Servicios', 'Sobre Nosotros', 'Preguntas Frecuentes'].map((item) => (
            <li key={item}>
              <a 
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-blue-200 hover:text-white transition duration-300 cursor-pointer"
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a
              onClick={() => navigate('/terminos')} // Redirige a Términos y Condiciones
              className="text-blue-200 hover:text-white transition duration-300 cursor-pointer"
            >
              Términos y Condiciones
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-1/3">
        <h4 className="text-xl font-semibold mb-6">Contáctanos</h4>
        <p className="text-blue-200 mb-3">Email: contacto@airtecs.com</p>
        <p className="text-blue-200 mb-3">Teléfono: +52 9993487512</p>
        <p className="text-blue-200">Dirección: Calle 60 123 Col. Centro, Mérida, Yucatán</p>
      </div>
    </div>
    <div className="border-t border-blue-800 mt-12 pt-8 text-center">
      <p className="text-blue-200">&copy; 2024 Air Tec's. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
</div>
  );
};

export default LandingPage;
