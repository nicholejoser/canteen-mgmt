import { Lexend, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`bg-gray-50 ${lexend.variable}`}>
        {children}
      </body>
    </html>
  );
}