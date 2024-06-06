'use client';

import { signOutUser } from "@/app/lib/auth/actions";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ButtonLink({href, text}: {href: string, text: string}){
    const pathname = usePathname();

    return (
        <Link href={href}>
            {pathname == href ? 
            (
            <Button size='lg' className='w-full' color='danger' variant='shadow'>
                {text}
            </Button>
            ) 
            : (
            <Button className='w-full bg-white' size='lg' variant='bordered'>
                {text}
            </Button>
            )}
        </Link>
    )
}

export function SignOutButton(){
    return(
        <Button onPress={async (e: any) => await signOutUser()} size="lg" className="w-full" color='danger' type='submit'>
            Sign Out
        </Button>
    ) 
}