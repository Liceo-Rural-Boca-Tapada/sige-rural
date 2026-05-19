import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function crearObservacion(
  formData: FormData
) {
  "use server";

  const estudianteId = Number(
    formData.get("estudianteId")
  );

  const titulo =
    formData.get("titulo") as string;

  const descripcion =
    formData.get("descripcion") as string;

  const tipo =
    formData.get("tipo") as string;

  await prisma.observacion.create({
    data: {
      estudianteId,
      titulo,
      descripcion,
      tipo,
    },
  });

  redirect("/observador");
}

export default async function ObservadorPage() {

  const estudiantes =
    await prisma.estudiante.findMany();

  const observaciones =
    await prisma.observacion.findMany({
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
          Observador del Estudiante
        </h1>

        <p className="text-slate-500 mt-2">
          Seguimiento institucional y disciplinario.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={crearObservacion}
          className="grid gap-6"
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

          <input
            type="text"
            name="titulo"
            placeholder="Título de la observación"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <select
            name="tipo"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          >
            <option>Conductual</option>
            <option>Académica</option>
            <option>Socioemocional</option>
            <option>Convivencia</option>
            <option>Seguimiento</option>
          </select>

          <textarea
            name="descripcion"
            placeholder="Detalle de la observación..."
            className="border border-slate-300 rounded-2xl px-5 py-4 h-40"
          />

          <button
            type="submit"
            className="bg-blue-900 text-white rounded-2xl px-5 py-4 font-bold"
          >
            Registrar observación
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
                Título
              </th>

              <th className="text-left p-5">
                Tipo
              </th>

              <th className="text-left p-5">
                Descripción
              </th>

              <th className="text-left p-5">
                Fecha
              </th>

            </tr>

          </thead>

          <tbody>

            {observaciones.map((obs) => (

              <tr
                key={obs.id}
                className="border-b"
              >

                <td className="p-5">
                  {obs.estudiante.nombre}
                </td>

                <td className="p-5 font-bold text-blue-900">
                  {obs.titulo}
                </td>

                <td className="p-5">

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl">
                    {obs.tipo}
                  </span>

                </td>

                <td className="p-5">
                  {obs.descripcion}
                </td>

                <td className="p-5">
                  {new Date(
                    obs.fecha
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