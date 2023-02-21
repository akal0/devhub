import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db/client";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});