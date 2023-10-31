import { ParkingSessionData } from "@/types";
import { LoadingButton } from "@mui/lab";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const ActiveSession = ({
  sessionData: { licensePlate, startTime },
  onEndSession,
}: {
  sessionData: ParkingSessionData;
  onEndSession(): void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleEndSession = async () => {
    setLoading(true);

    try {
      await fetch("/user-session/end", {
        method: "POST",
        body: JSON.stringify({
          licensePlate,
        }),
      });

      onEndSession();
    } catch {
      // todo: handle errors
      setLoading(false);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography color="text.secondary">
          Active parking session for
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {licensePlate.toUpperCase()}
        </Typography>
        <Typography color="text.secondary">Started at</Typography>
        <Typography variant="h5" component="div">
          {new Date(startTime).toLocaleTimeString()}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          onClick={handleEndSession}
          loading={loading}
        >
          End session
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
