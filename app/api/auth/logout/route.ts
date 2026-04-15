import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" });

  // clear auth cookie
  res.cookies.set("foodie", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return res;
}
