-- CreateTable
CREATE TABLE "Horario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grupo" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "profesor" TEXT NOT NULL,
    "aula" TEXT NOT NULL
);
