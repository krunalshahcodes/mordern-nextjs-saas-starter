import { TokenType } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resetPasswordSchemaType } from "@/lib/schemas/auth";

export const POST = async (req: NextRequest) => {
  const data: resetPasswordSchemaType = await req.json();

  const token = await db.verificationToken.findUnique({
    where: { token: data.token, type: TokenType.RESET_PASSWORD },
  });

  if (!token) {
    return NextResponse.json(
      { message: "Invalid or expired token." },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  await db.user.update({
    where: { id: token.identifier },
    data: { password: hashedPassword },
  });

  await db.verificationToken.delete({ where: { token: data.token } });

  return NextResponse.json({ message: "Success" });
};
