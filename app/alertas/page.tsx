import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function crearAlerta(formData: FormData) {
  "use server";

  const estudianteId = Number(
    formData.get("estudianteId")
  );

  const tipo =
    formData.get("tipo") as string;

  const descripcion =
    formData.get("descripcion") as string;

  const nivel =
    formData.get("nivel") as string;

  await prisma.alerta.create({
    data: {
      estudianteId,
      tipo,
      descripcion,
      nivel,
    },
  });

  redirect("/alertas");
}

export default async function AlertasPage() {

  const estudiantes =
    await prisma.estudiante.findMany();

  const alertas =
    await prisma.alerta.findMany({
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
          Alertas Tempranas
        </h1>

        <p className="text-slate-500 mt-2">
          Seguimiento institucional REAC.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={crearAlerta}
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
            name="tipo"
            placeholder="Tipo de alerta"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <textarea
            name="descripcion"
            placeholder="Descripción de la alerta..."
            className="border border-slate-300 rounded-2xl px-5 py-4 h-40"
          />

          <select
            name="nivel"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          >
            <option>Bajo</option>
            <option>Moderado</option>
            <option>Alto</option>
          </select>

          <button
            type="submit"
            className="bg-red-700 text-white rounded-2xl px-5 py-4 font-bold"
          >
            Registrar alerta
          </button>

        </form>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-700 text-white">

            <tr>

              <th className="text-left p-5">
                Estudiante
              </th>

              <th className="text-left p-5">
                Tipo
              </th>

              <th className="text-left p-5">
                Descripción
              </th>

              <th className="text-left p-5">
                Nivel
              </th>

              <th className="text-left p-5">
                Fecha
              </th>

            </tr>

          </thead>

          <tbody>

            {alertas.map((alerta) => (

              <tr
                key={alerta.id}
                className="border-b"
              >

                <td className="p-5">
                  {alerta.estudiante.nombre}
                </td>

                <td className="p-5">
                  {alerta.tipo}
                </td>

                <td className="p-5">
                  {alerta.descripcion}
                </td>

                <td className="p-5">

                  <span
                    className={
                      alerta.nivel === "Alto"
                        ? "bg-red-100 text-red-700 px-4 py-2 rounded-xl"
                        : alerta.nivel === "Moderado"
                        ? "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl"
                        : "bg-green-100 text-green-700 px-4 py-2 rounded-xl"
                    }
                  >
                    {alerta.nivel}
                  </span>

                </td>

                <td className="p-5">
                  {new Date(
                    alerta.fecha
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