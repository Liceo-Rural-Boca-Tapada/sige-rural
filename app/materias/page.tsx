import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function crearMateria(formData: FormData) {
  "use server";

  const nombre = formData.get("nombre") as string;
  const nivel = formData.get("nivel") as string;
  const seccion = formData.get("seccion") as string;

  await prisma.materia.create({
    data: {
      nombre,
      nivel,
      seccion,
    },
  });

  redirect("/materias");
}

export default async function MateriasPage() {

  const materias =
    await prisma.materia.findMany();

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-blue-950">
          Materias
        </h1>

        <p className="text-slate-500 mt-2">
          Gestión académica de materias y secciones.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={crearMateria}
          className="grid md:grid-cols-3 gap-6"
        >

          <input
            name="nombre"
            placeholder="Nombre materia"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <input
            name="nivel"
            placeholder="Nivel"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <input
            name="seccion"
            placeholder="Sección"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <button
            type="submit"
            className="bg-blue-900 text-white py-4 rounded-2xl font-bold col-span-3"
          >
            Guardar materia
          </button>

        </form>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>
              <th className="text-left p-5">Materia</th>
              <th className="text-left p-5">Nivel</th>
              <th className="text-left p-5">Sección</th>
            </tr>

          </thead>

          <tbody>

            {materias.map((materia) => (

              <tr
                key={materia.id}
                className="border-b"
              >

                <td className="p-5">
                  {materia.nombre}
                </td>

                <td className="p-5">
                  {materia.nivel}
                </td>

                <td className="p-5">
                  {materia.seccion}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}