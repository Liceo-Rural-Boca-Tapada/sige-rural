"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [
    totalEstudiantes,
    setTotalEstudiantes,
  ] = useState(0);

  const [
    totalProfesores,
    setTotalProfesores,
  ] = useState(0);

  const [
    totalAusencias,
    setTotalAusencias,
  ] = useState(0);

  const [
    promedioInstitucional,
    setPromedioInstitucional,
  ] = useState(0);

  const [
    estudiantesRiesgo,
    setEstudiantesRiesgo,
  ] = useState<string[]>([]);

  useEffect(() => {

    // VALIDAR LOGIN
    const rol =
      localStorage.getItem("rol");

    if (!rol) {
      window.location.href = "/login";
      return;
    }

    // DATOS DEMO
    setTotalEstudiantes(120);

    setTotalProfesores(18);

    setTotalAusencias(7);

    setPromedioInstitucional(82.5);

    setEstudiantesRiesgo([
      "Juan Pérez",
      "María Rodríguez",
    ]);

  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      {/* BOTÓN CERRAR SESIÓN */}
      <div className="flex justify-end mb-6">

        <button
          onClick={() => {

            localStorage.removeItem("rol");

            window.location.href =
              "/login";

          }}
          className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold"
        >
          Cerrar sesión
        </button>

      </div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-6xl font-bold text-blue-950">
          Liceo Rural Boca Tapada
        </h1>

        <p className="text-slate-500 mt-3 text-xl">
          Sistema Institucional Académico
        </p>

      </div>

      {/* TARJETAS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-slate-500">
            Estudiantes
          </h2>

          <p className="text-5xl font-bold text-blue-950 mt-3">
            {totalEstudiantes}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-slate-500">
            Profesores
          </h2>

          <p className="text-5xl font-bold text-blue-950 mt-3">
            {totalProfesores}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-slate-500">
            Ausencias
          </h2>

          <p className="text-5xl font-bold text-red-600 mt-3">
            {totalAusencias}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-slate-500">
            Promedio Institucional
          </h2>

          <p className="text-5xl font-bold text-green-700 mt-3">
            {promedioInstitucional.toFixed(1)}
          </p>

        </div>

      </div>

      {/* ALERTAS */}
      <div className="bg-red-100 border border-red-300 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold text-red-700 mb-4">
          Estudiantes en riesgo académico
        </h2>

        {estudiantesRiesgo.length === 0 ? (

          <p className="text-red-700">
            No hay estudiantes en riesgo.
          </p>

        ) : (

          <div className="space-y-3">

            {estudiantesRiesgo.map((nombre) => (

              <div
                key={nombre}
                className="bg-white rounded-2xl px-5 py-4"
              >
                {nombre}
              </div>

            ))}

          </div>

        )}

      </div>

      {/* MENÚ */}
      <div className="grid md:grid-cols-3 gap-6">

        <Link
          href="/estudiantes"
          className="bg-blue-900 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Estudiantes
        </Link>

        <Link
          href="/asistencia"
          className="bg-green-700 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Asistencia
        </Link>

        <Link
          href="/notas"
          className="bg-yellow-500 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Notas
        </Link>

        <Link
          href="/promedios"
          className="bg-purple-700 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Promedios
        </Link>

        <Link
          href="/justificaciones"
          className="bg-pink-700 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Justificaciones
        </Link>

        <Link
          href="/alertas"
          className="bg-red-700 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Alertas
        </Link>

        <Link
          href="/boletines"
          className="bg-indigo-700 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Boletines
        </Link>

        <Link
          href="/reporte-pdf"
          className="bg-gray-800 text-white rounded-3xl p-8 text-2xl font-bold"
        >
          Reporte PDF
        </Link>

      </div>

    </main>
  );
}