"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { Trash2, Calendar, Clock, MapPin, AlertCircle, ArrowRight, Loader2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function Component() {
  const [pendingRequests, setPendingRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPendingRequests()
  }, [])

  const fetchPendingRequests = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('session_token')
      if (!token) {
        setError('Token de sesión no encontrado. Inicia sesión nuevamente.')
        setIsLoading(false)
        return
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      const response = await axios.get(`${apiUrl}/formulario/pendientes`, {
        headers: { Authorization: token }
      })

      const filteredRequests = response.data ? [response.data].filter(req => req.estadoSolicitud !== 'completado') : []
      setPendingRequests(filteredRequests)
      setError(null)
    } catch (err) {
      console.error('Error fetching request status:', err)
      setPendingRequests([])
    } finally {
      setIsLoading(false)
    }
  }

  // Cambia esta parte en la función handleCancelRequest
  const handleCancelRequest = async (solicitudId) => {
    setSelectedRequestId(solicitudId)  // Aquí guardamos el ID seleccionado
    setShowConfirmDialog(true)  // Mostramos el diálogo de confirmación
  }

  // Modifica esta parte de confirmCancelRequest
  const confirmCancelRequest = async () => {
    try {
      const token = localStorage.getItem('session_token')
      if (!token) {
        setError('No se encontró el token de sesión.')
        return
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
      // Usamos el estado selectedRequestId aquí, no solicitudId directamente
      await axios.delete(`${apiUrl}/formulario/cancelar-solicitud/${selectedRequestId}`, {
        headers: { Authorization: token }
      })
      fetchPendingRequests()
    } catch (err) {
      setError('Error al cancelar la solicitud.')
      console.error('Error cancelling request:', err)
    } finally {
      setShowConfirmDialog(false)
      setSelectedRequestId(null)  // Limpiamos el ID seleccionado después de la cancelación
    }
  }

  const goToServiceProgress = (solicitudId) => {
    navigate(`/progreso-servicio/${solicitudId}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 mt-20">
        <h1 className="text-4xl font-bold text-blue-900 mb-10 text-center">Estado de la Solicitud</h1>
        
        {pendingRequests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-l-4 border-blue-500 text-blue-800 px-8 py-6 rounded-lg flex items-center justify-center shadow-md max-w-2xl mx-auto"
          >
            <AlertCircle className="w-8 h-8 mr-4 text-blue-500" />
            <span className="text-lg font-medium">No tienes solicitudes pendientes en este momento.</span>
          </motion.div>
        ) : (
          <AnimatePresence>
            {pendingRequests.map((request) => (
              <motion.div
                key={request.solicitudId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-blue-900">{request.nombreServicio}</h2>
                    {request.estadoSolicitud === 'pendiente' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCancelRequest(request.solicitudId)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="w-7 h-7" />
                      </motion.button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 mb-6">
                    <div className="flex items-center bg-blue-50 p-4 rounded-xl">
                      <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                      <span className="font-medium text-blue-800">{new Date(request.fecha).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center bg-blue-50 p-4 rounded-xl">
                      <Clock className="w-6 h-6 mr-3 text-blue-600" />
                      <span className="font-medium text-blue-800">{request.hora}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-blue-50 p-4 rounded-xl mb-6">
                    <MapPin className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-blue-800">{request.direccion}</span>
                  </div>
                </div>
                <div className="bg-blue-100 px-8 py-4 text-sm flex items-center justify-between">
                  <div className="font-semibold text-blue-800">
                    Estado: <span className="text-blue-900 capitalize">{request.estadoSolicitud}</span>
                  </div>
                  {request.estadoSolicitud === 'asignado' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToServiceProgress(request.solicitudId)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <span>Ver Progreso</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <Footer />

      {/* Diálogo de confirmación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Confirmar Cancelación</h3>
            <p className="text-gray-600 mb-6">¿Estás seguro de que deseas cancelar este servicio?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                No, mantener
              </button>
              <button
                onClick={confirmCancelRequest}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Sí, cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

