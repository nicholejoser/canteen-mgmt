import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { CreateUserInput, User } from "@/app/types/user";

const filePath = path.join(process.cwd(), "data", "users_data.json");
const dirPath = path.join(process.cwd(), "data");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
}
// Read users
const readUsers = (): User[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as User[];
  } catch {
    return [];
  }
};

// Write users
const writeUsers = (users: User[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// Basic validation
const validateUser = (input: CreateUserInput) => {
  if (!input.name || input.name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email)) {
    return "Invalid email format";
  }

  return null;
};

// GET /api/users
export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(req: Request) {
  const body: CreateUserInput = await req.json();

  const error = validateUser(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const users = readUsers();

  const newUser: User = {
    id: Date.now(),
    name: body.name.trim(),
    email: body.email.trim(),
    role: body.role,
    status: body.status,
    department: body.department.trim(),
    joinDate: body.joinDate.trim(),
    balance: body.balance,
    password: body.password.trim(),
  };

  users.push(newUser);
  writeUsers(users);

  return NextResponse.json(newUser, { status: 201 });
}
