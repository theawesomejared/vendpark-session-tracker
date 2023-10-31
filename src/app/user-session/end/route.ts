import { endSession } from "../../../firestore";

export async function POST(request: Request) {
  const { licensePlate } = await request.json();

  const doc = await endSession(licensePlate);

  return Response.json({});
}
