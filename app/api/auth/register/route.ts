import * as bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { EmailVerification } from "@/emails/email-verification";
import { env } from "@/env.mjs";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import { registerSchemaType } from "@/lib/schemas/auth";

export const POST = async (req: NextRequest) => {
  const data: registerSchemaType = await req.json();

  const exists = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (exists) {
    return NextResponse.json(
      {
        message: "User already registed with this email.",
      },
      {
        status: 400,
      },
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = nanoid(32);

  await db.verificationToken.create({
    data: {
      identifier: user.id,
      token,
    },
  });

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: [user.email],
    subject: "",
    react: EmailVerification({ name: user.name, token }),
  });

  return NextResponse.json({ message: "Success", data });
};
