"use client";

import { subscribeToSessions } from "@/firestore";
import { ParkingSessionData } from "@/types";
import { Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  {
    field: "licensePlate",
    headerName: "License Plate",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.licensePlate.toUpperCase(),
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "startTime",
    headerName: "Start Time",
    type: "dateTime",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.startTime && new Date(params.row.startTime),
  },
  {
    field: "endTime",
    headerName: "End Time",
    type: "dateTime",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.endTime && new Date(params.row.endTime),
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.endTime ? "Completed" : "Active",
  },
];

// This page is an Admin view with a real-time parking session DataGrid
export default function AdminPage() {
  const [sessions, setSessions] = useState<ParkingSessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return subscribeToSessions((data) => {
      setLoading(false);
      setSessions(data);
    });
  }, []);

  return (
    <main className="flex h-screen flex-col items-center p-4 gap-6">
      <Typography variant="h4" component="h2">
        Parking Sessions
      </Typography>
      <DataGrid
        className="flex-fill"
        rows={sessions}
        columns={columns}
        initialState={{
          sorting: { sortModel: [{ field: "startTime", sort: "desc" }] },
        }}
        slots={{ toolbar: GridToolbar }}
        loading={loading}
      />
    </main>
  );
}
