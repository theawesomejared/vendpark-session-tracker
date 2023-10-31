import { SessionDataValidationError } from "@/validation";
import { getOrCreateSession } from "../../../firestore";

// Returns an existing parking session, or creates a new session if one does not exist
export async function POST(request: Request) {
  const { licensePlate, phoneNumber } = await request.json();

  try {
    const doc = await getOrCreateSession(licensePlate, phoneNumber);
    return Response.json(doc);
  } catch (err) {
    // Send back a 400 error on validation error
    if (err instanceof SessionDataValidationError) {
      return Response.json(err.data, { status: 400 });
    }
    throw err;
  }
}
