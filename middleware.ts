import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {

  const pathname =
    request.nextUrl.pathname;

  // RUTAS LIBRES
  if (
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/estudiantes/:path*",
    "/notas/:path*",
    "/asistencia/:path*",
    "/promedios/:path*",
    "/alertas/:path*",
    "/boletines/:path*",
    "/justificaciones/:path*",
  ],
};