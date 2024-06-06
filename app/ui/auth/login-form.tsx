"use client";

import { Button, Input, Link } from "@nextui-org/react";
import {AuthInput, AuthButton, ErrorMessage, SignInWithGoogleButton} from "./components";
import { signInUser } from "@/app/lib/auth/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

export default function LoginForm(){
    const [errorMessage, dispatch] = useFormState(signInUser, undefined);

    return(
        <form action={dispatch} id='login-form' className='flex flex-col gap-y-4 items-center'>
            <AuthInput name='email' type='email' label='Email' id='email'/>
            <AuthInput name='password' type='password' label='Password' id='password'/>
            <AuthButton text='Sign In'/>
            <SignInWithGoogleButton />
            <ErrorMessage message={errorMessage}/>
            <Link href='/auth/register' size='sm'>Create an account</Link>
            <Link href='/auth/forgot-your-pass' size='sm'>Forgot your password?</Link>
        </form> 
    )
}