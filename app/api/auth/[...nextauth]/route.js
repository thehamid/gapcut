import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import connect from "@/utils/db";
import { cookies } from "next/headers";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || "Unknown",
          email: profile.email,
          avatar: profile.picture,
          username: profile.sub,
          roles: [200],
          active: true,
          provider: "google",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const formEmail = credentials?.email;
        const formPassword = credentials?.password;

        await connect();
        const isUserExist = await User.findOne({
          email: formEmail,
        });

        if (!isUserExist) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          formPassword,
          isUserExist?.password
        );

        if (!isValidPassword) {
          return null;
        }

        const userUpdate = await User.findByIdAndUpdate(isUserExist?._id, {
          $set: { lastLoginAt: Date.now() },
        });
        if (!userUpdate) {
          return null;
        }
        return {
          id: isUserExist?._id,
          name: isUserExist?.name || "anonymous",
          email: isUserExist?.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const isActiveUser = await User.findOne({
        email: user?.email,
      });

      if (isActiveUser?.active) {
        console.log("Good User");
        return true;
      } else {
        console.log("Bad User");
        return false;
      }

      //  console.log('Activity Status check', isActiveUser);
    },

    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account?.access_token;
      }
      let customData;
      if (user) {
        token.id = user?.id;
        const userNewData = user;

        if (!userNewData?.provider) {
          const existUser = await User.findOne({
            email: user?.email,
          });
          customData = {
            id: existUser?.id,
            name: existUser?.name,
            email: existUser?.email,
            username: existUser?.username,
            avatar: existUser?.avatar,
            roles: existUser?.roles,
            active: existUser?.active,
          };
        } else {
          customData = {
            id: userNewData?.id,
            name: userNewData?.name,
            email: userNewData?.email,
            username: userNewData?.username,
            avatar: userNewData?.avatar,
            roles: userNewData?.roles,
            active: userNewData?.active,
          };
        }
      }
      return { ...token, ...customData };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
