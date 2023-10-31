"use client";

import { ParkingSessionData, SessionDataValidation } from "@/types";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function CreateSessionForm({
  onSession,
}: {
  onSession(sessionData: ParkingSessionData): void;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [validation, setValidation] = useState<
    SessionDataValidation | undefined
  >();
  const [loading, setLoading] = useState(false);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/user-session/create", {
        method: "POST",
        body: JSON.stringify({
          phoneNumber,
          licensePlate,
        }),
      });

      const responseData = await res.json();

      if (res.ok) {
        onSession(responseData);
      } else {
        setValidation(responseData);
        setLoading(false);
      }
    } catch {
      // todo: error message
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSumbit} className="flex flex-col gap-6">
      <Typography variant="h4" component="h2" className="text-center">
        Start or retrieve a parking session
      </Typography>
      <TextField
        required
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={validation?.phoneNumber.valid === false}
        helperText={validation?.phoneNumber.message}
      />
      <TextField
        required
        label="License Plate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        error={validation?.licensePlate.valid === false}
        helperText={validation?.licensePlate.message}
      />
      <LoadingButton variant="contained" type="submit" loading={loading}>
        Submit
      </LoadingButton>
    </form>
  );
}
