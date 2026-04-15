import { User } from "@/app/types/user";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users_data.json");

const readUsers = (): User[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.log("Server error: ", error);
    return [];
  }
};
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const users = readUsers();

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    res.cookies.set("foodie", String(user.id), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
