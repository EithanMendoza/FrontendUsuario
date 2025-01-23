import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landipage';
import Login from './components/Login';
import Home from './controllers/home';
import ProtectedRoute from './models/protectedRoute';
import ServiceForm from './controllers/serviceform';
import ServiceForm2 from './controllers/serviceform2';
import Servicios from './models/servicios';
import Historial from './models/historial';
import Notificaciones from './models/notificaciones';
import Perfil from './models/perfil';
import Logout from './controllers/logout';
import ProgresoServicio from './components/progresoservicio';
import Pago from './components/pago';
import Gracias from './controllers/gracias';
import TerminosYCondiciones from './components/terminos'; // Importa el componente de Términos y Condiciones
import hometemporal from './components/hometemporal';
import Registro from './components/Registro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/hometemporal" element={<hometemporal />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service/:id"
          element={
            <ProtectedRoute>
              <ServiceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service2/:id"
          element={
            <ProtectedRoute>
              <ServiceForm2 />
            </ProtectedRoute>
          }
        />
        
        {/* Rutas de los componentes de la navbar */}
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/logout" element={<Logout />} />

        {/* Ruta para ver progreso del servicio */}
        <Route path="/progreso-servicio/:solicitudId" element={<ProgresoServicio />} />

        {/* Ruta para pago */}
        <Route path="/pago/:solicitudId" element={<Pago />} />

        {/* Ruta para la página de agradecimiento */}
        <Route path="/gracias" element={<Gracias />} />

        {/* Ruta para la página de Términos y Condiciones */}
        <Route path="/terminos" element={<TerminosYCondiciones />} />
      </Routes>
    </Router>
  );
}

export default App;
