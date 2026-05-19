"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const promedioData = [

  {
    nivel: "7°",
    promedio: 78,
  },

  {
    nivel: "8°",
    promedio: 81,
  },

  {
    nivel: "9°",
    promedio: 75,
  },

  {
    nivel: "10°",
    promedio: 84,
  },

  {
    nivel: "11°",
    promedio: 88,
  },
];

const riesgoData = [

  {
    name: "Riesgo",
    value: 12,
  },

  {
    name: "Adecuados",
    value: 88,
  },
];

export default function EstadisticasPage() {

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="mb-10">

        <h1 className="text-6xl font-bold text-blue-950">
          Estadísticas Institucionales
        </h1>

        <p className="text-slate-500 mt-3 text-xl">
          Indicadores académicos y alertas tempranas.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* GRÁFICO PROMEDIOS */}
        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-3xl font-bold text-blue-950 mb-8">
            Promedio por nivel
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer>

              <BarChart data={promedioData}>

                <XAxis dataKey="nivel" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="promedio"
                  fill="#1E3A8A"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* GRÁFICO RIESGO */}
        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-3xl font-bold text-red-700 mb-8">
            Riesgo académico
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={riesgoData}
                  dataKey="value"
                  outerRadius={140}
                  label
                >

                  <Cell fill="#DC2626" />

                  <Cell fill="#16A34A" />

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </main>
  );
}