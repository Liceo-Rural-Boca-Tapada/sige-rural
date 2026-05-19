import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function actualizarEstudiante(
  id: number,
  formData: FormData
) {
  "use server";

  const nombre = formData.get("nombre") as string;
  const nivel = formData.get("nivel") as string;
  const seccion = formData.get("seccion") as string;
  const estado = formData.get("estado") as string;

  await prisma.estudiante.update({
    where: {
      id,
    },
    data: {
      nombre,
      nivel,
      seccion,
      estado,
    },
  });

  redirect("/estudiantes");
}

export default async function EditarEstudiantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const estudiante = await prisma.estudiante.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!estudiante) {
    return <div>Estudiante no encontrado</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-10">

        <h1 className="text-5xl font-bold text-blue-950 mb-3">
          Editar Estudiante
        </h1>

        <p className="text-slate-500 mb-10">
          Modifique la información del estudiante.
        </p>

        <form
          action={actualizarEstudiante.bind(null, estudiante.id)}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 font-semibold">
              Nombre completo
            </label>

            <input
              name="nombre"
              defaultValue={estudiante.nombre}
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Nivel
            </label>

            <input
              name="nivel"
              defaultValue={estudiante.nivel}
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Sección
            </label>

            <input
              name="seccion"
              defaultValue={estudiante.seccion}
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Estado
            </label>

            <input
              name="estado"
              defaultValue={estudiante.estado}
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-5 rounded-2xl font-bold"
          >
            Guardar cambios
          </button>

        </form>

      </div>

    </main>
  );
}