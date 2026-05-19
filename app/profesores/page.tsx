import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function crearProfesor(formData: FormData) {
  "use server";

  const nombre = formData.get("nombre") as string;
  const materia = formData.get("materia") as string;
  const correo = formData.get("correo") as string;
  const estado = formData.get("estado") as string;

  await prisma.profesor.create({
    data: {
      nombre,
      materia,
      correo,
      estado,
    },
  });

  redirect("/profesores");
}

export default async function ProfesoresPage() {

  const profesores =
    await prisma.profesor.findMany();

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-blue-950">
          Profesores
        </h1>

        <p className="text-slate-500 mt-2">
          Gestión general de docentes.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={crearProfesor}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            name="nombre"
            placeholder="Nombre completo"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <input
            name="materia"
            placeholder="Materia"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <input
            name="correo"
            placeholder="Correo"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          />

          <select
            name="estado"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          >
            <option>Activo</option>
            <option>Interino</option>
            <option>Inactivo</option>
          </select>

          <button
            type="submit"
            className="bg-blue-900 text-white py-4 rounded-2xl font-bold col-span-2"
          >
            Guardar profesor
          </button>

        </form>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>
              <th className="text-left p-5">Nombre</th>
              <th className="text-left p-5">Materia</th>
              <th className="text-left p-5">Correo</th>
              <th className="text-left p-5">Estado</th>
            </tr>

          </thead>

          <tbody>

            {profesores.map((profesor) => (

              <tr
                key={profesor.id}
                className="border-b"
              >

                <td className="p-5">
                  {profesor.nombre}
                </td>

                <td className="p-5">
                  {profesor.materia}
                </td>

                <td className="p-5">
                  {profesor.correo}
                </td>

                <td className="p-5">

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm">
                    {profesor.estado}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}