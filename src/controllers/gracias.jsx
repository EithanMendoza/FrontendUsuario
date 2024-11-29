import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';

export default function Gracias() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleReturn = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4 sm:px-6 lg:px-8">
      {showConfetti && <Confetti />}
      <div className="max-w-lg w-full bg-white p-8 sm:p-12 shadow-2xl rounded-3xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800"></div>
        <div className="mb-8 transform transition-all duration-500 ease-in-out hover:scale-110">
          <CheckCircle className="w-24 h-24 mx-auto text-green-500" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">¡Gracias!</h2>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Tu pago se ha procesado exitosamente. Apreciamos tu confianza en nuestros servicios y estamos comprometidos a brindarte la mejor experiencia.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleReturn}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center justify-center w-full sm:w-auto"
          >
            <Home className="mr-2 h-5 w-5" />
            Volver al inicio
          </button>
          <button
            onClick={() => navigate('/historial')}
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-50 transition-colors duration-300 ease-in-out border-2 border-blue-600 flex items-center justify-center w-full sm:w-auto"
          >
            Ver más servicios
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>Si tiene alguna pregunta, no dude en hacérnoslo saber. <a href="/home" className="text-blue-600 hover:underline">Contáctanos</a></p>
      </div>
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20 + 10}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          <div
            className="w-3 h-3 rotate-45 bg-blue-500"
            style={{
              opacity: Math.random() * 0.5 + 0.5,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}