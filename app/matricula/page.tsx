import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function registrarMatricula(
  formData: FormData
) {
  "use server";

  const nombre =
    formData.get("nombre") as string;

  const nivel =
    formData.get("nivel") as string;

  const seccion =
    formData.get("seccion") as string;

  const encargado =
    formData.get("encargado") as string;

  const telefonoEncargado =
    formData.get("telefonoEncargado") as string;

  const correoEncargado =
    formData.get("correoEncargado") as string;

  const direccion =
    formData.get("direccion") as string;

  await prisma.estudiante.create({

    data: {

      nombre,

      nivel,

      seccion,

      estado: "Matriculado",

      encargado,

      telefonoEncargado,

      correoEncargado,

      direccion,
    },
  });

  redirect("/matricula");
}

export default async function MatriculaPage() {

  const estudiantes =
    await prisma.estudiante.findMany({

      orderBy: {
        id: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-6xl font-bold text-blue-950">
            Matrícula en Línea
          </h1>

          <p className="text-slate-500 mt-3 text-xl">
            Registro institucional estudiantil.
          </p>

        </div>

        {/* FORMULARIO */}
        <div className="bg-white rounded-3xl shadow p-10 mb-10">

          <form
            action={registrarMatricula}
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo estudiante"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="nivel"
              placeholder="Nivel"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="seccion"
              placeholder="Sección"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="encargado"
              placeholder="Nombre encargado legal"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="telefonoEncargado"
              placeholder="WhatsApp encargado"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="email"
              name="correoEncargado"
              placeholder="Correo encargado"
              className="border border-slate-300 rounded-2xl px-5 py-4"
            />

            <textarea
              name="direccion"
              placeholder="Dirección exacta"
              className="md:col-span-2 border border-slate-300 rounded-2xl px-5 py-4 h-32"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-blue-900 text-white rounded-2xl px-5 py-5 font-bold text-xl"
            >
              Registrar matrícula
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
                  Nivel
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

              </tr>

            </thead>

            <tbody>

              {estudiantes.map((e) => (

                <tr
                  key={e.id}
                  className="border-b"
                >

                  <td className="p-5 font-bold">
                    {e.nombre}
                  </td>

                  <td className="p-5">
                    {e.nivel}
                  </td>

                  <td className="p-5">
                    {e.encargado}
                  </td>

                  <td className="p-5">
                    {e.telefonoEncargado}
                  </td>

                  <td className="p-5">

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold">
                      {e.estado}
                    </span>

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