import { prisma } from "@/lib/prisma";

export default async function BoletinesPage() {

  const estudiantes =
    await prisma.estudiante.findMany({
      include: {
        notas: {
          include: {
            materia: true,
          },
        },
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-blue-950">
          Boletines Académicos
        </h1>

        <p className="text-slate-500 mt-2">
          Reportes institucionales de rendimiento.
        </p>

      </div>

      <div className="space-y-10">

        {estudiantes.map((estudiante) => {

          const promedio =
            estudiante.notas.length > 0
              ? estudiante.notas.reduce(
                  (acc, nota) =>
                    acc + nota.valor,
                  0
                ) / estudiante.notas.length
              : 0;

          return (

            <div
              key={estudiante.id}
              className="bg-white rounded-3xl shadow p-8"
            >

              <div className="mb-6">

                <h2 className="text-3xl font-bold text-blue-950">
                  {estudiante.nombre}
                </h2>

                <p className="text-slate-500 mt-2">
                  Nivel: {estudiante.nivel} | Sección: {estudiante.seccion}
                </p>

              </div>

              <table className="w-full mb-6">

                <thead className="bg-blue-950 text-white">

                  <tr>

                    <th className="text-left p-4">
                      Materia
                    </th>

                    <th className="text-left p-4">
                      Descripción
                    </th>

                    <th className="text-left p-4">
                      Nota
                    </th>

                    <th className="text-left p-4">
                      Porcentaje
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {estudiante.notas.map((nota) => (

                    <tr
                      key={nota.id}
                      className="border-b"
                    >

                      <td className="p-4">
                        {nota.materia.nombre}
                      </td>

                      <td className="p-4">
                        {nota.descripcion}
                      </td>

                      <td className="p-4 font-bold text-blue-900">
                        {nota.valor}
                      </td>

                      <td className="p-4">
                        {nota.porcentaje || 0}%
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold text-green-700">
                    Promedio General:
                    {" "}
                    {promedio.toFixed(2)}
                  </h3>

                </div>

                <div>

                  <span
                    className={
                      promedio < 65
                        ? "bg-red-100 text-red-700 px-5 py-3 rounded-2xl font-bold"
                        : promedio < 75
                        ? "bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-bold"
                        : "bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-bold"
                    }
                  >

                    {promedio < 65
                      ? "Riesgo alto"
                      : promedio < 75
                      ? "Seguimiento"
                      : "Adecuado"}

                  </span>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </main>
  );
}