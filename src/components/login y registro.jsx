import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import navbar from '../assets/navbar-logo.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL;

    if (isLogin) {
      // Inicio de sesión
      try {
        const response = await fetch(`${apiUrl}/autenticacionUsuario/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Inicio de sesión exitoso');
          localStorage.setItem('sessionToken', data.session_token);
          setTimeout(() => {
            console.log('Token recibido y almacenado:', data.session_token);
console.log('Redirigiendo al home...');
navigate('/home');
          }, 500);
        } else {
          setMessage(data.error || 'Error al iniciar sesión');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setMessage('Error al iniciar sesión');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Registro de técnico
      if (password !== confirmPassword) {
        setMessage('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
      }

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
          setIsLogin(true);
        } else {
          setMessage(data.error || 'Error al registrar el usuario');
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        setMessage('Error al registrar el usuario');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setNombreUsuario('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <motion.div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <motion.div className="mb-8 relative z-10">
        <img src={navbar} alt="Air Tec's Logo" className="w-48 h-auto" />
      </motion.div>

      <motion.div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
        <motion.h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          {isLogin ? 'Bienvenido de vuelta' : 'Únete a nosotros'}
        </motion.h2>
        {message && <div className="text-center mb-4 p-2 bg-red-100 text-red-800 rounded">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-blue-500" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombre_usuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                required={!isLogin}
              />
            </div>
          )}
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
          {!isLogin && (
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-blue-500" />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                required={!isLogin}
              />
            </div>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>{isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}</p>
          <button onClick={toggleAuthMode} className="text-blue-600 font-semibold">
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
