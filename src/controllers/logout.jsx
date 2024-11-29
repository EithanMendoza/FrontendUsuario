// src/components/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem('session_token');
      if (!token) {
        // Si no hay token, redirigir directamente al home
        navigate('/');
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

        // Hacer la solicitud al endpoint de logout
        await axios.post(
          `${apiUrl}/autenticacionUsuario/logout`,
          {}, // cuerpo vacío
          {
            headers: { Authorization: token },
          }
        );

        // Eliminar el token y el estado del banner del localStorage
        localStorage.removeItem('session_token');
        localStorage.removeItem('promo_banner_seen'); // Aquí eliminamos la clave del banner

        // Redirigir al usuario a la página de inicio
        navigate('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Redirigir al usuario a la página de inicio en caso de error
        navigate('/');
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <p className="text-xl font-semibold text-blue-700">Cerrando sesión...</p>
    </div>
  );
}
