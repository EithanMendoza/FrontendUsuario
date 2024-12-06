import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landipage';
import Login from './components/login y registro';
import Home from './controllers/home';
import ProtectedRoute from './models/protectedRoute';
import ServiceForm from './controllers/serviceform';
import ServiceFormtwo from './controllers/serviceform2';
import Servicios from './models/servicios';
import Historial from './models/historial';
import Notificaciones from './models/notificaciones';
import Perfil from './models/perfil';
import Logout from './controllers/logout';
import ProgresoServicio from './components/progresoservicio';
import Pago from './components/pago';
import Gracias from './controllers/gracias';
import TerminosYCondiciones from './components/terminos'; // Importa el componente de Términos y Condiciones
import Garantia from './components/garantia'; // Asegúrate de que la ruta sea correcta
import PedidoCompletado from './controllers/pedidocompletado';
import BeneficiosPage from './components/BeneficiosPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/BeneficiosPage" element={<BeneficiosPage />} />
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
              <ServiceFormtwo />
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

        {/* Ruta para pagar servicio */}
        <Route path="/pago/:solicitudId" element={<Pago />} />

        {/* Ruta para la página de agradecimiento */}
        <Route path="/gracias" element={<Gracias />} />

        {/* Ruta para la página de Términos y Condiciones */}
        <Route path="/terminos" element={<TerminosYCondiciones />} />

        {/* Ruta para la página de Garantía */}
        <Route path="/garantia" element={<Garantia />} />

        {/* Ruta para la página de Pedido Completado */}
        <Route path="/pedidocompletado/:orderNumber" element={<PedidoCompletado />} />

      </Routes>
    </Router>
  );
}

export default App;
