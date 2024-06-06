import NextAuth, { Session, User } from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import bcrypt from 'bcryptjs';
import { getOAuthUser, getUser, getUserById, signInWithOAuthCallback } from '@/app/lib/auth/actions';
import google from 'next-auth/providers/google';
import { ObjectId } from 'mongodb';
import { JWT } from 'next-auth/jwt';
import {User as AnterUser} from '@/app/lib/auth/definitions';

let curUser: User | undefined | null;

interface JWTWithId extends JWT{
    id?: ObjectId
}

export const {signIn, signOut, handlers: {GET, POST}, auth} = NextAuth({
    ...authConfig,
    callbacks: {
        async signIn({user, account, profile, email, credentials}){
            if(account?.provider === 'google'){
                curUser = await signInWithOAuthCallback(account, profile);
            }else if(account?.provider === 'credentials'){
                if(!credentials?.email){
                    return false;
                }
                curUser = await getUser(credentials?.email.toString());
                return curUser ? true : false;
            }
            return true;
        },
        async session(params: { session: Session, user: User, token: JWTWithId }) {
            const session = params.session;
            const user = params.user;
            const token = params.token;
            if(!token.id || !session){
                return session;
            }
            let curUser = await getUserById(token.id);
            if(!curUser?._id){
                return session;
            }
            if(!session.user){
                session.user = {
                    id: undefined,
                    name: undefined,
                    image: undefined
                };
            }
            session.user.id = curUser._id.toString();
            session.user.name = curUser.fullName?.toString();
            session.user.image = curUser.imageUrl?.toString();
            return session;
        },
        async jwt({account, profile, user, token}){
            let userForSession: AnterUser | undefined | null;
            if(account && account.provider != 'credentials' && profile){
                userForSession = await getOAuthUser(account, profile);
            }else{
                userForSession = await getUser(token?.email);
            }
            if(!userForSession){
                return token;
            }
            token.id = userForSession._id;
            return token;
        }
    },
    providers:[Credentials({
        credentials:{
            email:{},
            password:{}
        },
        authorize: async(credentials) => {
            const parsedCredentials = z
                                    .object({ email: z.string().email(), password: z.string().min(6) })
                                    .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                if(!user.password){
                    return null;
                }
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if(passwordsMatch) {
                    return user;
                }
            }
            
            console.log('Invalid credentials');
            return null;
        }
    }),
    google({clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET})]
});


