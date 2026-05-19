"use client";

import { useState } from "react";

export default function CorreosPage() {

  const [correo, setCorreo] =
    useState("");

  const [mensaje, setMensaje] =
    useState("");

  async function enviarCorreo() {

    const response =
      await fetch("/api/enviar-correo", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          correo,
          mensaje,
        }),
      });

    if (response.ok) {

      alert(
        "Correo enviado correctamente"
      );

    } else {

      alert(
        "Error enviando correo"
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-10">

        <h1 className="text-5xl font-bold text-blue-950 mb-4">
          Correos Automáticos
        </h1>

        <p className="text-slate-500 mb-10">
          Envío institucional automatizado.
        </p>

        <div className="space-y-6">

          <input
            type="email"
            placeholder="Correo destino"
            value={correo}
            onChange={(e) =>
              setCorreo(e.target.value)
            }
            className="w-full border border-slate-300 rounded-2xl px-5 py-4"
          />

          <textarea
            placeholder="Mensaje..."
            value={mensaje}
            onChange={(e) =>
              setMensaje(e.target.value)
            }
            className="w-full border border-slate-300 rounded-2xl px-5 py-4 h-40"
          />

          <button
            onClick={enviarCorreo}
            className="bg-blue-900 text-white px-8 py-5 rounded-2xl font-bold"
          >
            Enviar correo
          </button>

        </div>

      </div>

    </main>
  );
}