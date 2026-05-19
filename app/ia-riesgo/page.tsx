"use client";

interface Estudiante {

  nombre: string;

  promedio: number;

  ausencias: number;

  alertas: number;

  observaciones: number;
}

const estudiantes: Estudiante[] = [

  {
    nombre: "Juan Pérez",
    promedio: 58,
    ausencias: 12,
    alertas: 4,
    observaciones: 6,
  },

  {
    nombre: "María Rodríguez",
    promedio: 74,
    ausencias: 4,
    alertas: 1,
    observaciones: 2,
  },

  {
    nombre: "Carlos Sánchez",
    promedio: 91,
    ausencias: 1,
    alertas: 0,
    observaciones: 0,
  },
];

function calcularRiesgo(
  estudiante: Estudiante
) {

  let puntaje = 0;

  // PROMEDIO
  if (estudiante.promedio < 65) {

    puntaje += 4;

  } else if (
    estudiante.promedio < 75
  ) {

    puntaje += 2;

  }

  // AUSENCIAS
  if (estudiante.ausencias > 10) {

    puntaje += 3;

  } else if (
    estudiante.ausencias > 5
  ) {

    puntaje += 1;

  }

  // ALERTAS
  puntaje += estudiante.alertas;

  // OBSERVACIONES
  puntaje +=
    estudiante.observaciones * 0.5;

  // RESULTADO
  if (puntaje >= 8) {

    return {
      nivel: "Alto",
      color:
        "bg-red-100 text-red-700",
    };
  }

  if (puntaje >= 4) {

    return {
      nivel: "Moderado",
      color:
        "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    nivel: "Bajo",
    color:
      "bg-green-100 text-green-700",
  };
}

export default function IARiesgoPage() {

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-6xl font-bold text-blue-950">
          IA Riesgo Académico
        </h1>

        <p className="text-slate-500 mt-3 text-xl">
          Sistema inteligente de alerta temprana.
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
                Ausencias
              </th>

              <th className="text-left p-5">
                Alertas
              </th>

              <th className="text-left p-5">
                Observaciones
              </th>

              <th className="text-left p-5">
                Riesgo IA
              </th>

            </tr>

          </thead>

          <tbody>

            {estudiantes.map(
              (estudiante) => {

                const riesgo =
                  calcularRiesgo(
                    estudiante
                  );

                return (

                  <tr
                    key={estudiante.nombre}
                    className="border-b"
                  >

                    <td className="p-5 font-bold">
                      {estudiante.nombre}
                    </td>

                    <td className="p-5">
                      {estudiante.promedio}
                    </td>

                    <td className="p-5">
                      {estudiante.ausencias}
                    </td>

                    <td className="p-5">
                      {estudiante.alertas}
                    </td>

                    <td className="p-5">
                      {estudiante.observaciones}
                    </td>

                    <td className="p-5">

                      <span
                        className={`${riesgo.color} px-4 py-2 rounded-xl font-bold`}
                      >
                        {riesgo.nivel}
                      </span>

                    </td>

                  </tr>

                );
              }
            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}