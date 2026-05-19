"use client";

import { useState } from "react";

export default function PadresPage() {

  const [codigo,
    setCodigo] = useState("");

  const [mostrar,
    setMostrar] = useState(false);

  function consultar() {

    if (codigo === "LRBT123") {

      setMostrar(true);

    } else {

      alert(
        "Código incorrecto"
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-5xl mx-auto">

        {/* LOGIN */}
        {!mostrar && (

          <div className="bg-white rounded-3xl shadow p-10">

            <h1 className="text-5xl font-bold text-blue-950 mb-4">
              Portal Padres
            </h1>

            <p className="text-slate-500 mb-10">
              Consulta académica estudiantil.
            </p>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Código estudiante"
                value={codigo}
                onChange={(e) =>
                  setCodigo(e.target.value)
                }
                className="w-full border border-slate-300 rounded-2xl px-5 py-4"
              />

              <button
                onClick={consultar}
                className="bg-blue-900 text-white px-8 py-5 rounded-2xl font-bold"
              >
                Consultar expediente
              </button>

            </div>

          </div>

        )}

        {/* PANEL */}
        {mostrar && (

          <div className="space-y-10">

            {/* HEADER */}
            <div className="bg-white rounded-3xl shadow p-10">

              <h1 className="text-5xl font-bold text-blue-950">
                Juan Pérez
              </h1>

              <p className="text-slate-500 mt-3 text-xl">
                10° | 10-1
              </p>

            </div>

            {/* PROMEDIO */}
            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-green-100 rounded-3xl p-8">

                <h2 className="text-slate-600">
                  Promedio
                </h2>

                <p className="text-5xl font-bold text-green-700 mt-3">
                  82
                </p>

              </div>

              <div className="bg-red-100 rounded-3xl p-8">

                <h2 className="text-slate-600">
                  Ausencias
                </h2>

                <p className="text-5xl font-bold text-red-700 mt-3">
                  3
                </p>

              </div>

              <div className="bg-yellow-100 rounded-3xl p-8">

                <h2 className="text-slate-600">
                  Riesgo
                </h2>

                <p className="text-5xl font-bold text-yellow-700 mt-3">
                  Bajo
                </p>

              </div>

            </div>

            {/* NOTAS */}
            <div className="bg-white rounded-3xl shadow p-10">

              <h2 className="text-3xl font-bold text-blue-950 mb-6">
                Notas
              </h2>

              <table className="w-full">

                <thead className="bg-blue-950 text-white">

                  <tr>

                    <th className="text-left p-4">
                      Materia
                    </th>

                    <th className="text-left p-4">
                      Nota
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">

                    <td className="p-4">
                      Matemáticas
                    </td>

                    <td className="p-4 font-bold">
                      88
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="p-4">
                      Español
                    </td>

                    <td className="p-4 font-bold">
                      81
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="p-4">
                      Ciencias
                    </td>

                    <td className="p-4 font-bold">
                      77
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

            {/* ALERTAS */}
            <div className="bg-white rounded-3xl shadow p-10">

              <h2 className="text-3xl font-bold text-red-700 mb-6">
                Alertas
              </h2>

              <div className="space-y-4">

                <div className="border rounded-2xl p-5">

                  <h3 className="font-bold text-xl">
                    Bajo rendimiento
                  </h3>

                  <p className="text-slate-600 mt-2">
                    Seguimiento en Matemáticas.
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}