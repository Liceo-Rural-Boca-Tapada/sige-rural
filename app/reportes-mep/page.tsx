"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const estudiantes = [

  {
    nombre: "Juan Pérez",
    promedio: 58,
    ausencias: 12,
    alertas: 4,
    observaciones: 6,
    riesgo: "Alto",
  },

  {
    nombre: "María Rodríguez",
    promedio: 74,
    ausencias: 4,
    alertas: 1,
    observaciones: 2,
    riesgo: "Moderado",
  },

  {
    nombre: "Carlos Sánchez",
    promedio: 91,
    ausencias: 1,
    alertas: 0,
    observaciones: 0,
    riesgo: "Bajo",
  },
];

export default function ReportesMEPPage() {

  function generarPDF() {

    const doc = new jsPDF();

    // HEADER
    doc.setFontSize(22);

    doc.text(
      "Liceo Rural Boca Tapada",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      "Reporte Institucional de Alertas Tempranas",
      20,
      30
    );

    doc.text(
      "Sistema REAC y Permanencia Estudiantil",
      20,
      40
    );

    // TABLA
    autoTable(doc, {

      startY: 55,

      head: [[
        "Estudiante",
        "Promedio",
        "Ausencias",
        "Alertas",
        "Observaciones",
        "Riesgo"
      ]],

      body: estudiantes.map((e) => [

        e.nombre,

        e.promedio,

        e.ausencias,

        e.alertas,

        e.observaciones,

        e.riesgo,
      ]),
    });

    // PIE
    doc.setFontSize(10);

    doc.text(
      "Reporte generado automáticamente por SIGE-RURAL LRBT",
      20,
      280
    );

    // DESCARGAR
    doc.save(
      "Reporte_MEP_LRBT.pdf"
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-10">

        <h1 className="text-5xl font-bold text-blue-950 mb-4">
          Reportes MEP
        </h1>

        <p className="text-slate-500 mb-10">
          Generación automática de reportes institucionales REAC.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">

          <h2 className="text-2xl font-bold text-blue-950 mb-3">
            Incluye:
          </h2>

          <ul className="space-y-2 text-slate-700">

            <li>
              ✅ Riesgo académico
            </li>

            <li>
              ✅ Ausentismo
            </li>

            <li>
              ✅ Alertas tempranas
            </li>

            <li>
              ✅ Observaciones
            </li>

            <li>
              ✅ Permanencia estudiantil
            </li>

          </ul>

        </div>

        <button
          onClick={generarPDF}
          className="bg-red-700 text-white px-8 py-5 rounded-2xl font-bold text-xl"
        >
          Generar Reporte PDF
        </button>

      </div>

    </main>
  );
}