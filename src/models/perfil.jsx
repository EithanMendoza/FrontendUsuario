import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { User, Phone, Check, Loader2 } from 'lucide-react'
import Navbar from '../components/navbar' // Ajusta la ruta según la ubicación de tu Navbar

const UserProfile = () => {
  const [profile, setProfile] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    genero: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('user_profile'))
    if (savedProfile) {
      setProfile(savedProfile)
      setIsLoading(false)
    } else {
      fetchProfile()
    }
  }, [])

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('session_token')
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      const response = await axios.get(`${apiUrl}/perfil/perfil`, {
        headers: { Authorization: token }
      })

      if (response.data) {
        setProfile(response.data)
        localStorage.setItem('user_profile', JSON.stringify(response.data))
        setError('')
      } else {
        setProfile({
          nombre: '',
          apellido: '',
          telefono: '',
          genero: ''
        })
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedProfile = {
      ...profile,
      [name]: value
    }
    setProfile(updatedProfile)
    localStorage.setItem('user_profile', JSON.stringify(updatedProfile))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('session_token')
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      const endpoint = profile.id ? `${apiUrl}/perfil/perfilput` : `${apiUrl}/perfil/crear-perfil`
      const method = profile.id ? 'put' : 'post'

      await axios[method](endpoint, profile, {
        headers: { Authorization: token }
      })

      setSuccess(profile.id ? 'Perfil actualizado correctamente.' : 'Perfil creado correctamente.')
      if (!profile.id) {
        fetchProfile() // Refresh profile data if it was just created
      }
    } catch (err) {
      setError('Error al guardar el perfil. Por favor, intenta de nuevo.')
      console.error('Error saving profile:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Mi Perfil</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-2">Nombre</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={profile.nombre}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="apellido" className="block text-lg font-medium text-gray-700 mb-2">Apellido</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={profile.apellido}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="telefono" className="block text-lg font-medium text-gray-700 mb-2">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={profile.telefono}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  placeholder="Tu número de teléfono"
                />
              </div>
            </div>

            <div>
              <label htmlFor="genero" className="block text-lg font-medium text-gray-700 mb-2">Género</label>
              <select
                id="genero"
                name="genero"
                value={profile.genero}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              >
                <option value="">Selecciona un género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg"
                role="alert"
              >
                <p className="font-bold">Éxito</p>
                <p>{success}</p>
              </motion.div>
            )}

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                ) : (
                  <Check className="mr-2" size={24} />
                )}
                {profile.id ? 'Actualizar Perfil' : 'Crear Perfil'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default UserProfile