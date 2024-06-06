import Navbar from "@/app/ui/editor/navbar";

export default async function Layout({children}: {children: React.ReactNode}){
    return (
        <div className='flex flex-row'>
            <Navbar />
            {children}
        </div>
    )
}