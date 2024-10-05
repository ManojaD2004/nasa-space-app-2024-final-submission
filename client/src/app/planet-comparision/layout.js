import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Planet Comparision",
  description: "Compare two planets and see their features",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
