'use client'

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from './navbar';

const UPDATE_INTERVAL_MS = 1000; // Intervalo de actualización en milisegundos (1 segundo)

export default function ProgresoServicio() {
  const { solicitudId } = useParams();
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [initialRedirectDone, setInitialRedirectDone] = useState(false); // Nueva bandera para controlar la primera redirección

  const steps = [
    { name: "en_camino", label: "En camino", icon: "🕒" },
    { name: "en_lugar", label: "En lugar", icon: "📍" },
    { name: "en_proceso", label: "En proceso", icon: "🔧" },
    { name: "finalizado", label: "Finalizado", icon: "✅" },
  ];

  useEffect(() => {
    const fetchProgressData = async () => {
      const token = localStorage.getItem("session_token");
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      try {
        const response = await fetch(`${apiUrl}/progreso/progreso-servicio/${solicitudId}`, {
          headers: {
            Authorization: token || "",
          },
        });

        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();
        setProgressData(data.progreso || []);
        setServiceDetails(data.detallesServicio || {});

        const ultimoEstadoProgreso = data.progreso[data.progreso.length - 1]?.estado_progreso;
        const currentStepIndex = steps.findIndex((step) => step.name === ultimoEstadoProgreso);
        
        setCurrentStep(currentStepIndex !== -1 ? currentStepIndex : 0);

        if (ultimoEstadoProgreso === "finalizado") {
          if (!initialRedirectDone) {
            setTimeout(() => {
              navigate(`/pago/${solicitudId}`);
              setInitialRedirectDone(true); // Marca que la redirección inicial ya ocurrió
            }, 10000);
          } else {
            navigate(`/pago/${solicitudId}`);
          }
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    const intervalId = setInterval(fetchProgressData, UPDATE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [solicitudId, navigate, steps, initialRedirectDone]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100">
          <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Estado del Servicio</h2>
            <span className="text-blue-200 text-sm">ID: {solicitudId}</span>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Barra de Progreso */}
            <div className="relative py-6">
              <div className="absolute left-0 top-1/2 h-2 w-full bg-gray-200 rounded-full transform -translate-y-1/2"></div>
              <div 
                className="absolute left-0 top-1/2 h-2 bg-blue-600 rounded-full transition-all duration-500 ease-in-out transform -translate-y-1/2"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
              <div className="relative flex justify-between">
                {steps.map((step, index) => (
                  <div key={step.name} className="flex flex-col items-center">
                    <div 
                      className={`z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 ${
                        index <= currentStep 
                          ? "border-blue-600 bg-white text-blue-600" 
                          : "border-gray-300 bg-white text-gray-400"
                      } shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110`}
                    >
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                    <span className={`mt-3 text-sm font-medium ${index <= currentStep ? "text-blue-600" : "text-gray-500"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detalles del Servicio */}
            {serviceDetails && (
              <div className="grid gap-8 md:grid-cols-2">
                <ServiceCard title="Detalles del Servicio">
                  <DetailItem label="Servicio" value={serviceDetails.nombre_servicio} />
                  <DetailItem label="Dirección" value={serviceDetails.direccion} />
                  <DetailItem label="Fecha y Hora" value={`${serviceDetails.fecha_solicitud || 'N/A'} ${serviceDetails.hora_solicitud || ''}`} />
                  {currentStep >= 2 && <DetailItem label="Código" value={serviceDetails.codigo_inicial} />}
                </ServiceCard>
                <ServiceCard title="Especificaciones Técnicas">
                  <DetailItem label="Tipo de A/C" value={serviceDetails.tipo_ac} />
                  <DetailItem label="Marca" value={serviceDetails.marca_ac} />
                  <DetailItem label="Detalles" value={serviceDetails.detalles_servicio} />
                </ServiceCard>
              </div>
            )}

            {/* Historial de Progreso */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b border-blue-200">Historial de Progreso</h3>
              <div className="space-y-6">
                {progressData.length > 0 ? (
                  progressData.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 border-l-4 border-blue-600 pl-4 pb-4 hover:bg-blue-50 transition-all duration-300 rounded-lg">
                      <div className="flex-grow">
                        <p className="font-semibold text-blue-900 text-lg capitalize">{item.estado_progreso.replace("_", " ") || 'N/A'}</p>
                        <p className="text-sm text-gray-500 mb-2">{new Date(item.fecha_progreso).toLocaleString() || 'N/A'}</p>
                        <p className="text-gray-700 mb-2">{item.detalle_progreso || 'N/A'}</p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Técnico:</span> {item.nombre_tecnico || 'N/A'} - <span className="italic">{item.especialidad_tecnico || 'N/A'}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No hay registros de progreso disponibles.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ title, children }) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold text-blue-900 mb-4 pb-2 border-b border-blue-200">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium">{value || 'N/A'}</span>
    </div>
  );
}
