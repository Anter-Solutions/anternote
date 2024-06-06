import clientPromise from "@/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { ClientTeam, Team } from "@/app/lib/editor/team/definitions";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

async function getCollection(){
    return (await clientPromise).db().collection('teams');
}

const FormSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
    users: z.array(z.string())
});

async function createTeam(name: string, imageUrl: string, users: ObjectId[]){
    const col = await getCollection();
    let team: Team = {
        name,
        imageUrl,
        users
    }
    let result = await col.insertOne(team);
    return result;
}

async function deleteTeam(_id: ObjectId){
    const col = await getCollection();
    let team: Team = {
        _id
    };
    let result = await col.deleteOne(team);
    return result;
}

async function editTeam(team: Team){
    const col = await getCollection();
    let filterTeam: Team = {
        _id: team._id
    };
    let result = await col.updateOne(filterTeam, team);
    return result;
}

export async function getTeamByIdString(id: string){
    const col = await getCollection();
    let filterTeam: Team = {
        _id: ObjectId.createFromHexString(id)
    };
    let result = await col.findOne<Team>(filterTeam);
    return result
}

export async function getCurrentUserClientTeams(){
    const session = await auth();
    console.log(session);
    if(!session?.user?.id){
        return [];
    }
    const col = await getCollection();
    const result = await col.find<Team>({
        users: ObjectId.createFromHexString(session.user.id)
    }).toArray();
    const clientTeams: ClientTeam[] = [];
    for(const team of result){
        let users: string[] = [];
        if(team.users){
            for(const user of team.users){
                users.push(user.toString());
            }
        }
        let clientTeam: ClientTeam = {
            id: team._id?.toString(),
            name: team.name,
            imageUrl: team.imageUrl,
            users: users
        };
        clientTeams.push(clientTeam);
    }
    return clientTeams;
}