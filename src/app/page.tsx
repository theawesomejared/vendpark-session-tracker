import { Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-6">
      <Typography variant="h5" component="div">
        <Link href="/user-session">I want to park</Link>
      </Typography>
      <Typography variant="h5" component="div">
        <Link href="/admin">I'm an admin</Link>
      </Typography>
    </main>
  );
}
