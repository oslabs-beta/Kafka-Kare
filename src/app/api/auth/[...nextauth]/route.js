import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
});
export { handler as GET, handler as POST };