import type {NextAuthConfig} from 'next-auth';
import { redirect } from 'next/navigation';
import { signInWithOAuthCallback } from './app/lib/auth/actions';
import { NextResponse } from 'next/server';

export const authConfig = {
    pages:{
        signIn: '/auth/login'
    },
    callbacks:{
        authorized({auth, request: {nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnAuthPage = nextUrl.pathname.startsWith('/auth/login') || nextUrl.pathname.startsWith('/auth/register');
            const isOnRootPage = nextUrl.pathname == '/';
            if(!isLoggedIn && (!isOnAuthPage || isOnRootPage)){
                return false;
            }else if((isLoggedIn && isOnAuthPage) || (isLoggedIn && isOnRootPage)){
                nextUrl.pathname = '/editor';
                return NextResponse.redirect(nextUrl);
            }
            return true;
        },
    },
    providers: []
} satisfies NextAuthConfig;