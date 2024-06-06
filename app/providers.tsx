import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export default async function Providers({children}:{children:React.ReactNode}){
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}