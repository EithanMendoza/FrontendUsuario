import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react'; // Importar ChevronRight
import { Link } from 'react-router-dom'; // Importar Link para navegación
import Navbar from '../components/navbar';
import Footer from '../components/footer'; // Asegúrate de que esta ruta sea correcta

export default function Component() {
  const [completedServices, setCompletedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompletedServices();
  }, []);

  const fetchCompletedServices = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        setError('Token de sesión no encontrado. Inicia sesión nuevamente.');
        setIsLoading(false);
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL; 
      const response = await axios.get(`${apiUrl}/finalizacion/finalizados`, {
        headers: { Authorization: token }
      });

      setCompletedServices(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching completed services:', err);
      if (err.response && err.response.status === 401) {
        setError('No autorizado. Por favor, inicia sesión nuevamente.');
      } else {
        setError('Error al obtener el historial de servicios.');
      }
      setCompletedServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-24 flex-grow">
        <h1 className="text-4xl font-bold text-blue-900 mb-10 text-center">Historial de Servicios</h1>
        
        {completedServices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-l-4 border-blue-500 text-blue-800 px-8 py-6 rounded-lg flex items-center justify-center shadow-md max-w-2xl mx-auto"
          >
            <AlertCircle className="w-8 h-8 mr-4 text-blue-500" />
            <span className="text-lg font-medium">{error || 'No hay servicios completados en tu historial.'}</span>
          </motion.div>
        ) : (
          <AnimatePresence>
            {completedServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-blue-900">{service.nombre_servicio}</h2>
                    <span className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Completado
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-4">
                    <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">{new Date(service.fecha).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">{service.hora}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-blue-50 p-2 rounded-lg mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="font-medium">{service.direccion}</span>
                  </div>
                  {service.detalles && (
                    <div className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-blue-900 mb-2">Detalles del servicio:</p>
                      <p className="italic">{service.detalles}</p>
                    </div>
                  )}
                  <Link
                    to="/garantia"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200 mt-4"
                  >
                    <span className="mr-2">Ver Garantía</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <Footer /> {/* Agregado el Footer aquí */}
    </div>
  );
}
