import Image from 'next/image';
import anterlogo from '@/public/Logo.png';
import LoginForm from '@/app/ui/auth/login-form';

export default async function Page(){
    return(  
        <LoginForm />
    )
} 