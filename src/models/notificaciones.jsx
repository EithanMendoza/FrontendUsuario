'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Trash2, Bell, Check, AlertCircle } from 'lucide-react'
import Navbar from '../components/navbar' // Ajusta esta ruta si es necesario

const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Llama a fetchNotifications cada 10 segundos para actualizar en tiempo real
    const intervalId = setInterval(fetchNotifications, 10000)
    
    // Llama a fetchNotifications inmediatamente al cargar
    fetchNotifications()

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId)
  }, [])

  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('session_token')
      if (!token) {
        setError('Token de sesión no encontrado. Inicia sesión nuevamente.')
        setIsLoading(false)
        return
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      const response = await axios.get(`${apiUrl}/notificaciones/notificaciones`, {
        headers: { Authorization: token }
      })
      setNotifications(response.data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching notifications:', err)
      setError('Error al cargar las notificaciones.')
      setNotifications([])
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (ids) => {
    try {
      const token = localStorage.getItem('session_token')
      if (!token) {
        setError('Token de sesión no encontrado.')
        return
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      await axios.put(`${apiUrl}/notificaciones/notificaciones/marcar-leidas`, { ids }, {
        headers: { Authorization: token }
      })
      fetchNotifications()
    } catch (error) {
      console.error('Error marking notifications as read:', error)
      setError('Error al marcar como leídas las notificaciones.')
    }
  }

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('session_token')
      if (!token) {
        setError('Token de sesión no encontrado.')
        return
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      console.log('Intentando eliminar notificación con ID:', id)
  
      await axios.delete(`${apiUrl}/notificaciones/notificaciones/eliminar/${id}`, {
        headers: { Authorization: token }
      })
      fetchNotifications()
    } catch (error) {
      console.error('Error deleting notification:', error)
      setError('Error al eliminar la notificación.')
    }
  }

  const unreadCount = notifications.filter(n => !n.leida).length
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full px-4 py-8 bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Bell className="h-8 w-8 text-[#3366FF]" />
              Notificaciones
              {unreadCount > 0 && (
                <span className="bg-[#3366FF] text-white text-sm font-semibold px-2 py-1 rounded-full ml-2">
                  {unreadCount} nueva{unreadCount !== 1 ? 's' : ''}
                </span>
              )}
            </h2>
            {unreadCount > 0 && (
              <button
                className="bg-[#3366FF] text-white hover:bg-[#2855D6] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={() => markAsRead(notifications.filter(n => !n.leida).map(n => n.id))}
              >
                <Check className="h-4 w-4 inline-block mr-2" />
                Marcar todas como leídas
              </button>
            )}
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Cargando notificaciones...</div>
          ) : notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-l-4 border-blue-500 text-blue-800 px-8 py-6 rounded-lg flex items-center justify-center shadow-md max-w-2xl mx-auto"
            >
              <AlertCircle className="w-8 h-8 mr-4 text-blue-500" />
              <span className="text-lg font-medium">No hay notificaciones</span>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-white p-4 rounded-lg shadow-sm transition-all duration-200 ${
                    !notification.leida ? 'border-l-4 border-[#3366FF]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-lg ${!notification.leida ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                        {notification.mensaje}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(notification.fecha).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!notification.leida && (
                        <button
                          className="text-[#3366FF] hover:bg-[#3366FF]/10 p-2 rounded-full transition-colors duration-200"
                          onClick={() => markAsRead([notification.id])}
                          title="Marcar como leída"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
                        onClick={() => deleteNotification(notification.id)}
                        title="Eliminar notificación"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-8 py-6 rounded-lg flex items-center justify-center shadow-md max-w-2xl mx-auto"
            >
              <AlertCircle className="w-8 h-8 mr-4 text-red-500" />
              <span className="text-lg font-medium">{error}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsComponent

