"use client"; 
import { Lexend, Geist } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-50 font-sans">
        {isAuthPage ? (
          <main>{children}</main>
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Toaster richColors position="top-right" />
            <div className={`${lexend.variable} flex-1 overflow-y-auto`}>
              {children}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
