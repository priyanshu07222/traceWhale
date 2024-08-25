import axios from "axios";
import { Session } from "inspector";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import { signIn, signOut } from "next-auth/react";
import { pages } from "next/dist/build/templates/app-page";


const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "xyz@gmail.com" },
                password: { label: "Password", type: "password", placeholder:"********" }
            },
            async authorize(credentials:any, req:any):Promise<any> {
                const email = credentials.email;
                const password = credentials.password;

                console.log("here we go", email, password)

                if(!email || !password) {
                    return Response.json({
                        msg: "All fields are required"
                    })
                }

                console.log("heelo1")

                const user = axios.post('http://localhost:3001/api/v1/users/login', {email, password})
                console.log("heelo2")

                if(!user) {
                    return null
                }
                console.log("heelo3")

                return user;
                console.log("heelo4")
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/',
        Error: '/'
    },
    session: {
        jwt:true,
    },
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
        async session({ session, token }) {
          session.user.id = token.id;
          return session;
        }
    }

}

export default authOptions;