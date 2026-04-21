import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { User } from "../types/user";
import MainLayout from "@/components/MainLayout";
import Sidebar from "@/components/Sidebar";

const readUsers = () => {
  try {
    const filePath = path.join(process.cwd(), "data", "users_data.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("foodie")?.value;

  let currentUser = null;
  if (userId) {
    const users = readUsers();
    const foundUser = users.find((u: User) => String(u.id) === userId);

    if (foundUser) {
      const safeUser = { ...foundUser };
      delete safeUser.password;

      currentUser = safeUser;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar currentUser={currentUser} />
      <MainLayout>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </MainLayout>
    </div>
  );
}
