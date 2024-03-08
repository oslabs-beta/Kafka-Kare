import { NextAuthConfig } from 'next-auth'; //not sure if we need this one?
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
        username: {
            label: "Username",
            type: "text",
        },
        password: {
            label: "Passpord",
            type: "password",
        },
    },
    async authorize(credentials) {
        if (credentials.username === '' && credentials.password === '') 
        return {
            name: 'success',
        };
        else return console.log('error authorizing credentials')
    },
});


const config = {
    providers: [Google, credentialsConfig],
    callbacks: {
        authorized( { request, auth }) {
            const { pathname } = request.nextUrl;
            if (pathname === 'middlewareProtected') return !!auth;
            return true;
        },
    },
};


export const { handlers, auth, signIn, signOut } = NextAuth(config);