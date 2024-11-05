'use client'

import { CheckCircle, CheckCircle2, ArrowRight, ChevronRight, Wind, Calendar, MapPin, Clock, ChevronLeft, AlertCircle } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

export default function ServiceForm() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  // Reference for the map
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    setMinDate(`${year}-${month}-${day}`)

    const minSelectableTime = new Date(today.getTime() + 30 * 60 * 1000)
    const hours = String(minSelectableTime.getHours()).padStart(2, '0')
    const minutes = String(minSelectableTime.getMinutes()).padStart(2, '0')
    setMinTime(`${hours}:${minutes}`)

    // Initialize the map
    if (mapRef.current && !mapInstanceRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 8,
      })
      mapInstanceRef.current = map
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddressChange = (address) => {
    setFormData((prevState) => ({
      ...prevState,
      address: address.label,
    }))

    // Move the map to the new address
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: address.label }, (results, status) => {
      if (status === "OK" && results[0] && mapInstanceRef.current) {
        const location = results[0].geometry.location
        mapInstanceRef.current.setCenter(location)
        mapInstanceRef.current.setZoom(15)
        new google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
        })
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validación de campos obligatorios
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
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      const response = await axios.post(`${apiUrl}/formulario/crear-solicitud`, solicitudData, {
        headers: { Authorization: token },
      })
      setOrderNumber(response.data.orderNumber)
      setMensaje(response.data.mensaje)
      setError('')
      setStep(3)
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

  if (step === 3) {
    return <PedidoCompletado orderNumber={orderNumber} navigate={navigate} />
  }

  const progressPercentage = (step / 2) * 100

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 lg:py-32 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
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
              <div className="mb-10">
                <div className="relative w-full bg-blue-100 rounded-full h-3">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-sm font-medium text-blue-700">Paso {step} de 2</span>
                  <span className="text-sm font-medium text-blue-700">{Math.round(progressPercentage)}% Completado</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {mensaje && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
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

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
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
                          <div className="space-y-4">
                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="date">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                ¿Cuándo lo necesitas?
                              </div>
                              <input
                                type="date"
                                id="date"
                                name="date"
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                value={formData.date}
                                onChange={handleChange}
                                required
                              />
                            </label>

                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="time">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                Selecciona un horario
                              </div>
                              <input
                                type="time"
                                id="time"
                                name="time"
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                value={formData.time}
                                onChange={handleChange}
                                required
                              />
                            </label>

                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="address">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                ¿Dónde es el servicio?
                              </div>
                              <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                                selectProps={{
                                  placeholder: 'Ingrese dirección completa',
                                  value: formData.address,
                                  onChange: handleAddressChange,
                                  isClearable: true,
                                }}
                                styles={{
                                  textInput: {
                                    borderRadius: '0.375rem',
                                    borderColor: '#d1d5db',
                                    padding: '0.5rem 1rem',
                                  },
                                }}
                              />
                            </label>
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div className="space-y-4">
                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="marcaAC">
                              <div className="flex items-center gap-2 mb-2">
                                <Wind className="w-4 h-4 text-blue-600" />
                                ¿Cuál es la marca de aire acondicionado?
                              </div>
                              <select
                                id="marcaAC"
                                name="marcaAC"
                                value={formData.marcaAC}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                              >
                                <option value="">Selecciona una opción</option>
                                <option value="Mirage">Mirage</option>
                                <option value="Mabe">Mabe</option>
                                <option value="Carrier">Carrier</option>
                                <option value="otra">Otra</option>
                              </select>
                            </label>

                            <AnimatePresence>
                              {formData.marcaAC === 'otra' && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <label className="block text-gray-700 text-sm font-semibold" htmlFor="otraMarca">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Wind className="w-4 h-4 text-blue-600" />
                                      Especifica la marca:
                                    </div>
                                    <input
                                      type="text"
                                      id="otraMarca"
                                      name="otraMarca"
                                      value={formData.otraMarca}
                                      onChange={handleChange}
                                      required
                                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    />
                                  </label>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="tipoAC">
                              <div className="flex items-center gap-2 mb-2">
                                <Wind className="w-4 h-4 text-blue-600" />
                                
                                ¿Selecciona el tipo de aire acondicionado?
                              </div>
                              <select
                                id="tipoAC"
                                name="tipoAC"
                                value={formData.tipoAC}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                              >
                                <option value="">Selecciona una opción</option>
                                <option value="Mini Split">Mini Split</option>
                                <option value="Ventana">Ventana</option>
                              </select>
                            </label>

                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="detalles">
                              <div className="flex items-center gap-2 mb-2">
                                <Wind className="w-4 h-4 text-blue-600" />
                                ¿Necesitas agregar algún detalle?
                              </div>
                              <textarea
                                id="detalles"
                                name="detalles"
                                value={formData.detalles}
                                onChange={handleChange}
                                placeholder="Escribe más detalles sobre el servicio que necesitas..."
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-40 resize-none"
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-6">
                    {step > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handlePreviousStep}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Anterior
                      </motion.button>
                    )}
                    {step < 2 ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 ml-auto"
                      >
                        Siguiente
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 ml-auto"
                      >
                        Enviar Solicitud
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </form>

                <div className="hidden lg:block">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full min-h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200"
                  >
                    <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

function PedidoCompletado({ orderNumber, navigate }) {
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
          <p className="text-4xl font-bold text-blue-600">{orderNumber}</p>
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
        
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/home')}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-200 flex items-center justify-center"
          >
            Volver al Inicio
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
          <Link
            to="/pedidos"
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold rounded-full transition duration-200 flex items-center justify-center"
          >
            Ver mis pedidos
          </Link>
        </div>
      </motion.div>
    </div>
  )
}