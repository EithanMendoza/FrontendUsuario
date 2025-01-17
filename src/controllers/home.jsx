'use client'
import { Wrench, ArrowRight, ChevronRight, Wind, Snowflake } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export default function MainPage() {
  const [services, setServices] = useState([])
  const [error, setError] = useState('')
  const [perfilAdvertencia, setPerfilAdvertencia] = useState(false) // Estado para la advertencia de perfil
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfileAndServices = async () => {
      const token = localStorage.getItem('session_token')

      if (!token) {
        setError('No tienes una sesión activa.')
        return
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

        // Verificar si el perfil está creado
        const perfilResponse = await axios.get(`${apiUrl}/perfil/existe-perfil`, {
          headers: { Authorization: token }
        })

        if (!perfilResponse.data.exists) {
          setPerfilAdvertencia(true) // Mostrar advertencia si no existe el perfil
        }

        // Obtener los servicios
        const serviciosResponse = await axios.get(`${apiUrl}/home/servicios`, {
          headers: { Authorization: token }
        })

        setServices(serviciosResponse.data)
      } catch (err) {
        setError('Error al obtener los datos.')
        console.error('Error:', err)
      }
    }

    fetchProfileAndServices()
  }, [])

  const seleccionarServicio = (idServicio) => {
    if (idServicio === 3 || idServicio === 4) {
      navigate(`/service2/${idServicio}`)
    } else {
      navigate(`/service/${idServicio}`)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)] p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-red-100"
          >
            <div className="flex items-center justify-center text-red-500 mb-6">
              <AlertCircle className="w-16 h-16" />
            </div>
            <p className="text-center text-xl font-medium text-gray-800">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-6 w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Iniciar QUE LA CHUPE AVILA
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-36">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-blue-950 mb-4 tracking-tight">
              Nuestros Servicios
            </h1>
            <p className="text-lg lg:text-xl text-blue-700/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Encuentra el servicio técnico que necesitas con profesionales capacitados y certificados
            </p>

            {/* Advertencia si no tiene perfil creado */}
            {perfilAdvertencia && (
              <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 p-2 rounded-md inline-flex items-center justify-center text-sm max-w-md mx-auto shadow-md mb-6">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>No tienes un perfil creado. Crea tu perfil para poder solicitar un servicio.</span>
                <button
                  onClick={() => navigate('/perfil')}
                  className="ml-4 bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition duration-200"
                >
                  Crear Perfil
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-blue-100/20"
              onClick={() => seleccionarServicio(service.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.imagenUrl}
                  alt={service.nombre_servicio}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="relative p-6">
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                    {service.nombre_servicio.includes('Mantenimiento') ? (
                      <Wrench className="w-6 h-6" />
                    ) : service.nombre_servicio.includes('Reparación') ? (
                      <Wind className="w-6 h-6" />
                    ) : (
                      <Snowflake className="w-6 h-6" />
                    )}
                  </span>
                  <h2 className="text-2xl font-bold text-blue-950 group-hover:text-white transition-colors duration-200">
                    {service.nombre_servicio}
                  </h2>
                </div>

                <p className="text-blue-600/90 group-hover:text-blue-100 mb-6 line-clamp-3 transition-colors duration-200">
                  {service.descripcion}
                </p>
                
                <div className="flex items-center justify-between">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  >
                    Comenzar Ahora
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700 transition-colors duration-200">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
