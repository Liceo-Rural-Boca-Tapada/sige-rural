"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [correo, setCorreo] =
    useState("");

  const [password, setPassword] =
    useState("");

  function iniciarSesion(
    e: React.FormEvent
  ) {

    e.preventDefault();

    // DIRECTOR
    if (
      correo === "director@lrbt.cr" &&
      password === "1234"
    ) {

      localStorage.setItem(
        "rol",
        "director"
      );

      router.push("/");
      return;
    }

    // DOCENTE
    if (
      correo === "docente@lrbt.cr" &&
      password === "1234"
    ) {

      localStorage.setItem(
        "rol",
        "docente"
      );

      router.push("/");
      return;
    }

    alert("Credenciales incorrectas");
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-10">

      <div className="bg-white rounded-3xl shadow p-10 w-full max-w-md">

        <h1 className="text-5xl font-bold text-blue-950 mb-4">
          LRBT
        </h1>

        <p className="text-slate-500 mb-10">
          Sistema Institucional
        </p>

        <form
          onSubmit={iniciarSesion}
          className="space-y-6"
        >

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) =>
              setCorreo(e.target.value)
            }
            className="w-full border border-slate-300 rounded-2xl px-5 py-4"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-slate-300 rounded-2xl px-5 py-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white rounded-2xl px-5 py-4 font-bold"
          >
            Ingresar
          </button>

        </form>

        <div className="mt-8 text-sm text-slate-500">

          <p>
            Director:
            director@lrbt.cr
          </p>

          <p>
            Docente:
            docente@lrbt.cr
          </p>

          <p>
            Contraseña:
            1234
          </p>

        </div>

      </div>

    </main>
  );
}