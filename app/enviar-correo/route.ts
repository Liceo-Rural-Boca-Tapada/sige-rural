import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(
  request: Request
) {

  try {

    const {
      correo,
      mensaje,
    } = await request.json();

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: correo,

      subject:
        "SIGE-RURAL LRBT",

      text: mensaje,
    });

    return NextResponse.json({
      ok: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        ok: false,
      },
      {
        status: 500,
      }
    );
  }
}