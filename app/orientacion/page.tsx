"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function OrientacionPage() {

  useEffect(() => {

    const rol =
      localStorage.getItem("rol");

    if (
      rol !== "director" &&
      rol !== "orientacion"
    ) {

      window.location.href =
        "/login";

    }

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
          Panel de Orientación
        </h1>

        <p className="text-slate-500 mt-3 text-xl">
          Seguimiento socioemocional y acompañamiento estudiantil.
        </p>

      </div>

      {/* TARJETAS */}
      <div className="grid md:grid-cols-2 gap-6">

        <Link
          href="/alertas"
          className="bg-red-700 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Alertas tempranas
        </Link>

        <Link
          href="/promedios"
          className="bg-yellow-500 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Riesgo académico
        </Link>

        <Link
          href="/justificaciones"
          className="bg-pink-700 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Justificaciones
        </Link>

        <Link
          href="/boletines"
          className="bg-indigo-700 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Boletines
        </Link>

      </div>

      {/* PANEL INFORMATIVO */}
      <div className="bg-white rounded-3xl shadow p-10 mt-10">

        <h2 className="text-3xl font-bold text-blue-950 mb-4">
          Seguimiento REAC
        </h2>

        <p className="text-slate-600 leading-8 text-lg">

          Este módulo permite registrar alertas tempranas,
          intervenciones, observaciones y seguimiento
          socioemocional del estudiantado, conforme a los
          lineamientos institucionales y disposiciones del
          Reglamento de Evaluación de los Aprendizajes y
          la Conducta (REAC).

        </p>

      </div>

    </main>
  );
}