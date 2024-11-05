import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTools, FaHistory, FaBell, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import navbar from '../assets/navbar-logo.png';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const navItems = [
    { icon: FaTools, label: 'Servicios', href: '/servicios' },
    { icon: FaHistory, label: 'Historial', href: '/historial' },
    { icon: FaBell, label: 'Notificaciones', href: '/notificaciones', count: notificationCount },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-blue-900 to-blue-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto">
        <div className="flex h-20 items-center justify-between px-6">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/home">
              <img 
                src={navbar} 
                alt="Air Tec's Logo" 
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(({ icon: Icon, label, href, count }) => (
              <Link
                key={label}
                to={href}
                className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-white relative group"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {count !== undefined && (
                  <motion.span 
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-400 text-xs font-medium text-blue-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {count}
                  </motion.span>
                )}
              </Link>
            ))}

            <div className="relative">
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-white group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUser className="w-4 h-4" />
                <span>Perfil</span>
                <motion.div
                  animate={{ rotate: isProfileOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown className="w-3 h-3" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-blue-800 py-2 shadow-xl border border-blue-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to="/perfil" 
                      className="flex items-center px-4 py-2 text-sm text-blue-100 hover:bg-blue-700 hover:text-white"
                    >
                      <FaUser className="mr-2 h-4 w-4 text-blue-400" />
                      Ver Perfil
                    </Link>
                    <Link 
                      to="/logout" 
                      className="flex items-center px-4 py-2 text-sm text-blue-100 hover:bg-blue-700 hover:text-white"
                    >
                      <FaSignOutAlt className="mr-2 h-4 w-4 text-blue-400" />
                      Cerrar Sesión
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <motion.button
            className="lg:hidden rounded-md p-2 text-blue-100 hover:text-white"
            onClick={() => {/* Implementar lógica para menú móvil */}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
