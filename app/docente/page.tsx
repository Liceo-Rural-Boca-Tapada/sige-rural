"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function DocentePage() {

  useEffect(() => {

    const rol =
      localStorage.getItem("rol");

    if (rol !== "docente") {

      window.location.href = "/login";

    }

  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      {/* BOTÓN */}
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
          Panel Docente
        </h1>

        <p className="text-slate-500 mt-3 text-xl">
          Gestión académica del docente
        </p>

      </div>

      {/* MENÚ */}
      <div className="grid md:grid-cols-2 gap-6">

        <Link
          href="/asistencia"
          className="bg-green-700 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Pasar asistencia
        </Link>

        <Link
          href="/notas"
          className="bg-yellow-500 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Registrar notas
        </Link>

        <Link
          href="/alertas"
          className="bg-red-700 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Alertas tempranas
        </Link>

        <Link
          href="/boletines"
          className="bg-indigo-700 text-white rounded-3xl p-10 text-3xl font-bold hover:scale-105 transition"
        >
          Boletines
        </Link>

      </div>

    </main>
  );
}