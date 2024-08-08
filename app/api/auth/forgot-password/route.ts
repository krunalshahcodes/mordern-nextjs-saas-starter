import { TokenType } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { ForgotPassword } from "@/emails/fogot-password";
import { env } from "@/env.mjs";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import { forgotPasswordSchemaType } from "@/lib/schemas/auth";

export const POST = async (req: NextRequest) => {
  const data: forgotPasswordSchemaType = await req.json();

  const user = await db.user.findUnique({ where: { email: data.email } });

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 400 });
  }

  if (!user.password) {
    return NextResponse.json(
      { message: "Can not reset password while using Google Sign In." },
      { status: 400 },
    );
  }

  const token = nanoid(32);

  await db.verificationToken.create({
    data: {
      token,
      identifier: user.id,
      type: TokenType.RESET_PASSWORD,
    },
  });

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: [user.email],
    subject: "",
    react: ForgotPassword({ name: user.name, token }),
  });

  return NextResponse.json({ message: "Success", data });
};
