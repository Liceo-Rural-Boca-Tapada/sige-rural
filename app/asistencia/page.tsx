import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function guardarAsistencia(formData: FormData) {
  "use server";

  const estudianteId = Number(
    formData.get("estudianteId")
  );

  const estado =
    formData.get("estado") as string;

  await prisma.asistencia.create({
    data: {
      estudianteId,
      estado,
      fecha: new Date(),
    },
  });

  // WHATSAPP AUTOMÁTICO
  if (estado === "Ausente") {

    const twilio = require("twilio");

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const estudiante =
      await prisma.estudiante.findUnique({
        where: {
          id: estudianteId,
        },
      });

    // SI EXISTE TELÉFONO
    if (estudiante?.telefonoEncargado) {

      try {

        await client.messages.create({

          from:
            process.env.TWILIO_WHATSAPP_FROM,

          to:
            `whatsapp:${estudiante.telefonoEncargado}`,

          body:
            `🚨 Liceo Rural Boca Tapada\n\n` +
            `Se informa que el estudiante ${estudiante.nombre} ` +
            `registró una ausencia el día de hoy.\n\n` +
            `Estado registrado: ${estado}`,

        });

        console.log("WHATSAPP ENVIADO");

      } catch (error) {

        console.log("ERROR WHATSAPP:");
        console.log(error);

      }

    } else {

      console.log(
        "El estudiante no tiene teléfono registrado"
      );

    }
  }

  redirect("/asistencia");
}

export default async function AsistenciaPage() {

  const estudiantes =
    await prisma.estudiante.findMany();

  const asistencias =
    await prisma.asistencia.findMany({
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
          Asistencia
        </h1>

        <p className="text-slate-500 mt-2">
          Registro diario de asistencia estudiantil.
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <form
          action={guardarAsistencia}
          className="grid md:grid-cols-3 gap-6"
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

          <select
            name="estado"
            className="border border-slate-300 rounded-2xl px-5 py-4"
          >
            <option>Presente</option>
            <option>Ausente</option>
            <option>Tardía</option>
            <option>Justificada</option>
          </select>

          <button
            type="submit"
            className="bg-blue-900 text-white rounded-2xl px-5 py-4 font-bold"
          >
            Guardar asistencia
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
                Estado
              </th>

              <th className="text-left p-5">
                Fecha
              </th>

            </tr>

          </thead>

          <tbody>

            {asistencias.map((asistencia) => (

              <tr
                key={asistencia.id}
                className="border-b"
              >

                <td className="p-5">
                  {asistencia.estudiante.nombre}
                </td>

                <td className="p-5">

                  <span
                    className={
                      asistencia.estado === "Ausente"
                        ? "bg-red-100 text-red-700 px-4 py-2 rounded-xl"
                        : asistencia.estado === "Presente"
                        ? "bg-green-100 text-green-700 px-4 py-2 rounded-xl"
                        : "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl"
                    }
                  >
                    {asistencia.estado}
                  </span>

                </td>

                <td className="p-5">
                  {new Date(
                    asistencia.fecha
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