import { getCurrentUserClientTeams } from "@/app/lib/editor/team/actions";
import { TeamsTable } from "@/app/ui/editor/team/teams-table";

export default async function Page(){
    return (
        <>
            <h2 className='text-4xl'>Teams you are in</h2>
            <TeamsTable />
        </>
    )
}