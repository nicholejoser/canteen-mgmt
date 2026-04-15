"use client"; // Required to use usePathname

import Sidebar from "./components/Sidebar";
import { Lexend } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where the sidebar should NOT appear
  const isAuthPage = pathname === "/auth/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        {isAuthPage ? (
          // IF ON LOGIN: Just render the children (Login Page) without the sidebar layout
          <main>{children}</main>
        ) : (
          // IF ON DASHBOARD: Render the Sidebar + children
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className={`${lexend.variable} flex-1 overflow-y-auto`}>
              {children}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
