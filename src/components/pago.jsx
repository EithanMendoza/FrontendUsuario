import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign, Calendar, User, AlertCircle } from 'lucide-react';

function Pago() {
  const { solicitudId } = useParams(); 
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [monto, setMonto] = useState(850);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Campos de estética
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [ccv, setCcv] = useState('');
  const [nombreDueno, setNombreDueno] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');

  const handlePayment = async () => {
    setErrorMessage('');
    setLoading(true);

    const token = localStorage.getItem('session_token');
    if (!token) {
      setErrorMessage('Sesión expirada. Por favor, inicia sesión de nuevo.');
      setLoading(false);
      return;
    }

    const paymentData = { metodoPago, monto };

    const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

    try {
      const response = await fetch(`${apiUrl}/pago/pago-completo/${solicitudId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al completar el pago');
      }

      setTimeout(() => navigate('/gracias'), 2000); // Redirige a la página de confirmación
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Confirmación de Pago</h2>
          <p className="text-blue-100 text-lg">Complete los detalles para proceder con el pago seguro.</p>
        </div>
        
        <div className="p-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  Información importante sobre el costo del servicio:
                </p>
                <p className="mt-2 text-sm">
                  Nuestro servicio base tiene un costo de $850. En caso de que el técnico requiera materiales adicionales o surjan costos extra, estos serán discutidos y acordados con usted antes de proceder. Nos comprometemos a mantener la transparencia en todos nuestros servicios.
                </p>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r">
              <p className="font-bold">Error</p>
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Método de Pago
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white text-gray-700"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="tarjeta">Tarjeta de Crédito</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">Monto</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">Número de Tarjeta</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={numeroTarjeta}
                  onChange={(e) => setNumeroTarjeta(e.target.value)}
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">Fecha de Expiración</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={fechaExpiracion}
                    onChange={(e) => setFechaExpiracion(e.target.value)}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">CCV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">Nombre del Titular</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nombre del titular"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={nombreDueno}
                  onChange={(e) => setNombreDueno(e.target.value)}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-4 rounded-lg mt-8 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            ) : (
              'Realizar Pago'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pago;