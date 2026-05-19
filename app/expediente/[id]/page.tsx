import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ExpedientePage({
  params,
}: Props) {

  const { id } = await params;

  const estudiante =
    await prisma.estudiante.findUnique({

      where: {
        id: Number(id),
      },

      include: {

        notas: {
          include: {
            materia: true,
          },
        },

        asistencias: true,

        justificaciones: true,

        alertas: true,

        observaciones: true,

      },
    });

  if (!estudiante) {

    return (
      <main className="p-10">
        Estudiante no encontrado
      </main>
    );
  }

  const promedio =
    estudiante.notas.length > 0
      ? estudiante.notas.reduce(
          (acc, nota) =>
            acc + nota.valor,
          0
        ) / estudiante.notas.length
      : 0;

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow p-10 mb-10">

        <h1 className="text-5xl font-bold text-blue-950">
          {estudiante.nombre}
        </h1>

        <p className="text-slate-500 mt-3 text-xl">
          {estudiante.nivel} | {estudiante.seccion}
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">

          <div className="bg-blue-100 rounded-2xl p-6">

            <h2 className="text-slate-600">
              Encargado
            </h2>

            <p className="text-2xl font-bold text-blue-950 mt-2">
              {estudiante.encargado || "-"}
            </p>

          </div>

          <div className="bg-green-100 rounded-2xl p-6">

            <h2 className="text-slate-600">
              WhatsApp
            </h2>

            <p className="text-2xl font-bold text-green-800 mt-2">
              {estudiante.telefonoEncargado || "-"}
            </p>

          </div>

          <div className="bg-yellow-100 rounded-2xl p-6">

            <h2 className="text-slate-600">
              Promedio
            </h2>

            <p className="text-2xl font-bold text-yellow-800 mt-2">
              {promedio.toFixed(2)}
            </p>

          </div>

        </div>

      </div>

      {/* NOTAS */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <h2 className="text-3xl font-bold text-blue-950 mb-6">
          Notas
        </h2>

        <div className="space-y-4">

          {estudiante.notas.map((nota) => (

            <div
              key={nota.id}
              className="border rounded-2xl p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-xl">
                    {nota.materia.nombre}
                  </h3>

                  <p className="text-slate-500">
                    {nota.descripcion}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-3xl font-bold text-blue-900">
                    {nota.valor}
                  </p>

                  <p className="text-slate-500">
                    {nota.porcentaje || 0}%
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* ALERTAS */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <h2 className="text-3xl font-bold text-red-700 mb-6">
          Alertas Tempranas
        </h2>

        <div className="space-y-4">

          {estudiante.alertas.map((alerta) => (

            <div
              key={alerta.id}
              className="border rounded-2xl p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-xl">
                    {alerta.tipo}
                  </h3>

                  <p className="text-slate-600">
                    {alerta.descripcion}
                  </p>

                </div>

                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl h-fit">
                  {alerta.nivel}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* OBSERVACIONES */}
      <div className="bg-white rounded-3xl shadow p-8 mb-10">

        <h2 className="text-3xl font-bold text-yellow-700 mb-6">
          Observaciones
        </h2>

        <div className="space-y-4">

          {estudiante.observaciones.map((obs) => (

            <div
              key={obs.id}
              className="border rounded-2xl p-5"
            >

              <h3 className="font-bold text-xl">
                {obs.titulo}
              </h3>

              <p className="text-slate-500 mt-2">
                {obs.tipo}
              </p>

              <p className="mt-4">
                {obs.descripcion}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}