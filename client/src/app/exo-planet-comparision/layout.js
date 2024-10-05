import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Compare the exo-planets",
  description: "Detailed comparision between two exo-planets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#1a2b85]">
      <body className={inter.className} >{children}</body>
    </html>
  );
}
