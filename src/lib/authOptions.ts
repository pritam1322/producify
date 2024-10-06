import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const authOptions : NextAuthOptions = {
    secret : process.env.SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          })
    ]
};

export default authOptions;