import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

import { db, app, firebaseConfig } from "../../../firebase"

import { doc, getDoc } from "firebase/firestore";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: FirestoreAdapter(firebaseConfig),
  pages: {
    error: "/login",
    signIn: '/login'
  },
  callbacks: {
    async jwt({token, user}) {
        user && (token.user = user);
        return token;
    },
    async session({session, token, user}) {
      const docRef = await doc(db, "users", user.id);
      const docSnap = await getDoc(docRef);
        session = {
            ...session,
            user: {
              id: user.id,
              ...docSnap.data(),

            }
        }
        return session;
    }
  }
})

