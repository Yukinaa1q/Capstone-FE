import RoomApi from "@/api/RoomApi";
import DataTable from "@/components/DataTable";
import ClearableSearch from "@/components/Input/ClearableSearch";
import ContentLayout from "@/layouts/ContentLayout";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import NewRoom from "./NewRoom/NewRoom";

interface Room {
  roomId: string;
  roomCode: string;
  roomAddress: string;
  onlineRoom: string;
  maxClasses: number;
  currentClasses: number;
}

const RoomColumnDefs: ColumnDef<Room>[] = [
  {
    accessorKey: "roomCode",
    header: "ROOM NUMBER",
    cell: (props) => <div className="">{props.row.getValue("roomCode")}</div>,
  },
  {
    accessorKey: "roomAddress",
    header: "ROOM ADDRESS",
    cell: (props) => <div>{props.row.getValue("roomAddress")}</div>,
  },
  {
    accessorKey: "onlineRoom",
    header: "ONLINE ROOM LINK",
    cell: (props) =>
      props.row.getValue("onlineRoom") === "None" ? (
        "None"
      ) : (
        <a
          href={props.row.getValue("onlineRoom")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {"Online Room Link"}
        </a>
      ),
  },
  // {
  //   accessorKey: "currentClasses",
  //   header: () => <div className="text-center">OCCUPIED CLASSES</div>,
  //   cell: (props) => (
  //     <div className="text-center">{props.row.getValue("currentClasses")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "maxClasses",
  //   header: () => <div className="text-center">MAX CLASSES</div>,
  //   cell: (props) => (
  //     <div className="text-center">{props.row.getValue("maxClasses")}</div>
  //   ),
  // },
  {
    accessorKey: "roomId",
    header: () => <NewRoom/>,
    cell: () => <></>
  },
];

const RoomsPage = () => {
  // Sample data
  const [rooms, setRoom] = React.useState<Room[]>([
    {
      roomId: "1",
      roomCode: "R001",
      roomAddress: "123 Main St, Building A",
      onlineRoom: "None",
      currentClasses: 1,
      maxClasses: 2,
    },
    {
      roomId: "2",
      roomCode: "None",
      roomAddress: "None",
      onlineRoom: "https://meet.google.com/room002",
      currentClasses: 0,
      maxClasses: 4,
    },
  ]);

  useEffect(() => {
    const getAllRooms = async () => {
      const allRooms = await RoomApi.getAllRooms() as Room[];
      setRoom(allRooms);
    }

    getAllRooms();
  }, [])

  const table = useReactTable({
    data: rooms,
    columns: RoomColumnDefs,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <ContentLayout>
      <ClearableSearch
        className="my-4 w-full md:w-3/4 lg:w-1/2 mx-auto"
        handleChange={(e) => table.setGlobalFilter(e)}
      />
      <DataTable columns={RoomColumnDefs} table={table} />
    </ContentLayout>
  );
};

export default RoomsPage;
