import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { AlertCircle } from 'lucide-react'

export default function GoogleMapsComponent({ apiKey, onAddressSelect }) {
  const mapRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    console.log('GoogleMapsComponent: Starting to load Google Maps API')
    if (!apiKey) {
      console.error('GoogleMapsComponent: API key is missing')
      setError('API key is required')
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
        console.log('GoogleMapsComponent: Google Maps API loaded successfully')
        setIsLoaded(true)
        setError(null)
      })
      .catch((err) => {
        console.error('GoogleMapsComponent: Error loading Google Maps API:', err)
        setError('Error al cargar Google Maps. Por favor, intente de nuevo más tarde.')
      })
  }, [apiKey])

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return

    console.log('GoogleMapsComponent: Initializing map')
    try {
      const initialCenter = { lat: 21.0158, lng: -89.1309 } // Mérida
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
        new window.google.maps.LatLng(20.9158, -89.2309),
        new window.google.maps.LatLng(21.1158, -89.0309)
      )

      newMap.fitBounds(bounds)
      console.log('GoogleMapsComponent: Map initialized and bounds set')

      // Initialize autocomplete after map is created
      const input = document.getElementById('address-input')
      if (input) {
        console.log('GoogleMapsComponent: Setting up autocomplete')
        const autocomplete = new window.google.maps.places.Autocomplete(input, {
          bounds,
          strictBounds: true,
          componentRestrictions: { country: 'MX' }
        })

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          console.log('GoogleMapsComponent: Place selected:', place)
          if (place.geometry) {
            newMap.setCenter(place.geometry.location)
            newMap.setZoom(15)

            // Clear existing markers
            if (window.currentMarker) {
              window.currentMarker.setMap(null)
            }

            // Add new marker
            window.currentMarker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: newMap,
              animation: window.google.maps.Animation.DROP
            })

            if (onAddressSelect) {
              console.log('GoogleMapsComponent: Calling onAddressSelect with:', place.formatted_address)
              onAddressSelect(place.formatted_address)
            }
          }
        })
      } else {
        console.warn('GoogleMapsComponent: address-input element not found')
      }

      setMap(newMap)
    } catch (err) {
      console.error('GoogleMapsComponent: Map initialization error:', err)
      setError('Error al inicializar el mapa. Por favor, actualice la página.')
    }
  }, [isLoaded, map, onAddressSelect])

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
    <div className="relative rounded-lg overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-sm text-gray-500">Cargando mapa...</div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-[400px]"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
    </div>
  )
}
