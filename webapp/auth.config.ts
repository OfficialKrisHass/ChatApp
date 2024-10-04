import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      const loggedIn = !!auth?.user;
      const onDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (onDashboard) {

        if (loggedIn) return true;
        return false;

      } else if (loggedIn)
        //return Response.redirect(new URL("/dashboard", nextUrl));
        return true;

      return true;

    },
  },
  providers: [],
} satisfies NextAuthConfig;
