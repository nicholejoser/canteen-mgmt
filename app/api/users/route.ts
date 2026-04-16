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
// PUT /api/users
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Merge the existing user data with the updated data
    users[userIndex] = { ...users[userIndex], ...updateData };
    writeUsers(users);

    return NextResponse.json(users[userIndex], { status: 200 });
  } catch  {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE /api/users?id=123
export async function DELETE(req: Request) {
  try {
    // Extract the ID from the URL query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    let users = readUsers();
    const initialLength = users.length;
    
    // Filter out the user we want to delete
    users = users.filter((u) => u.id !== Number(id));

    if (users.length === initialLength) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    writeUsers(users);

    return NextResponse.json({ success: true, message: "User deleted" }, { status: 200 });
  } catch  {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}