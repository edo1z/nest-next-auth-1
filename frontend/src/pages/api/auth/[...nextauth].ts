import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@nest-next-auth-1/database";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("[signIn callback]", user, account);
      return true;
    },
    async jwt({ token, account }) {
      console.log("[jwt callback]", token, account);
      return token;
    },
    async session({ session, token }) {
      console.log("[session callback]", session, token);
      return session;
    },
  },
  events: {
    signIn: async (msg) => {
      console.log("[signIn]", msg);
    },
    createUser: async (msg) => {
      console.log("[createUser]", msg);
    },
    session: async (msg) => {
      console.log("[session]", msg);
    },
  },
});
