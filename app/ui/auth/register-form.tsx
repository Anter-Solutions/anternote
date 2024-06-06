'use client';

import { Button, Input, Link } from "@nextui-org/react";
import {AuthInput, AuthButton, ErrorMessage, SignInWithGoogleButton} from "./components";
import { signUpUser } from "@/app/lib/auth/actions";
import { useFormState } from "react-dom";

export default function RegisterForm(){
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState(signUpUser, initialState);
    return(
        <form action={dispatch} id='login-form' className='flex flex-col gap-y-4 items-center'>
            <AuthInput type='text' label='Full Name' id='full-name' name='full-name' fieldErrors={state.errors?.fullName}/>
            <AuthInput type='email' label='Email' id='email' name='email' fieldErrors={state.errors?.email}/>
            <AuthInput type='password' label='Password' id='password' name='password' fieldErrors={state.errors?.password}/>
            <AuthInput type='password' label='Confirm password' id='confirm-password' name='confirm-password'/>
            <AuthButton text='Sign Up'/>
            <SignInWithGoogleButton />
            <ErrorMessage message={state.message}/>
            <Link href='/auth/login' size='sm'>Have an account? Sign In</Link>
            <Link href='/auth/forgot-your-pass' size='sm'>Forgot your password?</Link>
        </form> 
    )
}

