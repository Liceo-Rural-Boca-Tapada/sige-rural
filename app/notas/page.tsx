import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function guardarNota(formData: FormData) {
  "use server";

  const estudianteId = Number(
    formData.get("estudianteId")
  );

  const materiaId = Number(
    formData.get("materiaId")
  );

  const descripcion =
    formData.get("descripcion") as string;

  const valor = Number(
    formData.get("valor")
  );

  const porcentaje = Number(
    formData.get("porcentaje")
  );

  await prisma.nota.create({
    data: {
      estudianteId,
      materiaId,
      descripcion,
      valor,
      porcentaje,
    },
  });

  redirect("/notas");
}

export default async function NotasPage() {

  const estudiantes =
    await prisma.estudiante.findMany();

  const materias =
    await prisma.materia.findMany();

  const notas =
    await prisma.nota.findMany({
      include: {
        estudiante: true,
        materia: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-blue-950">
          Notas
        </h1>

        <p className="text-slate-500 mt-2">
          Registro institucional de calificaciones.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={guardarNota}
          className="grid md:grid-cols-2 gap-6"
        >

          <select
            name="estudianteId"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          >

            {estudiantes.map((estudiante) => (
              <option
                key={estudiante.id}
                value={estudiante.id}
              >
                {estudiante.nombre}
              </option>
            ))}

          </select>

          <select
            name="materiaId"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          >

            {materias.map((materia) => (
              <option
                key={materia.id}
                value={materia.id}
              >
                {materia.nombre}
              </option>
            ))}

          </select>

          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <input
            type="number"
            step="0.01"
            name="valor"
            placeholder="Nota"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <input
            type="number"
            step="0.01"
            name="porcentaje"
            placeholder="Porcentaje"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <button
            type="submit"
            className="bg-blue-900 text-white rounded-2xl px-5 py-4 font-bold md:col-span-2"
          >
            Guardar nota
          </button>

        </form>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="text-left p-5">
                Estudiante
              </th>

              <th className="text-left p-5">
                Materia
              </th>

              <th className="text-left p-5">
                Descripción
              </th>

              <th className="text-left p-5">
                Nota
              </th>

              <th className="text-left p-5">
                Porcentaje
              </th>

              <th className="text-left p-5">
                Fecha
              </th>

            </tr>

          </thead>

          <tbody>

            {notas.map((nota) => (

              <tr
                key={nota.id}
                className="border-b"
              >

                <td className="p-5">
                  {nota.estudiante.nombre}
                </td>

                <td className="p-5">
                  {nota.materia.nombre}
                </td>

                <td className="p-5">
                  {nota.descripcion}
                </td>

                <td className="p-5 font-bold text-blue-900">
                  {nota.valor}
                </td>

                <td className="p-5">
                  {nota.porcentaje}%
                </td>

                <td className="p-5">
                  {new Date(
                    nota.fecha
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}