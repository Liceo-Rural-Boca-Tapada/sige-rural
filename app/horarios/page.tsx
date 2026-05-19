import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function crearHorario(
  formData: FormData
) {
  "use server";

  const grupo =
    formData.get("grupo") as string;

  const dia =
    formData.get("dia") as string;

  const hora =
    formData.get("hora") as string;

  const materia =
    formData.get("materia") as string;

  const profesor =
    formData.get("profesor") as string;

  const aula =
    formData.get("aula") as string;

  await prisma.horario.create({

    data: {

      grupo,

      dia,

      hora,

      materia,

      profesor,

      aula,
    },
  });

  redirect("/horarios");
}

export default async function HorariosPage() {

  const horarios =
    await prisma.horario.findMany({

      orderBy: [
        {
          grupo: "asc",
        },

        {
          dia: "asc",
        },

        {
          hora: "asc",
        },
      ],
    });

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-6xl font-bold text-blue-950">
            Horarios Institucionales
          </h1>

          <p className="text-slate-500 mt-3 text-xl">
            Gestión académica y distribución horaria.
          </p>

        </div>

        {/* FORMULARIO */}
        <div className="bg-white rounded-3xl shadow p-10 mb-10">

          <form
            action={crearHorario}
            className="grid md:grid-cols-3 gap-6"
          >

            <input
              type="text"
              name="grupo"
              placeholder="Grupo"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <select
              name="dia"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            >
              <option>Lunes</option>
              <option>Martes</option>
              <option>Miércoles</option>
              <option>Jueves</option>
              <option>Viernes</option>
            </select>

            <input
              type="text"
              name="hora"
              placeholder="Hora"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="materia"
              placeholder="Materia"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="profesor"
              placeholder="Profesor"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="aula"
              placeholder="Aula"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <button
              type="submit"
              className="md:col-span-3 bg-blue-900 text-white rounded-2xl px-5 py-5 font-bold text-xl"
            >
              Registrar horario
            </button>

          </form>

        </div>

        {/* TABLA */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-950 text-white">

              <tr>

                <th className="text-left p-5">
                  Grupo
                </th>

                <th className="text-left p-5">
                  Día
                </th>

                <th className="text-left p-5">
                  Hora
                </th>

                <th className="text-left p-5">
                  Materia
                </th>

                <th className="text-left p-5">
                  Profesor
                </th>

                <th className="text-left p-5">
                  Aula
                </th>

              </tr>

            </thead>

            <tbody>

              {horarios.map((h) => (

                <tr
                  key={h.id}
                  className="border-b"
                >

                  <td className="p-5 font-bold">
                    {h.grupo}
                  </td>

                  <td className="p-5">
                    {h.dia}
                  </td>

                  <td className="p-5">
                    {h.hora}
                  </td>

                  <td className="p-5">
                    {h.materia}
                  </td>

                  <td className="p-5">
                    {h.profesor}
                  </td>

                  <td className="p-5">
                    {h.aula}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}