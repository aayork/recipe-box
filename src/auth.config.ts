import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/UserSchema";

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  secret: process.env.AUTH_SECRET, // Use an environment variable for the secret
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();

        const user = await User.findOne({ email: credentials?.email });
        if (
          !user ||
          !(await bcrypt.compare(credentials?.password || "", user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id, email: user.email }; // Return the user object for the session
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};
