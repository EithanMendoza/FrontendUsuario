import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PedidoCompletado({ orderNumber }) {
  const navigate = useNavigate();
  
  // Renombramos el estado local para evitar colisión con la prop
  const [localOrderNumber, setLocalOrderNumber] = useState('');

  useEffect(() => {
    // Si no hay un orderNumber en las props, genera uno aleatorio
    if (!orderNumber) {
      const randomOrderNumber = Math.floor(Math.random() * 900000) + 100000;
      setLocalOrderNumber(randomOrderNumber);
    }
  }, [orderNumber]);

  // Usamos `orderNumber` si está disponible en las props, de lo contrario, usamos el generado
  const displayOrderNumber = orderNumber || localOrderNumber;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full border border-blue-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
        >
          ¡Pedido Completado!
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-2xl p-6 mb-8"
        >
          <p className="text-lg text-blue-800 mb-2">Tu número de orden es:</p>
          <p className="text-4xl font-bold text-blue-600">{displayOrderNumber}</p>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-8"
        >
          Gracias por confiar en nuestros servicios. Hemos recibido tu solicitud y la estamos procesando.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-600">Fecha estimada: 24/05/2023</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-600">Hora estimada: 14:00 - 16:00</span>
          </div>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/home')}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-200 flex items-center justify-center"
          >
            Volver al Inicio
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/servicios')}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold rounded-full transition duration-200 flex items-center justify-center"
          >
            Ver mis pedidos
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
