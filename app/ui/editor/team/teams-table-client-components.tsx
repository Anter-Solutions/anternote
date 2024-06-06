'use client';

import { ClientTeam, Team } from "@/app/lib/editor/team/definitions";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { teamsTableColumns } from "@/app/lib/editor/team/definitions";
import { useCallback } from "react";
import { User } from "@nextui-org/user"
import { Tooltip } from "@nextui-org/tooltip"
import { IoPencil, IoTrashBin } from "react-icons/io5";
import Link from "next/link";

export default async function ClientTeamsTable({teams}: {teams: ClientTeam[]}){
    const renderCell = useCallback((clientTeam: ClientTeam, columnKey: React.Key) => {    
        switch (columnKey) {
          case "name":
            return (
              <User
                avatarProps={{radius: "lg", src: clientTeam.imageUrl}}
                description={clientTeam.name}
                name={clientTeam.name}
              >
                {clientTeam.name}
              </User>
            );
          case "members":
            return (
              <div className="relative flex items-center">
                <p className="text-bold text-sm capitalize">{clientTeam.users?.length}</p>
              </div>
            );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Link href={`/editor/team/${clientTeam.id}/`}>
                    <Tooltip content="Edit team">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <IoPencil />
                        </span>
                    </Tooltip>
                </Link>
                <Link href={`/editor/team/${clientTeam.id}/delete`}>
                    <Tooltip color="danger" content="Delete team">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <IoTrashBin />
                        </span>
                    </Tooltip>
                </Link>
              </div>
            );
        }
      }, []);

    return (
        <Table aria-label="Teams table">
            <TableHeader columns={teamsTableColumns}>
                {(column) => (<TableColumn key={column.uid}>{column.name}</TableColumn>)}
            </TableHeader>
            <TableBody items={teams}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}