import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function crearEstudiante(formData: FormData) {
  "use server";

  const nombre =
    formData.get("nombre") as string;

  const nivel =
    formData.get("nivel") as string;

  const seccion =
    formData.get("seccion") as string;

  const estado =
    formData.get("estado") as string;

  const encargado =
    formData.get("encargado") as string;

  const telefonoEncargado =
    formData.get("telefonoEncargado") as string;

  await prisma.estudiante.create({
    data: {
      nombre,
      nivel,
      seccion,
      estado,
      encargado,
      telefonoEncargado,
    },
  });

  redirect("/estudiantes");
}

export default function NuevoEstudiantePage() {

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold text-blue-950 mb-2">
          Nuevo estudiante
        </h1>

        <p className="text-slate-500 mb-10">
          Registro institucional de estudiantes.
        </p>

        <div className="bg-white rounded-3xl shadow p-8">

          <form
            action={crearEstudiante}
            className="grid gap-6"
          >

            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="nivel"
              placeholder="Nivel"
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="seccion"
              placeholder="Sección"
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

            <select
              name="estado"
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            >
              <option>Activo</option>
              <option>Becado</option>
              <option>Retirado</option>
            </select>

            <input
              type="text"
              name="encargado"
              placeholder="Nombre encargado"
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

            <input
              type="text"
              name="telefonoEncargado"
              placeholder="WhatsApp encargado (+506...)"
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

            <button
              type="submit"
              className="bg-blue-900 text-white rounded-2xl px-5 py-4 font-bold"
            >
              Guardar estudiante
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}