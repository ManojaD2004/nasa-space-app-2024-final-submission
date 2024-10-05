import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Habitable calculator",
  description: "Check whether the planet is habitable or not using our habitatble calculator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className}>{children}
      <Toaster position="top-right" /></body>
    </html>
  );
}