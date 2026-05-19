import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function GET() {

  try {

    const message = await client.messages.create({

      from: process.env.TWILIO_WHATSAPP_FROM,

      to: "whatsapp:+50670509766",

      body:
        "🚨 Sistema Institucional LRBT: Prueba de mensaje automática funcionando correctamente.",

    });

    return NextResponse.json({
      ok: true,
      sid: message.sid,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      ok: false,
      error,
    });

  }
}