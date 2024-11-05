import React from 'react'
import { Facebook, Instagram, Mail, Phone, MapPin, Clock, Shield, HeartHandshake } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sección de la Compañía */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-400">Air Tecs</h2>
            <p className="text-blue-100 leading-relaxed">
              Expertos en mantenimiento y reparaciones, brindando servicios profesionales y confiables para tu hogar o negocio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Sección de Información */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-400">Información Importante</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Horario de Servicio</p>
                  <p className="text-blue-100">Lunes a Sábado: 8:00 AM - 8:00 PM</p>
                  <p className="text-blue-100">Domingo: 9:00 AM - 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Garantía de Servicio</p>
                  <p className="text-blue-100">Todos nuestros servicios incluyen garantía de 30 días</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Compromiso</p>
                  <p className="text-blue-100">Técnicos certificados y materiales de primera calidad</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Contacto */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-400">Contáctanos</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-blue-100">+52 9993487512</p>
                  <p className="text-blue-100">Atención inmediata</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Correo Electrónico</p>
                  <p className="text-blue-100">contacto@airtecs.com</p>
                  <p className="text-blue-100">soporte@airtecs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Dirección</p>
                  <p className="text-blue-100">Calle 60 123 Col. Centro,</p>
                  <p className="text-blue-100">Mérida, Yucatán</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-blue-800">
          <p className="text-center text-blue-200">
            © {new Date().getFullYear()} Air Tec's. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}