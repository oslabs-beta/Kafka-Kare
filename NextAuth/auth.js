import { NextAuthConfig } from 'next-auth'; //not sure if we need this one?
import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

export const config = {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [Google, GitHub]
});