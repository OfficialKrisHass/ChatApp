import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod";

import { authConfig } from "./auth.config";
import { User } from "./app/definitions/User";

async function getUser(email: string, password: string) : Promise<User | undefined> {

  try {

    return await fetch("http://localhost:5000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async res => res.json())
    .then(res => {

        if (res.errMsg) throw new CredentialsSignin(res.errMsg);
        return { email, id: 158, token: res.token } as User;

    });

  } catch (error) {

    throw error;

  }

}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {

      const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
      if (!parsedCredentials.success) return null;
      
      const { email, password } = parsedCredentials.data;
      const user = await getUser(email, password);

      if (!user) return null;

      return user;

    },
  })],
});
