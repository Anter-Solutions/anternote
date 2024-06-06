'use client';

import {Button} from '@nextui-org/button';
import {Input} from '@nextui-org/input';
import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/app/lib/auth/actions";

export function AuthInput({type, id, label, name, fieldErrors}: {type?: string | undefined, id: string, label?: React.ReactNode, name: string, fieldErrors?: string[] | undefined}){
    return(
        <div className="w-full">
            <Input className='w-full' variant='bordered' size='sm' type={type} id={id} label={label} name={name} required />
            <FieldError fieldErrors={fieldErrors}/>
        </div>
        
    )
}

export function AuthButton({text}: {text?: string}){
    const formStatus = useFormStatus();
    return (
        <Button type='submit' variant='shadow' className='w-full' disabled={formStatus.pending} size='lg' color='danger'>
            Sign In
        </Button>
    )
}

export function ErrorMessage({message}: {message: string | null | undefined}){
    return (
        <p className='text-red-500 text-xs break-words text-center'>{message}</p>
    );
}

export function FieldErrorMessage({message}: {message: string | null | undefined}){
    return (
        <p className='text-red-500 text-xs break-words mx-1 mt-4 text-center'>{message}</p>
    );
}

export function FieldError({fieldErrors}: {fieldErrors?: string[] | undefined}){
    return (
        <div>
            {fieldErrors?.map((error: string) => (
                <FieldErrorMessage key={error} message={error}/>
            ))}
        </div>
    )
}

export function SignInWithGoogleButton(){
    const onPress = async (event: any) => {
        await signInWithGoogle();
    };

    return(
        <Button onPress={onPress} size='lg' variant='bordered' className='w-full bg-white'>Sign in with <FcGoogle/></Button>
    ) 
}