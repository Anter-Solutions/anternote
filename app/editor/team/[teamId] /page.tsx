import { notFound } from "next/navigation";
import { getTeamByIdString } from "@/app/lib/editor/team/actions";
import {Input} from '@nextui-org/input';

export default async function Page({params} : {params: {teamId: string}}){
    const teamId = params.teamId;
    return(
        <>{teamId}</>
    )
    // const id = params.id;
    // console.log(id);

    // if(!id){
    //     notFound();
    // }

    // const team = await getTeamByIdString(id);

    // if(!team){
    //     notFound();
    // }

    // return(
    //     <form id='team-edit-form' className='flex flex-col gap-y-4 items-center'>
    //         <Input className='w-full' variant='bordered' size='sm' type='text' id='text' label='Text' name='Text' required />
    //     </form> 
    // )
}