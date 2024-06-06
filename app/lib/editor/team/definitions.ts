import { ObjectId } from "mongodb";

export type Team = {
    _id?: ObjectId,
    name?: string,
    imageUrl?: string
    users?: ObjectId[]
};

export type ClientTeam = {
    id?: string,
    name?: string,
    imageUrl?: string,
    users?: string[]
}

export const teamsTableColumns = [
    {name: "NAME", uid: "name"},
    {name: "MEMBERS", uid: "members"},
    {name: "ACTIONS", uid: "actions"},
];