import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const totalEstudiantes = await prisma.estudiante.count();
  const totalAsistencias = await prisma.asistencia.count();
  const ausentes = await prisma.asistencia.count({
    where: { estado: "Ausente" },
  });
  const presentes = await prisma.asistencia.count({
    where: { estado: "Presente" },
  });
  const totalProfesores = await prisma.profesor.count();
  const totalMaterias = await prisma.materia.count();
  const totalNotas = await prisma.nota.count();

  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-blue-950 text-white p-6">
        <h1 className="text-3xl font-bold mb-10">Sistema Institucional LRBT</h1>

        <nav className="space-y-4">
          <a href="/dashboard" className="block bg-blue-800 p-4 rounded-xl">
            Dashboard
          </a>
          <a href="/estudiantes" className="block hover:bg-blue-900 p-4 rounded-xl">
            Estudiantes
          </a>
          <a href="/asistencia" className="block hover:bg-blue-900 p-4 rounded-xl">
            Asistencia
          </a>
          <a href="/alertas" className="block hover:bg-blue-900 p-4 rounded-xl">
            Alertas
          </a>
          <a href="/profesores" className="block hover:bg-blue-900 p-4 rounded-xl">
            Profesores
          </a>
          <a href="/materias" className="block hover:bg-blue-900 p-4 rounded-xl">
            Materias
          </a>
          <a href="/notas" className="block hover:bg-blue-900 p-4 rounded-xl">
            Notas
          </a>
        </nav>
      </aside>

      <section className="ml-64 p-10">
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-blue-950 mb-2">
            Dashboard
          </h2>
          <p className="text-slate-500">
            Panel general del sistema educativo.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500 mb-2">Estudiantes</p>
            <h3 className="text-5xl font-bold text-blue-900">
              {totalEstudiantes}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500 mb-2">Asistencias</p>
            <h3 className="text-5xl font-bold text-green-600">
              {totalAsistencias}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500 mb-2">Ausentes</p>
            <h3 className="text-5xl font-bold text-red-600">
              {ausentes}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500 mb-2">Presentes</p>
            <h3 className="text-5xl font-bold text-yellow-500">
              {presentes}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500 mb-2">Profesores</p>
            <h3 className="text-5xl font-bold text-purple-700">
              {totalProfesores}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500 mb-2">Materias</p>
            <h3 className="text-5xl font-bold text-cyan-700">
              {totalMaterias}
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500 mb-2">Notas registradas</p>
            <h3 className="text-5xl font-bold text-orange-600">
              {totalNotas}
            </h3>
          </div>
        </div>
      </section>
    </main>
  );
}