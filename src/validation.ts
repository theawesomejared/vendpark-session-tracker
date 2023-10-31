import { SessionDataValidation, SessionPropValidation } from "./types";

const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const numericRegex = /^\d+$/;

export class SessionDataValidationError extends Error {
  data: SessionDataValidation;
  constructor(data: SessionDataValidation) {
    super();
    this.data = data;
  }
}

// I'm not sure if these rules make sense for ALL license plates, but it's a start
function validateLicensePlate(licensePlate: string): SessionPropValidation {
  const result = { valid: true, message: "" };

  if (!licensePlate || licensePlate.length > 8) {
    result.valid = false;
    result.message = "License plate must be between 1 and 8 characters";
  } else if (!alphanumericRegex.test(licensePlate)) {
    result.valid = false;
    result.message = "License plate must only contain letters and numbers";
  }

  return result;
}

// Very basic phone number validation--look into a proper validation library
function validatePhoneNumber(phoneNumber: string): SessionPropValidation {
  const result = { valid: true, message: "" };

  if (!phoneNumber || phoneNumber.length !== 10) {
    result.valid = false;
    result.message = "Phone number must contain 10 digits";
  } else if (!numericRegex.test(phoneNumber)) {
    result.valid = false;
    result.message = "Phone number must only contain digits";
  }

  return result;
}

export function validateSessionData(licensePlate: string, phoneNumber: string) {
  const licensePlateValidation = validateLicensePlate(licensePlate);
  const phoneNumberValidation = validatePhoneNumber(phoneNumber);

  // If invalid, throw an error to be caught by the API
  if (!licensePlateValidation.valid || !phoneNumberValidation.valid) {
    throw new SessionDataValidationError({
      licensePlate: licensePlateValidation,
      phoneNumber: phoneNumberValidation,
    });
  }
}
