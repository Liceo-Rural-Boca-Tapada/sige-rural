import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

async function subirDocumento(
  formData: FormData
) {
  "use server";

  const estudianteId = Number(
    formData.get("estudianteId")
  );

  const file =
    formData.get("archivo") as File;

  if (!file || file.size === 0) {
    return;
  }

  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  // CREAR CARPETA
  const uploadDir =
    path.join(
      process.cwd(),
      "public/uploads"
    );

  if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(uploadDir, {
      recursive: true,
    });

  }

  // NOMBRE ARCHIVO
  const fileName =
    `${Date.now()}-${file.name}`;

  const filePath =
    path.join(uploadDir, fileName);

  // GUARDAR
  fs.writeFileSync(
    filePath,
    buffer
  );

  // GUARDAR DB
  await prisma.documento.create({

    data: {

      estudianteId,

      nombre: file.name,

      url: `/uploads/${fileName}`,
    },
  });

  redirect("/documentos");
}

export default async function DocumentosPage() {

  const estudiantes =
    await prisma.estudiante.findMany();

  const documentos =
    await prisma.documento.findMany({

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
          Documentos Expediente
        </h1>

        <p className="text-slate-500 mt-2">
          Gestión documental institucional.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={subirDocumento}
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
            type="file"
            name="archivo"
            className="border border-slate-300 rounded-2xl px-5 py-4 bg-white"
          />

          <button
            type="submit"
            className="bg-blue-900 text-white rounded-2xl px-5 py-4 font-bold"
          >
            Subir documento
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
                Documento
              </th>

              <th className="text-left p-5">
                Fecha
              </th>

              <th className="text-left p-5">
                Archivo
              </th>

            </tr>

          </thead>

          <tbody>

            {documentos.map((doc) => (

              <tr
                key={doc.id}
                className="border-b"
              >

                <td className="p-5">
                  {doc.estudiante.nombre}
                </td>

                <td className="p-5">
                  {doc.nombre}
                </td>

                <td className="p-5">
                  {new Date(
                    doc.fecha
                  ).toLocaleString()}
                </td>

                <td className="p-5">

                  <a
                    href={doc.url}
                    target="_blank"
                    className="bg-green-700 text-white px-4 py-2 rounded-xl"
                  >
                    Ver documento
                  </a>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}