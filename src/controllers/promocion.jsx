import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import tecnico from '../assets/tecnico1.png'
import tecnico2 from '../assets/tecnicos2.jpg'
import tecnico3 from '../assets/tecnicos3.jpeg'

const banners = [
  {
    id: 'garantia',
    title: 'Garantía de Calidad',
    content: 'Servicio respaldado por un mes de garantía',
    description: 'Confianza y tranquilidad en cada mantenimiento o reparación',
    image: tecnico,
  },
  {
    id: 'descuento',
    title: 'Oferta Exclusiva',
    content: '30% de descuento en tu primera contratación',
    description: 'Experimenta nuestro servicio premium a un precio especial',
    image: tecnico2,
  },
  {
    id: 'seguridad',
    title: 'Seguridad Garantizada',
    content: 'Profesionalismo y atención especializada',
    description: 'Tu confort y seguridad son nuestra prioridad',
    image: tecnico3,
  },
]

const PromoBanners = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    // Verificar si el usuario está logueado
    const token = localStorage.getItem('session_token')
    if (token) {
      const promoBannerSeen = localStorage.getItem('promo_banner_seen')
      
      // Solo mostrar el banner si no se ha cerrado previamente
      if (!promoBannerSeen) {
        setIsVisible(true)
      }
    }
  }, [])

  const handleCloseAll = () => {
    setIsVisible(false)
    // Marcar que el banner fue cerrado para esta sesión
    localStorage.setItem('promo_banner_seen', 'true')
  }

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <button
          onClick={handleCloseAll}
          className="absolute top-4 right-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full p-1 transition-colors duration-200 z-50"
          aria-label="Cerrar promociones"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex h-[32rem]">
          <div className="w-1/2 bg-blue-600 p-12 flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 tracking-wide text-blue-100">{banners[currentBanner].title}</h3>
            <h2 className="text-4xl font-bold mb-4 leading-tight text-white">{banners[currentBanner].content}</h2>
            <p className="text-lg text-blue-100">{banners[currentBanner].description}</p>
          </div>
          <div className="w-1/2 relative">
            <img
              src={banners[currentBanner].image}
              alt={banners[currentBanner].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute bottom-8 left-12 flex space-x-3">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentBanner ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all duration-200"
          aria-label="Anterior promoción"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white transition-all duration-200"
          aria-label="Siguiente promoción"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default PromoBanners
