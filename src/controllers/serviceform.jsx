import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, Wind, Calendar, Clock, MapPin, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import GoogleMapsComponent from '../components/GoogleMapsComponent'

export default function ServiceForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [address, setAddress] = useState('')

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    marcaAC: '',
    otraMarca: '',
    tipoAC: '',
    detalles: '',
  })

  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [step, setStep] = useState(1)
  const [orderNumber, setOrderNumber] = useState(null)
  const [minDate, setMinDate] = useState('')
  const [minTime, setMinTime] = useState('')

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const todayFormatted = `${year}-${month}-${day}`
    
    setMinDate(todayFormatted)
    
    setFormData((prevData) => ({
      ...prevData,
      date: todayFormatted, // Asegúrate de que el valor de la fecha esté en este formato
    }))    

    const minSelectableTime = new Date(today.getTime() + 30 * 60 * 1000)
    const hours = String(minSelectableTime.getHours()).padStart(2, '0')
    const minutes = String(minSelectableTime.getMinutes()).padStart(2, '0')
    setMinTime(`${hours}:${minutes}`)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      // Asegúrate de que la fecha ingresada esté en formato correcto
      const dateParts = value.split('-')
      if (dateParts.length === 3) {
        const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`
        setFormData((prevData) => ({
          ...prevData,
          [name]: formattedDate,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress)
    setFormData(prevState => ({
      ...prevState,
      address: selectedAddress
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.date || !formData.time || !formData.address || !formData.marcaAC || !formData.tipoAC || (formData.marcaAC === 'otra' && !formData.otraMarca)) {
      setError('Todos los campos son obligatorios.')
      return
    }

    const token = localStorage.getItem('session_token')
    if (!token) {
      setError('No se encontró un token de autenticación.')
      return
    }

    const solicitudData = {
      tipo_servicio_id: id,
      marca_ac: formData.marcaAC === 'otra' ? formData.otraMarca : formData.marcaAC,
      tipo_ac: formData.tipoAC,
      detalles: formData.detalles,
      fecha: formData.date,
      hora: formData.time,
      direccion: formData.address,
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await axios.post(`${apiUrl}/formulario/crear-solicitud`, solicitudData, {
        headers: { Authorization: token },
      })
      setOrderNumber(response.data.orderNumber)
      setMensaje(response.data.mensaje)
      setError('')
      setStep(3)

      navigate(`/pedidocompletado/${response.data.orderNumber}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la solicitud.')
      setMensaje('')
    }
  }

  const handleNextStep = () => {
    if (step < 2) setStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1)
  }

  const progressPercentage = (step / 2) * 100

  if (step === 3) {
    return <PedidoCompletado orderNumber={orderNumber} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                <Wind className="w-8 h-8" />
                Área de Aires Acondicionados
              </h2>
              <p className="mt-2 text-blue-100">Complete el formulario para solicitar nuestro servicio</p>
            </div>

            <div className="p-6 lg:p-8">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-600">Paso {step} de 2</span>
                  <span className="font-medium text-blue-600">{Math.round(progressPercentage)}% Completado</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Error and success messages */}
              <AnimatePresence mode="wait">
                {mensaje && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="font-medium">{mensaje}</p>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {step === 1 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="date">
                              <Calendar className="w-4 h-4 text-blue-600 inline mr-2" />
                              ¿Cuándo lo necesitas?
                            </label>
                            <input
                              type="date"
                              id="date"
                              name="date"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              value={formData.date}
                              onChange={handleChange}
                              min={minDate}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="time">
                              <Clock className="w-4 h-4 text-blue-600 inline mr-2" />
                              ¿A qué hora lo prefieres?
                            </label>
                            <input
                              type="time"
                              id="time"
                              name="time"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              value={formData.time}
                              onChange={handleChange}
                              min={minTime}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                            <MapPin className="w-4 h-4 text-blue-600 inline mr-2" />
                            Dirección
                          </label>
                        </div>

                        <GoogleMapsComponent
                          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                          address={formData.address}
                          onAddressSelect={handleAddressSelect}
                        />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700" htmlFor="marcaAC">
                            <ChevronRight className="w-4 h-4 text-blue-600 inline mr-2" />
                            Marca del Aire Acondicionado
                          </label>
                          <select
                            id="marcaAC"
                            name="marcaAC"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={formData.marcaAC}
                            onChange={handleChange}
                            required
                          >
                                <option value="">Selecciona una opción</option>
                                <option value="Mirage">Mirage</option>
                                <option value="Mabe">Mabe</option>
                                <option value="Carrier">Carrier</option>
                                <option value="Prime">Prime</option>
                                <option value="Midea">Midea</option>
                                <option value="Hisense">Hisense</option>
                                <option value="otra">Otra</option>
                          </select>
                        </div>

                        {formData.marcaAC === 'otra' && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="otraMarca">
                              <ChevronRight className="w-4 h-4 text-blue-600 inline mr-2" />
                              Otra Marca
                            </label>
                            <input
                              type="text"
                              id="otraMarca"
                              name="otraMarca"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              value={formData.otraMarca}
                              onChange={handleChange}
                              placeholder="Ingresa la marca"
                              required={formData.marcaAC === 'otra'}
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700" htmlFor="tipoAC">
                            <ChevronRight className="w-4 h-4 text-blue-600 inline mr-2" />
                            Tipo de Aire Acondicionado
                          </label>
                          <select
                            id="tipoAC"
                            name="tipoAC"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={formData.tipoAC}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Selecciona un tipo</option>
                            <option value="split">Split</option>
                            <option value="ventana">Ventana</option>
                            <option value="portatil">Portátil</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700" htmlFor="detalles">
                            <ChevronRight className="w-4 h-4 text-blue-600 inline mr-2" />
                            Detalles adicionales
                          </label>
                          <textarea
                            id="detalles"
                            name="detalles"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                            value={formData.detalles}
                            onChange={handleChange}
                            placeholder="Detalles adicionales (opcional)"
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between items-center pt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Enviar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

function PedidoCompletado({ orderNumber }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          <h3 className="text-2xl font-bold mt-6 text-gray-800">¡Pedido Completado!</h3>
          <p className="text-gray-600 mt-4">Gracias por confiar en nosotros. Tu número de pedido es:</p>
          <div className="text-2xl font-semibold mt-2 text-blue-600">{orderNumber}</div>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


