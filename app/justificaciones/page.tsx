import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function crearJustificacion(formData: FormData) {
  "use server";

  const estudianteId = Number(formData.get("estudianteId"));
  const motivo = formData.get("motivo") as string;

  await prisma.justificacion.create({
    data: {
      estudianteId,
      motivo,
    },
  });

  redirect("/justificaciones");
}

export default async function JustificacionesPage() {

  const estudiantes =
    await prisma.estudiante.findMany();

  const justificaciones =
    await prisma.justificacion.findMany({
      include: {
        estudiante: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-blue-950">
          Justificaciones
        </h1>

        <p className="text-slate-500 mt-2">
          Gestión institucional de ausencias justificadas.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={crearJustificacion}
          className="space-y-6"
        >

          <select
            name="estudianteId"
            className="w-full border border-slate-300 rounded-2xl px-5 py-4"
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

          <textarea
            name="motivo"
            placeholder="Motivo de la justificación..."
            className="w-full border border-slate-300 rounded-2xl px-5 py-4 h-40"
          />

          <button
            type="submit"
            className="bg-blue-900 text-white px-8 py-5 rounded-2xl font-bold"
          >
            Enviar justificación
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
                Motivo
              </th>

              <th className="text-left p-5">
                Estado
              </th>

              <th className="text-left p-5">
                Fecha
              </th>

            </tr>

          </thead>

          <tbody>

            {justificaciones.map((justificacion) => (

              <tr
                key={justificacion.id}
                className="border-b"
              >

                <td className="p-5">
                  {justificacion.estudiante.nombre}
                </td>

                <td className="p-5">
                  {justificacion.motivo}
                </td>

                <td className="p-5">

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-bold">
                    {justificacion.estado}
                  </span>

                </td>

                <td className="p-5">
                  {new Date(justificacion.fecha).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}