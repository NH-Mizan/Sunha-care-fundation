import { NextResponse } from "next/server";

import { createUser } from "@/lib/user-store";

type RegisterBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  password?: string;
  consent?: boolean;
};

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: RegisterBody;

  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const firstName = getStringValue(body.firstName);
  const lastName = getStringValue(body.lastName);
  const email = getStringValue(body.email);
  const phone = getStringValue(body.phone);
  const role = getStringValue(body.role);
  const password = getStringValue(body.password);
  const consent = body.consent === true;

  if (!firstName || !lastName || !email || !phone || !role || !password) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json(
      { message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters long." },
      { status: 400 }
    );
  }

  if (!consent) {
    return NextResponse.json(
      { message: "Please accept the consent checkbox to continue." },
      { status: 400 }
    );
  }

  try {
    const user = await createUser({
      firstName,
      lastName,
      email,
      phone,
      role,
      password,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create the account.";

    return NextResponse.json({ message }, { status: 400 });
  }
}
