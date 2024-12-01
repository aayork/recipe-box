import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcryptjs";
import { User } from "./models/UserSchema";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
