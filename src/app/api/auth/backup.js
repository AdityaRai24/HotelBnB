import { Connection } from "@/lib/Connection";
import User from "@/modals/User";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  credentials: {},
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await Connection();
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
        console.log("Something went wrong while trying to login");
        console.log(error, "okkk");
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
