import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function registrarUsuario(formData: FormData) {
  "use server";

  const nombre = formData.get("nombre") as string;
  const correo = formData.get("correo") as string;
  const password = formData.get("password") as string;
  const rol = formData.get("rol") as string;

  await prisma.usuario.create({
    data: {
      nombre,
      correo,
      password,
      rol,
    },
  });

  redirect("/login");
}

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-10">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">

        <h1 className="text-5xl font-bold text-blue-950 mb-3">
          Registro
        </h1>

        <p className="text-slate-500 mb-10">
          Crear usuario del sistema.
        </p>

        <form
          action={registrarUsuario}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">
              Nombre
            </label>

            <input
              name="nombre"
              type="text"
              required
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Correo
            </label>

            <input
              name="correo"
              type="email"
              required
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Contraseña
            </label>

            <input
              name="password"
              type="password"
              required
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Rol
            </label>

            <select
              name="rol"
              className="w-full border border-slate-300 rounded-2xl px-5 py-4"
            >
              <option>Director</option>
              <option>Docente</option>
              <option>Encargado</option>
            </select>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-5 rounded-2xl font-bold text-lg"
          >
            Crear usuario
          </button>

        </form>

      </div>

    </main>
  );
}