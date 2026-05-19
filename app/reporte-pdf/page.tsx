"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReportePDFPage() {

  function generarPDF() {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Liceo Rural Boca Tapada",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      "Boletín Académico Institucional",
      20,
      30
    );

    autoTable(doc, {

      startY: 45,

      head: [[
        "Materia",
        "Descripción",
        "Nota",
        "Porcentaje"
      ]],

      body: [
        [
          "Matemáticas",
          "Tarea 1",
          "90",
          "10%"
        ],

        [
          "Español",
          "Proyecto",
          "85",
          "20%"
        ],

        [
          "Ciencias",
          "Examen",
          "95",
          "30%"
        ],
      ],
    });

    doc.save("boletin.pdf");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-10">

        <h1 className="text-5xl font-bold text-blue-950 mb-4">
          Reporte PDF
        </h1>

        <p className="text-slate-500 mb-10">
          Generación de boletines institucionales.
        </p>

        <button
          onClick={generarPDF}
          className="bg-red-700 text-white px-8 py-5 rounded-2xl font-bold"
        >
          Descargar PDF
        </button>

      </div>

    </main>
  );
}