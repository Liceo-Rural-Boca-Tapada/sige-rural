import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SIGE-RURAL LRBT",

  description:
    "Sistema Institucional Liceo Rural Boca Tapada",

  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="es">

      <body>

        {children}

      </body>

    </html>

  );
}