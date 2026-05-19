import { prisma } from "@/lib/prisma";

export default async function PromediosPage() {

  const estudiantes =
    await prisma.estudiante.findMany({
      include: {
        notas: true,
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-blue-950">
          Promedios
        </h1>

        <p className="text-slate-500 mt-2">
          Rendimiento académico institucional.
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-950 text-white">

            <tr>

              <th className="text-left p-5">
                Estudiante
              </th>

              <th className="text-left p-5">
                Promedio
              </th>

              <th className="text-left p-5">
                Estado
              </th>

            </tr>

          </thead>

          <tbody>

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

                <tr
                  key={estudiante.id}
                  className="border-b"
                >

                  <td className="p-5">
                    {estudiante.nombre}
                  </td>

                  <td className="p-5 font-bold text-blue-900">
                    {promedio.toFixed(2)}
                  </td>

                  <td className="p-5">

                    <span
                      className={
                        promedio < 65
                          ? "bg-red-100 text-red-700 px-4 py-2 rounded-xl"
                          : promedio < 75
                          ? "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl"
                          : "bg-green-100 text-green-700 px-4 py-2 rounded-xl"
                      }
                    >

                      {promedio < 65
                        ? "Riesgo alto"
                        : promedio < 75
                        ? "Seguimiento"
                        : "Adecuado"}

                    </span>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </main>
  );
}