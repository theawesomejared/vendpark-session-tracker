"use client";

import { ParkingSessionData } from "@/types";
import { useState } from "react";
import CreateSessionForm from "./CreateSessionForm";
import { ActiveSession } from "./ActiveSession";

// Displays a session lookup/create form, or displays a session once retrieved
export default function SessionPage() {
  const [sessionData, setSessionData] = useState<ParkingSessionData | null>(
    null
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {!sessionData ? (
        <CreateSessionForm onSession={setSessionData} />
      ) : (
        <ActiveSession
          sessionData={sessionData}
          onEndSession={() => setSessionData(null)}
        />
      )}
    </main>
  );
}
