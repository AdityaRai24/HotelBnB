import { Connection } from "@/lib/Connection";
import User from "@/modals/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const dynamic = 'auto'

const handler = NextAuth({
  credentials: {},
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (credentials.fromSignup) {
          return credentials;
        } else {
          const dataUser = await User.findOne({ email: credentials.email });
          if (dataUser) {
            const comparePass = await bcrypt.compare(
              credentials.password,
              dataUser.password
            );
            if (comparePass) {
              credentials.name = dataUser.name;
              return credentials;
            } else {
              throw new Error("Incorrect password");
            }
          } else {
            throw new Error("User does not exist");
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await Connection();

        if (account.provider === "credentials") {
          return true;
        }

        let existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          const response = await User.create({
            name: profile.name,
            email: profile.email,
            profilePic: profile.picture,
            loginType: "google",
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token, credentials }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id;
        return session;
      } catch (error) {
        throw new Error("Something went wrong while creating the session.");
      }
    },
  },
});

export { handler as GET, handler as POST };
