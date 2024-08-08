import { TokenType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const token = req.nextUrl.searchParams.get("token") as string;

  const exists = await db.verificationToken.findUnique({
    where: {
      token,
      type: TokenType.EMAIL_VERIFICATION,
    },
  });

  if (!exists) {
    return NextResponse.json(
      { message: "Invalid or expired token." },
      { status: 400 },
    );
  }

  await db.user.update({
    where: { id: exists.identifier },
    data: { emailVerified: new Date(Date.now()) },
  });

  await db.verificationToken.delete({ where: { token } });

  return NextResponse.json({ message: "Success" });
};
