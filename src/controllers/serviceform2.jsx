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
    setMinDate(`${year}-${month}-${day}`)

    const minSelectableTime = new Date(today.getTime() + 30 * 60 * 1000)
    const hours = String(minSelectableTime.getHours()).padStart(2, '0')
    const minutes = String(minSelectableTime.getMinutes()).padStart(2, '0')
    setMinTime(`${hours}:${minutes}`)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleAddressSelect = (address) => {
    console.log('ServiceForm: Address selected:', address)
    setFormData(prevState => ({
      ...prevState,
      address: address
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('ServiceForm: Form submitted')

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
      console.log('ServiceForm: Sending request to:', `${apiUrl}/formulario/crear-solicitud`)
      const response = await axios.post(`${apiUrl}/formulario/crear-solicitud`, solicitudData, {
        headers: { Authorization: token },
      })
      console.log('ServiceForm: Response received:', response.data)
      setOrderNumber(response.data.orderNumber)
      setMensaje(response.data.mensaje)
      setError('')
      setStep(3)

      // Navegar a PedidoCompletado después de éxito
      navigate(`/pedidocompletado/${response.data.orderNumber}`)
    } catch (err) {
      console.error('ServiceForm: Error submitting form:', err)
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
                Area de Refrigeracion
              </h2>
              <p className="mt-2 text-blue-100">Complete el formulario para solicitar nuestro servicio</p>
            </div>

            <div className="p-6 lg:p-8">
              {/* Progress bar */}
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
                                min={minDate}
                                required
                              />
                            </label>
                          </div>

                          <div className="space-y-4">
                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="time">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                ¿A qué hora?
                              </div>
                              <input
                                type="time"
                                id="time"
                                name="time"
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                value={formData.time}
                                onChange={handleChange}
                                min={minTime}
                                required
                              />
                            </label>
                          </div>

                          <div className="space-y-4">
                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="address">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                ¿Dónde es el servicio?
                              </div>
                              <GoogleMapsComponent
                                address={formData.address}
                                onAddressSelect={handleAddressSelect}
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
                                Marca de aire acondicionado
                              </div>
                              <input
                                type="text"
                                id="marcaAC"
                                name="marcaAC"
                                value={formData.marcaAC}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                required
                              />
                            </label>
                          </div>

                          <div className="space-y-4">
                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="tipoAC">
                              <div className="flex items-center gap-2 mb-2">
                                <ChevronRight className="w-4 h-4 text-blue-600" />
                                Tipo de aire acondicionado
                              </div>
                              <input
                                type="text"
                                id="tipoAC"
                                name="tipoAC"
                                value={formData.tipoAC}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                required
                              />
                            </label>
                          </div>

                          <div className="space-y-4">
                            <label className="block text-gray-700 text-sm font-semibold" htmlFor="detalles">
                              <div className="flex items-center gap-2 mb-2">
                                <ChevronLeft className="w-4 h-4 text-blue-600" />
                                Detalles adicionales
                              </div>
                              <textarea
                                id="detalles"
                                name="detalles"
                                value={formData.detalles}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                rows="4"
                                placeholder="Escriba cualquier detalle adicional"
                              ></textarea>
                            </label>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
                        onClick={handlePreviousStep}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Atrás
                      </button>
                    )}

                    {step < 2 && (
                      <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                        onClick={handleNextStep}
                      >
                        Siguiente
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}

                    {step === 2 && (
                      <button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                      >
                        Enviar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
