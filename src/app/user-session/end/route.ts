import { endSession } from "../../../firestore";

// Ends a parking session
export async function POST(request: Request) {
  const { licensePlate } = await request.json();

  const doc = await endSession(licensePlate);

  return Response.json({});
}
