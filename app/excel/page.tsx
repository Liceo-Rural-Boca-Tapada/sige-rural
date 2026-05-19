"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExcelPage() {

  function exportarExcel() {

    const estudiantes = [

      {
        nombre: "Juan Pérez",
        nivel: "10°",
        seccion: "10-1",
        promedio: 58,
        riesgo: "Alto",
      },

      {
        nombre: "María Rodríguez",
        nivel: "9°",
        seccion: "9-2",
        promedio: 82,
        riesgo: "Bajo",
      },

      {
        nombre: "Carlos Sánchez",
        nivel: "11°",
        seccion: "11-1",
        promedio: 91,
        riesgo: "Bajo",
      },
    ];

    // CREAR HOJA
    const worksheet =
      XLSX.utils.json_to_sheet(
        estudiantes
      );

    // CREAR LIBRO
    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Estudiantes"
    );

    // EXPORTAR
    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const data =
      new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        }
      );

    saveAs(
      data,
      "Reporte_Estudiantes.xlsx"
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-10">

        <h1 className="text-5xl font-bold text-blue-950 mb-4">
          Exportar Excel
        </h1>

        <p className="text-slate-500 mb-10">
          Generación de reportes institucionales.
        </p>

        <button
          onClick={exportarExcel}
          className="bg-green-700 text-white px-8 py-5 rounded-2xl font-bold"
        >
          Descargar Excel
        </button>

      </div>

    </main>
  );
}