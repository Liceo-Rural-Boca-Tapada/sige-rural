"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const estudiantes = [
  {
    nombre: "Juan Pérez",
    nivel: "7°",
    seccion: "7-1",
    estado: "Activo",
  },

  {
    nombre: "María Gómez",
    nivel: "8°",
    seccion: "8-2",
    estado: "Activo",
  },

  {
    nombre: "Ana Rodríguez",
    nivel: "9°",
    seccion: "9-1",
    estado: "Becado",
  },
];

export default function ReportesPage() {

  function generarPDF() {

    const doc = new jsPDF();

    doc.setFontSize(24);

    doc.text("Sistema Institucional LRBT", 14, 20);

    doc.setFontSize(14);

    doc.text(
      "Reporte institucional de estudiantes",
      14,
      30
    );

    autoTable(doc, {

      startY: 40,

      head: [
        [
          "Nombre",
          "Nivel",
          "Sección",
          "Estado",
        ],
      ],

      body: estudiantes.map((estudiante) => [
        estudiante.nombre,
        estudiante.nivel,
        estudiante.seccion,
        estudiante.estado,
      ]),

    });

    doc.save("reporte-estudiantes.pdf");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-10">

        <h1 className="text-5xl font-bold text-blue-950 mb-3">
          Reportes PDF
        </h1>

        <p className="text-slate-500 mb-10">
          Generación de reportes institucionales.
        </p>

        <button
          onClick={generarPDF}
          className="bg-blue-900 text-white px-8 py-5 rounded-2xl font-bold text-lg"
        >
          Generar reporte PDF
        </button>

      </div>

    </main>
  );
}