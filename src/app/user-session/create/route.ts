import { SessionDataValidationError } from "@/validation";
import { getOrCreateSession } from "../../../firestore";

export async function POST(request: Request) {
  const { licensePlate, phoneNumber } = await request.json();

  try {
    const doc = await getOrCreateSession(licensePlate, phoneNumber);
    return Response.json(doc);
  } catch (err) {
    if (err instanceof SessionDataValidationError) {
      return Response.json(err.data, { status: 400 });
    }
    throw err;
  }
}
