import { Spinner } from "@nextui-org/react";

export default function Loading(){
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">   
            <Spinner color="danger" size="lg"/>
        </div>
    )
}