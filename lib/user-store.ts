import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { hashPassword } from "@/lib/password";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  passwordHash: string;
  createdAt: string;
};

type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
};

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIRECTORY, "users.json");

async function ensureUsersFile() {
  await mkdir(DATA_DIRECTORY, { recursive: true });

  try {
    await readFile(USERS_FILE, "utf8");
  } catch {
    await writeFile(USERS_FILE, "[]\n", "utf8");
  }
}

export async function readUsers() {
  await ensureUsersFile();

  const fileContents = await readFile(USERS_FILE, "utf8");
  const parsedUsers = JSON.parse(fileContents) as StoredUser[];

  return Array.isArray(parsedUsers) ? parsedUsers : [];
}

async function writeUsers(users: StoredUser[]) {
  await ensureUsersFile();
  await writeFile(USERS_FILE, `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = await readUsers();

  return users.find((user) => user.email === normalizedEmail) ?? null;
}

export async function createUser(input: CreateUserInput) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const name = `${firstName} ${lastName}`.trim();

  if (!name) {
    throw new Error("Please provide your full name.");
  }

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const users = await readUsers();
  const user: StoredUser = {
    id: randomUUID(),
    name,
    email: normalizedEmail,
    phone: input.phone.trim(),
    role: input.role.trim(),
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);

  return user;
}
