import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import navbar from '../assets/navbar-logo.png';

const Registro = () => {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/autenticacionUsuario/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Usuario registrado correctamente');
        setTimeout(() => navigate('/login'), 500); // Redirige al login después de registrar
      } else {
        setMessage(data.error || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setMessage('Error al registrar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col justify-center items-center px-4">
      <img src={navbar} alt="Air Tec's Logo" className="w-48 h-auto mb-6" />
      <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Registro</h2>
        {message && <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{message}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-blue-500" />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombre_usuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-blue-500" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-500" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-500" />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>¿Ya tienes una cuenta?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 font-semibold"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
