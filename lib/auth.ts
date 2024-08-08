import { PrismaAdapter } from "@auth/prisma-adapter";
import * as bcrypt from "bcrypt";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "./db";

class NoCredentials extends CredentialsSignin {
  code = "No credentials provided.";
}

class UserNotFound extends CredentialsSignin {
  code = "User not found.";
}

class ThirdPartySignIn extends CredentialsSignin {
  code = "Please sign in using Google";
}

class InvalidPassword extends CredentialsSignin {
  code = "Invalid password.";
}

class VerificationPending extends CredentialsSignin {
  code = "Email verification pending.";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", name: "email" },
        password: { type: "password", name: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new NoCredentials();
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new UserNotFound();
        }

        if (!user.password) {
          throw new ThirdPartySignIn();
        }

        const isPasswordMatching = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordMatching) {
          throw new InvalidPassword();
        }

        if (!user.emailVerified) {
          throw new VerificationPending();
        }

        return {
          id: user.id,
          name: user.name,
          emial: user.email,
        };
      },
    }),
    Google,
  ],
});
