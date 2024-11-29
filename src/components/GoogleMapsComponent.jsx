import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { AlertCircle } from 'lucide-react'

const GoogleMapsComponent = ({ apiKey, address, onAddressSelect }) => {
  const mapRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    if (!apiKey) {
      setError('API key is required')
      return
    }

    if (window.google && window.google.maps) {
      setIsLoaded(true)
      return
    }

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
      region: 'MX',
      language: 'es'
    })

    loader.load()
      .then(() => {
        setIsLoaded(true)
        setError(null)
      })
      .catch((err) => {
        setError('Error al cargar Google Maps. Por favor, intente de nuevo más tarde.')
      })
  }, [apiKey])

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return

    try {
      const initialCenter = { lat: 21.0158, lng: -89.1309 }
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: initialCenter,
        zoom: 12,
        gestureHandling: 'cooperative',
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      })

      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(20.91733473855359, -89.67287067621708),
        new window.google.maps.LatLng(21.01733473855359, -89.57287067621708)
      )

      newMap.fitBounds(bounds)

      const input = document.getElementById('address-input')
      if (input) {
        const autocomplete = new window.google.maps.places.Autocomplete(input, {
          bounds,
          strictBounds: true,
          componentRestrictions: { country: 'MX' }
        })

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          if (place.geometry) {
            newMap.setCenter(place.geometry.location)
            newMap.setZoom(15)

            if (marker) {
              marker.setMap(null)
            }

            const newMarker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: newMap,
              animation: window.google.maps.Animation.DROP
            })

            setMarker(newMarker)

            if (onAddressSelect) {
              onAddressSelect(place.formatted_address)
            }
          }
        })
      }

      setMap(newMap)
    } catch (err) {
      setError('Error al inicializar el mapa. Por favor, actualice la página.')
    }
  }, [isLoaded, map, marker, onAddressSelect])

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 right-4 z-10">
        <input
          id="address-input"
          type="text"
          placeholder="Ingresa una dirección"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}

export default GoogleMapsComponent

