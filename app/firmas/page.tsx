"use client";

import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";

export default function FirmasPage() {

  const sigCanvas =
    useRef<SignatureCanvas>(null);

  const [firma,
    setFirma] = useState("");

  function guardarFirma() {

    if (!sigCanvas.current) return;

    const firmaBase64 =
      sigCanvas.current
        .toDataURL("image/png");

    setFirma(firmaBase64);

    alert(
      "Firma guardada correctamente"
    );
  }

  function limpiarFirma() {

    sigCanvas.current?.clear();

    setFirma("");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow p-10">

          <h1 className="text-5xl font-bold text-blue-950 mb-4">
            Firmas Digitales
          </h1>

          <p className="text-slate-500 mb-10">
            Registro institucional de firmas.
          </p>

          {/* ÁREA FIRMA */}
          <div className="border-4 border-slate-300 rounded-3xl overflow-hidden bg-white">

            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 900,
                height: 300,
                className: "w-full",
              }}
            />

          </div>

          {/* BOTONES */}
          <div className="flex gap-4 mt-8">

            <button
              onClick={guardarFirma}
              className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold"
            >
              Guardar firma
            </button>

            <button
              onClick={limpiarFirma}
              className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold"
            >
              Limpiar
            </button>

          </div>

          {/* PREVIEW */}
          {firma && (

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-blue-950 mb-4">
                Firma capturada
              </h2>

              <img
                src={firma}
                alt="Firma"
                className="border rounded-2xl shadow bg-white"
              />

            </div>

          )}

        </div>

      </div>

    </main>
  );
}