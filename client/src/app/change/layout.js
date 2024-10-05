import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Change the default parameters",
  description: "Change the instrument values",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
