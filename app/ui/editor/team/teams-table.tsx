import { getCurrentUserClientTeams } from "@/app/lib/editor/team/actions";
import User from "@nextui-org/user"
import Tooltip from '@nextui-org/tooltip'
import { Team, teamsTableColumns } from "@/app/lib/editor/team/definitions";
import { Key } from "react";
import { IoPencil, IoTrashBin } from "react-icons/io5";
import ClientTeamsTable from "./teams-table-client-components";

export async function TeamsTable(){
    let teams = await getCurrentUserClientTeams();

    return (
        <ClientTeamsTable teams={teams} />
    )
}

