-- CreateTable
CREATE TABLE "Justificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "motivo" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Pendiente',
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estudianteId" INTEGER NOT NULL,
    CONSTRAINT "Justificacion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
