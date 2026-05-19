import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function eliminarEstudiante(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  await prisma.estudiante.delete({
    where: { id },
  });

  redirect("/estudiantes");
}

export default async function EstudiantesPage() {

  const estudiantes =
    await prisma.estudiante.findMany({
      orderBy: {
        id: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-blue-950">
            Estudiantes
          </h1>

          <p className="text-slate-500 mt-2">
            Gestión general de estudiantes del sistema.
          </p>

        </div>

        <Link
          href="/nuevo-estudiante"
          className="bg-blue-900 text-white px-8 py-5 rounded-2xl font-bold"
        >
          + Nuevo estudiante
        </Link>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="text-left p-5">
                Nombre
              </th>

              <th className="text-left p-5">
                Nivel
              </th>

              <th className="text-left p-5">
                Sección
              </th>

              <th className="text-left p-5">
                Encargado
              </th>

              <th className="text-left p-5">
                WhatsApp
              </th>

              <th className="text-left p-5">
                Estado
              </th>

              <th className="text-left p-5">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {estudiantes.map((estudiante) => (

              <tr
                key={estudiante.id}
                className="border-b"
              >

                <td className="p-5">
                  {estudiante.nombre}
                </td>

                <td className="p-5">
                  {estudiante.nivel}
                </td>

                <td className="p-5">
                  {estudiante.seccion}
                </td>

                <td className="p-5">
                  {estudiante.encargado || "-"}
                </td>

                <td className="p-5">
                  {estudiante.telefonoEncargado || "-"}
                </td>

                <td className="p-5">

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                    {estudiante.estado}
                  </span>

                </td>

                <td className="p-5 flex gap-3">

                  <Link
                    href={`/editar-estudiante/${estudiante.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                  >
                    Editar
                  </Link>

                  <form action={eliminarEstudiante}>

                    <input
                      type="hidden"
                      name="id"
                      value={estudiante.id}
                    />

                    <button
                      type="submit"
                      className="bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Eliminar
                    </button>

                  </form>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}