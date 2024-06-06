import Image from "next/image";
import anterlogo from '@/public/Logo.png';
import { redirect } from "next/navigation";
import { auth } from '@/auth';

export default async function Layout({children}: {children: React.ReactNode}){
    return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className='w-80 rounded-3xl shadow-2xl'>
                <div className="w-full h-full p-8 flex flex-col items-center gap-y-4"> 
                    <Image
                        src={anterlogo}
                        alt='Anter logo'
                        className='w-24 mx-auto'
                    />   
                    {children}
                </div>
            </div>
        </div>
    )
}