import { Skeleton } from "@nextui-org/skeleton";
import {Button} from "@nextui-org/button";
import { signOutUser } from "@/app/lib/auth/actions";
import Link from "next/link";
import { clsx } from "clsx";
import Image from "next/image";
import anterlogo from '@/public/Logo.png' 
import { Suspense, useEffect, useState } from "react";
import { ButtonLink, SignOutButton } from "./navbar-client-components";


function Logo(){
    return (
    <>
        <Image
            src={anterlogo}
            alt='Anter logo'
            className='w-24 h-24 object-cover mx-auto rounded-full'
            priority={true}
        />
    </>
    )
}

export default function Navbar(){
    return (
        <div className="min-w-72 bg-gray-50 h-screen flex flex-col p-8">
            <div className="h-2/3 w-full gap-y-4 flex flex-col grow">
                <Link href='/editor'>
                    <Logo />
                </Link>
                <ButtonLink href='/editor/team' text='Teams'/>
                <ButtonLink href='/editor/groups' text='My groups'/>
            </div>
            <div className="h-1/3 w-full flex flex-col justify-end gap-y-2">
                <Button className="w-full bg-white" size="lg" variant='bordered' type='submit'>
                    Settings
                </Button>
                <SignOutButton/>
            </div>
        </div>
    )
}