"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Estudiante = {
  id: number;
  nombre: string;
  nivel: string;
  seccion: string;
  estado: string;
};

export default function BotonReporte({
  estudiantes,
}: {
  estudiantes: Estudiante[];
}) {

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
    <button
      onClick={generarPDF}
      className="bg-blue-900 text-white px-8 py-5 rounded-2xl font-bold text-lg"
    >
      Generar reporte PDF
    </button>
  );
}