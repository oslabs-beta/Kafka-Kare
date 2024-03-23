import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.AUTH_GOOGLE_ID,
   clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
 ],
 secret: process.env.AUTH_SECRET
};
export default NextAuth(authOptions);