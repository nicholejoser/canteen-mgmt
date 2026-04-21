"use client";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Toaster richColors position="top-right" />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}