export default async function Layout({children}: {children: React.ReactNode}){
    return (
        <div className='w-full self-center p-24 flex flex-col gap-y-8'>
            {children}
        </div>
    )
}